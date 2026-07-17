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
    if (!this.#events[event]) {
      return;
    }
    for (const callback of this.#events[event]) {
      callback(data);
    }
  }
}

export const eventManager = new EventManager();
