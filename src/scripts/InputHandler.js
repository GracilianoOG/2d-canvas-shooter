class InputHandler {
  static handlers = {};

  static create(
    type,
    action,
    pausable = true,
    target = document,
    group = "game"
  ) {
    const handler = pausable
      ? (...args) => window.gameState["entities"].isRunning && action(...args)
      : action;
    InputHandler.handlers[group] = InputHandler.handlers[group] ?? {};
    if (InputHandler.handlers[group][type]) {
      console.error(`"${type}" is already registered in group "${group}"`);
      return;
    }
    InputHandler.handlers[group][type] = {};
    InputHandler.handlers[group][type].action = handler;
    InputHandler.handlers[group][type].target = target;
    target.addEventListener(type, handler);
    console.log(InputHandler.handlers);
  }

  static remove(type, group = "game") {
    const target = InputHandler.handlers[group][type].target;
    target.removeEventListener(type, InputHandler.handlers[group][type]);
    // TODO: also remove from handlers
  }
}

export { InputHandler };
