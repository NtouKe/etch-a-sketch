const container = document.querySelector("#container");
const cellNumberInput = document.querySelector("#cell-number-input");
const colorChoice = document.querySelector("#color-choice");
const toggleBorder = document.querySelector("#toggle-border");
const toggleActiveBtn = document.querySelectorAll(".toggle-btn");
let isMouseDown = false;
let paintMode;

container.addEventListener("mousedown", () => {
  isMouseDown = true;
  //   console.log("mouse down");
});
window.addEventListener("mouseup", () => {
  isMouseDown = false;
  //   console.log("mouse up");
});

cellNumberInput.addEventListener("change", (e) => {
  let val = e.target.value;
  if (val < 10) {
    val = 10;
  } else if (val > 100) {
    val = 100;
  }
  cellNumberInput.value = val;
  createCells(val);
});

toggleActiveBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector(".btn-active")?.classList.remove("btn-active");
    btn.classList.add("btn-active");
    paintMode = btn.dataset.color;
  });
});

toggleBorder.addEventListener("click", () => {
  container.classList.toggle("show-outlines");
});

function createCells(cells) {
  container.innerHTML = "";
  const cellSize = 100 / cells;
  for (let i = 0; i < cells ** 2; i++) {
    container.classList.add("show-outlines");
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = `${cellSize}%`;
    cell.style.height = `${cellSize}%`;
    cell.addEventListener("mouseover", () => isMouseDown && paintCell(cell));
    cell.addEventListener("mousedown", () => paintCell(cell));
    container.appendChild(cell);
  }
}

function paintCell(cell) {
  function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  let color = colorChoice.value;

  if (paintMode === "random") {
    cell.style.backgroundColor = getRandomColor();
  } else {
    cell.style.backgroundColor = color;
  }
}

createCells(16);
