import { gameState } from "./GameState.js";

class InputManager {
  #keys;
  #mouse;

  constructor() {
    if (InputManager.instance) {
      return InputManager.instance;
    }
    InputManager.instance = this;

    this.#keys = {};
    this.#mouse = {
      x: 0,
      y: 0,
      buttons: {},
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
    this.#keys[code] = true;
  }

  #onKeyUp({ code }) {
    this.#keys[code] = false;
  }

  #onMouseDown({ button }) {
    this.#mouse.buttons[button] = true;
  }

  #onMouseUp({ button }) {
    this.#mouse.buttons[button] = false;
  }

  #onMouseMove({ clientX, clientY }) {
    this.#mouse.x = clientX;
    this.#mouse.y = clientY;
  }

  #onMouseLeave() {
    const mouseKeys = Object.keys(this.#mouse.buttons);

    mouseKeys.forEach(key => {
      this.#mouse.buttons[key] = false;
    });
  }

  isKeyPressed(key) {
    if (key instanceof Array) {
      return key.some(k => this.#keys[k]);
    }
    return this.#keys[key];
  }

  isMousePressed(button) {
    return this.#mouse.buttons[button];
  }

  isLeftMousePressed() {
    return this.isMousePressed("0");
  }
}

export const inputManager = new InputManager();
