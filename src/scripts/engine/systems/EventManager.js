class EventManager {
  #listeners;

  constructor() {
    this.#listeners = {};
  }

  subscribe(event, callback) {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [];
    }
    this.#listeners[event].push(callback);
  }

  unsubscribe(event, callback) {
    if (!this.#listeners[event]) {
      this.#listeners[event] = [];
    }
    const filteredCallbacks = this.#listeners[event].filter(
      (cb) => cb !== callback,
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
