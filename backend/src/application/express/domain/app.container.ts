class Container {
  private singletons = new Map<string, unknown>();

  singleton<T>(key: string, factory: () => T): T {
    if (!this.singletons.has(key)) {
      this.singletons.set(key, factory());
    }
    return this.singletons.get(key) as T;
  }
}

export const container = new Container();
