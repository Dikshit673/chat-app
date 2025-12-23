export const storage = {
  get<T>(lsKey: string, defaultValue: T): T {
    try {
      const item = localStorage.getItem(lsKey);
      return item ? (JSON.parse(item) as T) : defaultValue;
    } catch (error) {
      console.error(`Error parsing localStorage item for key: ${lsKey}`, error);
      return defaultValue;
    }
  },
  // val: T extends object ? T : string
  set<T>(key: string, val: T) {
    return localStorage.setItem(key, JSON.stringify(val));
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
};
