class InputHandler {
  static create(type, action, pausable = true, target = document) {
    const handler = pausable
      ? (...args) => window.gameState.entities.isRunning && action(...args)
      : action;
    target.addEventListener(type, handler);
  }
}

export { InputHandler };
