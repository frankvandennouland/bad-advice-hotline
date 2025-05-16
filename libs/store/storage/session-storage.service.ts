import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class SessionStorageService {
  constructor() {}

  setSavedState(state: any, storageKey: string): void {
    sessionStorage.setItem(storageKey, JSON.stringify(state));
  }

  getSavedState(storageKey: string): any {
    return JSON.parse(sessionStorage.getItem(storageKey) || "{}");
  }

  removeSavedState(storageKey: string): void {
    sessionStorage.removeItem(storageKey);
  }
}
