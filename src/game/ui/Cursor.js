export class Cursor {
  #cursor;

  constructor() {
    const cursor = document.createElement("div");
    cursor.classList.add("cursor");

    document.body.prepend(cursor);
    document.addEventListener("mousemove", (e) => this.move(e));
    document.addEventListener("mouseover", (e) => this.move(e), { once: true });

    this.#cursor = cursor;
  }

  move({ clientX: mouseX, clientY: mouseY }) {
    const space = 6;
    this.#cursor.style.translate = `${mouseX - space}px ${mouseY - space}px`;
  }
}
