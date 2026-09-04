export class EventManager {
  #listeners;

  constructor() {
    this.#listeners = {};
  }

  /** Subscribe a listener to an event */
  on(event, listener) {
    (this.#listeners[event] ??= []).push(listener);
  }

  /** Unsubscribe a listener from an event */
  off(event, listener) {
    if (!this.#listeners[event]) return;
    this.#listeners[event] = this.#listeners[event]?.filter(
      (cb) => cb !== listener,
    );
  }

  emit(event, ...data) {
    this.#listeners[event]?.forEach((listener) => listener(...data));
  }
}
