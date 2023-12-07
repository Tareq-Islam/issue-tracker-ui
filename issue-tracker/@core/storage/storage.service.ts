import { Injectable } from '@angular/core';

export enum STORAGE_KEY {
  Login_token = '_et',
}
export enum STORAGE_TYPE {
  Local = 'localStorage',
  Session = 'sessionStorage',
  Cookie = 'cookieStorage',
}
type Common_Storage = {
  type: STORAGE_TYPE.Local | STORAGE_TYPE.Session;
  key: STORAGE_KEY;
  value: string;
};

type Cookie_Storage = {
  type: STORAGE_TYPE.Cookie;
  key: STORAGE_KEY;
  value: string;
  expires?: Date;
  path?: string;
};

type Storage_Item_Type = {
  type: STORAGE_TYPE;
  key: STORAGE_KEY;
};

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  /**
   *
   * @param storageItem {@link Common_Storage} or {@link Cookie_Storage}
   * @returns
   */
  save(storageItem: Common_Storage | Cookie_Storage): boolean {
    try {
      switch (storageItem.type) {
        case STORAGE_TYPE.Session:
          sessionStorage.setItem(storageItem.key, storageItem.value);
          break;
        case STORAGE_TYPE.Local:
          localStorage.setItem(storageItem.key, storageItem.value);
          break;
        case STORAGE_TYPE.Cookie:
          document.cookie = `${storageItem.key}=${storageItem.value};expires=${storageItem.expires};path=${storageItem?.path}`;
          break;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   *
   * @param storageItem {@link Storage_Item_Type}
   * @returns
   */
  removeItem(storageItem: Storage_Item_Type): boolean {
    try {
      switch (storageItem.type) {
        case STORAGE_TYPE.Session:
          sessionStorage.removeItem(storageItem.key);
          break;
        case STORAGE_TYPE.Local:
          localStorage.removeItem(storageItem.key);
          break;
        case STORAGE_TYPE.Cookie:
          if (this.get_cookie(storageItem.key)) {
            document.cookie =
              storageItem.key + '=' + ';expires=Thu, 01 Jan 1970 00:00:01 GMT';
          }
          break;
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  /**
   * @description
   * This method used to clear store.
   * @param storageItem {@link STORAGE_TYPE}
   */
  removeAll(storageItem: { type: STORAGE_TYPE }): boolean {
    try {
      switch (storageItem.type) {
        case STORAGE_TYPE.Session:
          sessionStorage.clear();
          break;
        case STORAGE_TYPE.Local:
          localStorage.clear();
          break;
        case STORAGE_TYPE.Cookie:
          const cookies = document.cookie.split(';');
          for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i];
            const eqPos = cookie.indexOf('=');
            const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
            document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
          }
          break;
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   *
   * @param storageItem {@link Storage_Item_Type}
   * @returns
   */
  get(storageItem: Storage_Item_Type): any {
    switch (storageItem.type) {
      case STORAGE_TYPE.Session:
        return sessionStorage.getItem(storageItem.key);
      case STORAGE_TYPE.Local:
        return localStorage.getItem(storageItem.key);
      case STORAGE_TYPE.Cookie:
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i];
          const eqPos = cookie.indexOf('=');
          const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
          const value =
            eqPos > -1 ? cookie.substr(eqPos + 1, cookie.length) : cookie;
          if (name.trim() === storageItem.key) {
            return value;
          }
        }
        return null;
    }
  }

  /**
   * @description
   * This method used to reset all web store. clear three storage(localStorage, sessionStorage, cookieStorage)
   */
  resetStorage(): boolean {
    try {
      localStorage.clear();
      sessionStorage.clear();
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i];
        const eqPos = cookie.indexOf('=');
        const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
      }
      return true;
    } catch (error) {
      return false;
    }
  }

  private get_cookie(name: string) {
    return document.cookie.split(';').some((c) => {
      return c.trim().startsWith(name + '=');
    });
  }
}
