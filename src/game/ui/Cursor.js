export class Cursor {
  #cursor;

  constructor() {
    const CLICKABLES = "a,button,input";
    const cursor = document.createElement("div");
    cursor.classList.add("cursor");

    document.body.prepend(cursor);
    document.addEventListener("mousedown", (e) => {
      cursor.classList.add("cursor__down");
    });
    document.addEventListener("mouseup", (e) => {
      cursor.classList.remove("cursor__hover");
      cursor.classList.remove("cursor__down");
    });
    document.addEventListener("mousemove", (e) => {
      cursor.classList.toggle("cursor__hover", e.target.closest(CLICKABLES));
      this.move(e);
    });
    document.addEventListener("mouseover", (e) => this.move(e), { once: true });

    this.#cursor = cursor;
  }

  move({ clientX: mouseX, clientY: mouseY }) {
    const space = 6;
    this.#cursor.style.translate = `${mouseX - space}px ${mouseY - space}px`;
  }
}
