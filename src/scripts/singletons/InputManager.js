import { gameState } from "./GameState.js";

class InputManager {
  #keys;
  #actions;
  #mouse;
  #bindings;

  constructor() {
    if (InputManager.instance) {
      return InputManager.instance;
    }
    InputManager.instance = this;

    this.#keys = {};
    this.#actions = {};
    this.#mouse = { x: 0, y: 0 };
    this.#bindings = {
      moveLeft: ["KeyA", "ArrowLeft"],
      moveRight: ["KeyD", "ArrowRight"],
      moveUp: ["KeyW", "ArrowUp"],
      moveDown: ["KeyS", "ArrowDown"],
      fury: ["ControlRight", "Space"],
      shoot: ["0"],
    };
    this.#initListeners();
  }

  get mousePosition() {
    const { left: offsetX, top: offsetY } =
      gameState.getEntity("realCanvas").rect;

    return {
      x: this.#mouse.x - offsetX,
      y: this.#mouse.y - offsetY,
    };
  }

  #initListeners() {
    const container = document.querySelector("#game-container");

    document.addEventListener("keydown", this.#onKeyDown.bind(this));
    document.addEventListener("keyup", this.#onKeyUp.bind(this));

    container.addEventListener("mousedown", this.#onMouseDown.bind(this));
    container.addEventListener("mouseup", this.#onMouseUp.bind(this));

    container.addEventListener("mouseenter", this.#onMouseMove.bind(this), {
      once: true,
    });

    container.addEventListener("mousemove", this.#onMouseMove.bind(this));
    container.addEventListener("mouseleave", this.#onMouseLeave.bind(this));
  }

  #onKeyDown({ code }) {
    this.#actions[code] = true;
  }

  #onKeyUp({ code }) {
    this.#actions[code] = false;
  }

  #onMouseDown({ button }) {
    this.#actions[button] = true;
  }

  #onMouseUp({ button }) {
    this.#actions[button] = false;
  }

  #onMouseMove({ clientX, clientY }) {
    this.#mouse.x = clientX;
    this.#mouse.y = clientY;
  }

  #onMouseLeave() {
    // const mouseKeys = Object.keys(this.#mouse.buttons);

    // mouseKeys.forEach((key) => {
    //   this.#mouse.buttons[key] = false;
    // });
    console.log("Leave");
  }

  isActionPressed(bind) {
    const actions = this.#bindings[bind];
    return actions.some((action) => this.#actions[action]);
  }

  isKeyPressed(bind) {
    const keys = this.#bindings[bind];
    return keys.some((key) => this.#keys[key]);
  }

  isMousePressed(bind) {
    const keys = this.#bindings[bind];
    return keys.some((key) => this.#mouse.buttons[key]);
  }
}

export const inputManager = new InputManager();
