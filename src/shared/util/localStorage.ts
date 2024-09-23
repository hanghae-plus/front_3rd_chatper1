export interface Storage {
  get(key: string): string | null;

  set(key: string, value: string): void;

  remove(key: string): void;

  clear(): void;
}

abstract class BrowserStorage implements Storage {
  protected abstract storage: globalThis.Storage;

  public get(key: string): string | null {
    return this.storage.getItem(key);
  }

  public set(key: string, value: string): void {
    this.storage.setItem(key, value);
  }

  public remove(key: string): void {
    this.storage.removeItem(key);
  }

  public clear(): void {
    this.storage.clear();
  }
}

class LocalStorage extends BrowserStorage {
  protected storage = window.localStorage;
}

export const safeLocalStorage = new LocalStorage();
