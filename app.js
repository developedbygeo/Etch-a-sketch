const newGameButton = document.querySelector(".new");
const clearButton = document.querySelector(".clear");
const colorButtonsAll = document.querySelectorAll(".selection");
const canvasSizeSelector = document.querySelector("#range-selector");
const canvas = document.querySelector(".grid-container");
const sizeIndicator = document.querySelector(".current-range");
const eraser = document.querySelector(".eraser-button");
let allGridCells;
let maximumGridSize;
let color;
let requestedGridSize = 16;

window.addEventListener("load", gameInit);

clearButton.addEventListener("click", clearGridColor);

newGameButton.addEventListener("click", () => {
  canvasSizeSelector.value = "16";
  sizeIndicator.innerText = 16;
  gameInit();
});

canvasSizeSelector.addEventListener("change", () => {
  requestedGridSize = canvasSizeSelector.value;
  sizeIndicator.innerText = requestedGridSize;
  gameInit();
});

eraser.addEventListener("click", erase);

// Functions
function createGrid() {
  // 50 vw for div
  maximumGridSize = 0.8 * window.innerWidth;
  let gridAreaTotal = requestedGridSize * requestedGridSize;
  for (i = 0; i < gridAreaTotal; i++) {
    let gridCell = document.createElement("div");
    gridCell.className = "grid-box";
    canvas.style.gridTemplateColumns = `repeat(${requestedGridSize}, 1fr)`;
    canvas.style.gridTemplateRows = `repeat(${requestedGridSize}, 1fr)`;
    canvas.appendChild(gridCell);
  }
}

function clearGrid() {
  canvas.innerHTML = "";
  canvas.style.gridTemplateColumns = "";
  canvas.style.gridTemplateRows = "";
}
function clearGridColor() {
  allGridCells = document.querySelectorAll(".grid-box");
  allGridCells.forEach((cell) => {
    cell.style.background = "transparent";
  });
}

// to provide the selected color
function selectColor() {
  color = "black";
  colorButtonsAll.forEach((button) => {
    button.addEventListener("click", (e) => {
      let colorVisualDisplay = button.nextElementSibling;
      e.stopImmediatePropagation();
      const randomColorButton = colorButtonsAll[2];
      const customColorButton = colorButtonsAll[3];
      if (button == randomColorButton) {
        colorVisualDisplay.classList.remove("visual-display");
        let customColor = Math.floor(Math.random() * 16777215).toString(16);
        color = `#${customColor}`;
        colorVisualDisplay.value = color;
      } else if (button == customColorButton) {
        color = colorVisualDisplay.value;
        colorVisualDisplay.classList.remove("visual-display");
        colorVisualDisplay.click();
        colorVisualDisplay.addEventListener("input", () => {
          color = colorVisualDisplay.value;
          customColorButton.style.border = `1px solid ${color}`;
        });
      } else {
        color = String(button.textContent.toLowerCase());
      }
    });
  });
}
// to color the divs with the color from selectColor
function coloringDivs(e) {
  let selectedColor = color;
  e.target.style.backgroundColor = selectedColor;
}
// to add eventListeners to the grid-boxes
function coloringProcess() {
  allGridCells = document.querySelectorAll(".grid-box");
  allGridCells.forEach((cell) =>
    cell.addEventListener("mouseenter", coloringDivs)
  );
  allGridCells.forEach((cell) =>
    cell.addEventListener("touchstart", coloringDivs)
  );
}
function erase() {
  allGridCells = document.querySelectorAll(".grid-box");
  allGridCells.forEach((cell) =>
    cell.addEventListener("mouseover", () => {
      cell.style.background = "";
    })
  );
}

function gameInit() {
  clearGrid();
  createGrid();
  selectColor();
  coloringProcess();
}
