const container = document.querySelector("#container");
const cellNumberInput = document.querySelector("#cell-number-input");

let isMouseDown = false;
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

function createCells(cells) {
  container.innerHTML = "";
  const cellSize = 100 / cells;
  for (let i = 0; i < cells ** 2; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.width = `${cellSize}%`;
    cell.style.height = `${cellSize}%`;
    cell.addEventListener("mouseover", () => isMouseDown && paintCell(cell, "black"));
    cell.addEventListener("mousedown", () => paintCell(cell, "black"));
    container.appendChild(cell);
  }
}

function paintCell(cell, color) {
  cell.style.backgroundColor = color;
}

createCells(16);
