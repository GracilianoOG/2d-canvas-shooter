class StatusIndicator {
  static create(x, y, score, container, color = "#fff") {
    const scoreEl = document.createElement("div");
    scoreEl.setAttribute("class", "score");
    scoreEl.textContent = score;
    scoreEl.style.left = `${x}px`;
    scoreEl.style.top = `${y}px`;
    scoreEl.style.color = color;

    scoreEl.addEventListener(
      "animationend",
      () => container.removeChild(scoreEl),
      { once: true }
    );
    container.appendChild(scoreEl);
  }
}

export { StatusIndicator };
