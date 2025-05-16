import dayjs from "dayjs";
import { LocalStorageService } from "./local-storage.service";
import { SessionStorageService } from "./session-storage.service";

type StorageStateType = { [key: string]: unknown } & { expiresAt?: number };

export function handleStorage(
  storageKey: string,
  storageService: LocalStorageService | SessionStorageService,
  state: any,
  onInit: boolean,
  saveKeys?: string[],
  ttl?: number
): any {
  return {
    ...storageThingy(
      storageKey,
      storageService,
      state,
      onInit || false,
      saveKeys,
      ttl
    ),
  };
}

export function storageThingy(
  storageKey: string,
  storageService: LocalStorageService | SessionStorageService,
  state: any,
  onInit: boolean,
  saveKeys?: string[],
  ttl?: number
) {
  // Get the next state.
  let nextState = state;

  // Save only the desired keys of the next state to the application storage.
  let stateToStore: StorageStateType = {};
  if (!saveKeys?.length) {
    stateToStore = nextState;
  } else {
    if (ttl) {
      saveKeys.push("expiresAt");
    }

    saveKeys.forEach((key: string) => {
      if (nextState[key]()) {
        const value = nextState[key]();
        stateToStore[key] = value;
      }
    });
  }

  // Initialize the application state.
  if (onInit) {
    const savedState = storageService.getSavedState(storageKey);

    return savedState.expiresAt &&
      dayjs().isAfter(dayjs.unix(savedState.expiresAt))
      ? {}
      : {
          ...stateToStore,
          ...savedState,
        };
  }

  if (ttl) {
    const savedState = storageService.getSavedState(storageKey);
    stateToStore = getStateToStoreWhenTTLIsEnabled(
      stateToStore,
      savedState,
      ttl
    );
  }

  storageService.setSavedState(stateToStore, storageKey);

  return stateToStore;
}

function getStateToStoreWhenTTLIsEnabled(
  state: StorageStateType,
  savedState: StorageStateType,
  ttl: number
): StorageStateType {
  const hasState = Object.keys(state).length;
  const hasSavedState = Object.keys(savedState).length;
  const statesAreEqual = expiryStatesAreEqual(state, savedState);
  const isExpired =
    hasSavedState &&
    savedState.expiresAt &&
    dayjs().isAfter(dayjs.unix(savedState.expiresAt));

  if (isExpired) {
    return {};
  }

  if (hasState && hasSavedState && statesAreEqual) {
    return savedState;
  }

  if (
    hasState &&
    (!savedState.expiresAt || (hasSavedState && !statesAreEqual))
  ) {
    state.expiresAt = dayjs().unix() + ttl;
  }

  return { ...savedState, ...state };
}

function expiryStatesAreEqual(
  stateA: StorageStateType,
  stateB: StorageStateType
) {
  const deleteExpireKeyAndParseToJsonString = (state: StorageStateType) => {
    const _state = { ...state };
    delete _state.expiresAt;
    return JSON.stringify(_state);
  };

  return (
    deleteExpireKeyAndParseToJsonString(stateA) ===
    deleteExpireKeyAndParseToJsonString(stateB)
  );
}
