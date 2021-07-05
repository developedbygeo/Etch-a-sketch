const newGameButton = document.querySelector(".new");
const clearButton = document.querySelector(".clear");
const colorButtonsAll = document.querySelectorAll(".selection");
const canvasSizeSelector = document.querySelector("#range-selector");
const canvas = document.querySelector(".grid");
let color;

clearButton.addEventListener("click", () => {});

canvasSizeSelector.addEventListener("change", () => {
  let selectedSize = canvasSizeSelector.value;
  const sizeIndicator = document.querySelector(".current-range");
  sizeIndicator.innerText = selectedSize;
  createGrid(selectedSize, selectedSize);
});

// Functions

function coloringDivs(el) {
  console.log(el);
  el.style.background = color;
}

// to create the grid area and initiate coloring
function createGrid(columns, rows) {
  canvas.style.gridTemplateColumns = `repeat(${columns}, minmax(1rem, 1fr))`;
  canvas.style.gridTemplateRows = `repeat(${rows}, minmax(1rem, 1fr))`;
  console.log(canvas);
  for (i = 0; i < columns * rows; i++) {
    // !!! TEST
    let containerCell = document.createElement("div");
    containerCell.setAttribute("draggable", "false");
    containerCell.style.border = "1px solid #e5e5e5";
    canvas.appendChild(containerCell).className = "grid-cell";

    // !!! TEST
    containerCell.addEventListener("mouseover", (e) => {
      let containercell;
      // containerCell.style.background = color;
      e.preventDefault();
      e.target.style.background = color;
    });
    // to pause coloring
    // containerCell.addEventListener('click', ()=>{})
  }
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
// to use the selected color
selectColor();
