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
    const listeners = this.#listeners[event];

    if (!listeners) {
      return;
    }

    for (const listener of listeners) {
      listener(data);
    }
  }
}

export const eventManager = new EventManager();
