class EventManager {
  #listeners;

  constructor() {
    this.#listeners = {};
  }

  subscribe(event, listener) {
    (this.#listeners[event] ??= []).push(listener);
  }

  unsubscribe(event, listener) {
    if (!this.#listeners[event]) return;
    this.#listeners[event] = this.#listeners[event]?.filter(
      (cb) => cb !== listener,
    );
  }

  emit(event, data = null) {
    this.#listeners[event]?.forEach((listener) => listener(data));
  }
}

export const eventManager = new EventManager();
