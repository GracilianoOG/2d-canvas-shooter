class InputManager {
  #actions;
  #mouse;
  #bindings;

  constructor() {
    this.#actions = {};
    this.#mouse = { x: 0, y: 0 };
    this.#bindings = {};
  }

  getMousePosition(offsetX, offsetY) {
    return {
      x: this.#mouse.x - offsetX,
      y: this.#mouse.y - offsetY,
    };
  }

  init(container) {
    document.addEventListener("keydown", (e) => this.#onKey(e.code));
    document.addEventListener("keyup", (e) => this.#onKey(e.code, false));

    container.addEventListener("mousedown", (e) => this.#onMouse(e.button));
    container.addEventListener("mouseup", (e) =>
      this.#onMouse(e.button, false),
    );

    container.addEventListener("mouseenter", this.#onMouseMove.bind(this), {
      once: true,
    });

    container.addEventListener("mousemove", this.#onMouseMove.bind(this));
    container.addEventListener("mouseleave", this.#onMouseLeave.bind(this));
  }

  #onKey(code, pressed = true) {
    this.#actions[code] = pressed;
  }

  #onMouse(button, pressed = true) {
    this.#actions[`Mouse${button}`] = pressed;
  }

  #onMouseMove({ clientX, clientY }) {
    this.#mouse.x = clientX;
    this.#mouse.y = clientY;
  }

  #onMouseLeave() {
    Object.keys(this.#actions).forEach((action) => {
      if (action.includes("Mouse")) {
        this.#actions[action] = false;
      }
    });
  }

  isActionPressed(bind) {
    try {
      const actions = this.#bindings[bind];
      return actions.some((action) => this.#actions[action]);
    } catch (error) {
      console.error(`${bind} is not a valid bind!`);
    }
  }

  bind(action, keys) {
    this.#bindings[action] = keys;
  }
}

export const inputManager = new InputManager();
