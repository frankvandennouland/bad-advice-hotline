import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class LocalStorageService {
  constructor() {}

  setSavedState(state: any, storageKey: string): void {
    localStorage.setItem(storageKey, JSON.stringify(state));
  }

  getSavedState(storageKey: string): any {
    return JSON.parse(localStorage.getItem(storageKey) || "{}");
  }

  removeSavedState(storageKey: string): void {
    localStorage.removeItem(storageKey);
  }
}
