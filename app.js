const newGameButton = document.querySelector(".new");
const clearButton = document.querySelector(".clear");
const colorButtonsAll = document.querySelectorAll(".selection");
const canvasSizeSelector = document.querySelector("#range-selector");
const canvas = document.querySelector(".grid-container");
let maximumGridSize;
let color;
let requestedGridSize = 16;

window.addEventListener("load", createGrid);

clearButton.addEventListener("click", () => {});

canvasSizeSelector.addEventListener("change", () => {
  requestedGridSize = canvasSizeSelector.value;
  const sizeIndicator = document.querySelector(".current-range");
  sizeIndicator.innerText = requestedGridSize;
  // createGrid(requestedGridSize);
  clearGrid();
  createGrid();
});
// Functions

// function coloringDivs(el) {
//   console.log(el);
//   el.style.background = color;
// }

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
  allGridCells = document.querySelectorAll(".grid-box");
  allGridCells.forEach((cell) =>
    cell.addEventListener("mousemove", coloringDivs)
  );

  selectColor();
}

function clearGrid() {
  canvas.innerHTML = "";
  canvas.style.gridTemplateColumns = "";
  canvas.style.gridTemplateRows = "";
}

// to provide the selected color
function selectColor() {
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
        colorVisualDisplay.classList.remove("visual-display");
        colorVisualDisplay.click();
        colorVisualDisplay.addEventListener("change", () => {
          color = colorVisualDisplay.value;
        });
      } else {
        color = String(button.textContent.toLowerCase());
      }
    });
  });
}

function coloringDivs(e) {
  let selectedColor = color;
  e.target.style.backgroundColor = selectedColor;
}
