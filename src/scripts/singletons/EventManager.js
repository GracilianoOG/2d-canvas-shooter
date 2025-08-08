class EventManager {
  #events;

  constructor() {
    if (EventManager.instance) {
      return EventManager.instance;
    }
    EventManager.instance = this;
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
    const filteredCallbacks = this.#events[event].filter(cb => cb !== callback);
    this.#events[event] = filteredCallbacks;
  }

  emit(event, data = null) {
    if (!this.#events[event]) {
      return;
    }
    this.#events[event].forEach(cb => cb(data));
  }
}

export const eventManager = new EventManager();
