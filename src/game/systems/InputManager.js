export class InputManager {
  #actions;
  #mouse;
  #bindings;
  #canvas;

  constructor(canvas) {
    this.#actions = {};
    this.#mouse = { x: 0, y: 0 };
    this.#bindings = {};
    this.#canvas = canvas;
    this.#initListeners(this.#canvas);
  }

  getMousePosition() {
    const { offset, factors } = this.#canvas;

    return {
      x: (this.#mouse.x - offset.left) / factors.x,
      y: (this.#mouse.y - offset.top) / factors.y,
    };
  }

  #initListeners(canvas) {
    document.addEventListener("keydown", (e) => this.#onKey(e.code));
    document.addEventListener("keyup", (e) => this.#onKey(e.code, false));
    document.addEventListener("contextmenu", () => (this.#actions = {}));
    document.addEventListener("blur", () => (this.#actions = {}));

    canvas.parent.addEventListener("mousedown", (e) => this.#onMouse(e.button));
    canvas.parent.addEventListener("mouseup", (e) =>
      this.#onMouse(e.button, false),
    );

    canvas.parent.addEventListener("mouseenter", this.#onMouseMove.bind(this), {
      once: true,
    });

    canvas.parent.addEventListener("mousemove", this.#onMouseMove.bind(this));
    canvas.parent.addEventListener("mouseleave", this.#onMouseLeave.bind(this));
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
