class EventManager {
  #listeners;

  constructor() {
    this.#listeners = {};
  }

  subscribe(event, listener) {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [];
    }
    this.#listeners[event].push(listener);
  }

  unsubscribe(event, listener) {
    const filteredCallbacks = this.#listeners[event]?.filter(
      (cb) => cb !== listener,
    );
    this.#listeners[event] = filteredCallbacks;
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
