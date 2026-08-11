class EventManager {
  #listeners;

  constructor() {
    this.#listeners = {};
  }

  subscribe(event, listener) {
    (this.#listeners[event] ??= []).push(listener);
  }

  on(event, listener) {
    this.subscribe(event, listener);
  }

  unsubscribe(event, listener) {
    if (!this.#listeners[event]) return;
    this.#listeners[event] = this.#listeners[event]?.filter(
      (cb) => cb !== listener,
    );
  }

  off(event, listener) {
    this.unsubscribe(event, listener);
  }

  emit(event, ...data) {
    this.#listeners[event]?.forEach((listener) => listener(...data));
  }
}

export const eventManager = new EventManager();
