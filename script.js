const container = document.querySelector("#container");
const cellNumberInput = document.querySelector("#cell-number-input");
const colorChoice = document.querySelector("#color-choice");
const toggleBorder = document.querySelector("#toggle-border");
const toggleActiveBtn = document.querySelectorAll(".toggle-btn");
const clearBoard = document.querySelector("#clear-board");
let isMouseDown = false;
let paintMode;

container.addEventListener("mousedown", () => {
  isMouseDown = true;
});
window.addEventListener("mouseup", () => {
  isMouseDown = false;
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

clearBoard.addEventListener("click", () => {
  container.querySelectorAll(".cell").forEach((c) => (c.style.backgroundColor = "rgb(255, 255, 255)"));
});

function createCells(cells) {
  container.innerHTML = "";
  container.classList.add("show-outlines");
  const cellSize = 100 / cells;
  for (let i = 0; i < cells ** 2; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.style.backgroundColor = "rgb(255, 255, 255)";
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

  switch (paintMode) {
    case "random":
      cell.style.backgroundColor = getRandomColor();
      break;
    case "darken":
      cell.style.backgroundColor = RGBToHSL(cell.style.backgroundColor, 6);
      break;
    case "lighten":
      cell.style.backgroundColor = RGBToHSL(cell.style.backgroundColor, -6);
      break;
    default:
      cell.style.backgroundColor = color;
      break;
  }
}

// from https://css-tricks.com/converting-color-spaces-in-javascript/
function RGBToHSL(rgb, percentage) {
  let nums = rgb.match(/\d+(\.\d+)?%?/g).map((n) => {
    if (n.includes("%")) return (parseFloat(n) / 100) * 255;
    return parseFloat(n);
  });
  let r = nums[0] / 255,
    g = nums[1] / 255,
    b = nums[2] / 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin;
  let h = 0,
    s = 0,
    l = (cmax + cmin) / 2;
  if (delta !== 0) {
    s = delta / (1 - Math.abs(2 * l - 1));
    if (cmax === r) h = ((g - b) / delta) % 6;
    else if (cmax === g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
  }
  h = Math.round(h * 60);
  if (h < 0) h += 360;
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);
  // Clamp the lightness so it never goes below 0
  let finalL = Math.max(0, l - percentage);
  return `hsl(${h}, ${s}%, ${finalL}%)`;
}

createCells(cellNumberInput.value);
