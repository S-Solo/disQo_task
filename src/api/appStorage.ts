type StorageKey = "notes" | "gistId";

type StorageType = "local" | "session";

class StorageService {
  save = (key: StorageKey, value: any, storageType: StorageType) => {
    const storage = storageType === "local" ? localStorage : sessionStorage;
    try {
      storage.setItem(key, JSON.stringify({ data: value }));
    } catch (e) {
      throw new Error(`StorageWriteFault`);
    }
  };

  load = (key: StorageKey, storageType: StorageType) => {
    const storage = storageType === "local" ? localStorage : sessionStorage;
    try {
      const item = storage.getItem(key);
      return item === null ? null : JSON.parse(item).data;
    } catch (e) {
      throw new Error(`StorageReadFault`);
    }
  };

  remove = (key: StorageKey, storageType: StorageType) => {
    const storage = storageType === "local" ? localStorage : sessionStorage;
    try {
      storage.removeItem(key);
    } catch (e) {
      throw new Error(`StorageRemoveFault`);
    }
  };

  clear = (storageType: StorageType) => {
    const storage = storageType === "local" ? localStorage : sessionStorage;
    try {
      storage.clear();
    } catch (e) {
      throw new Error(`StorageClearFault`);
    }
  };
}

const appStorage = new StorageService();
export default appStorage;
