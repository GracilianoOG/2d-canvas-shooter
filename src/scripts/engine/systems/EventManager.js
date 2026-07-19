class EventManager {
  #events;

  constructor() {
    this.#events = {};
  }

  subscribe(event, callback) {
    if (!this.#events[event]) {
      this.#events[event] = [];
    }
    this.#events[event].push(callback);
  }

  unsubscribe(event, callback) {
    if (!this.#events[event]) {
      this.#events[event] = [];
    }
    const filteredCallbacks = this.#events[event].filter(
      (cb) => cb !== callback,
    );
    this.#events[event] = filteredCallbacks;
  }

  emit(event, data = null) {
    const listeners = this.#events[event];

    if (!listeners) {
      return;
    }

    for (const listener of listeners) {
      listener(data);
    }
  }
}

export const eventManager = new EventManager();
