const newGameButton = document.querySelector(".new");
const clearButton = document.querySelector(".clear");
const colorButtonsAll = document.querySelectorAll(".selection");
const canvas = document.querySelector(".grid");
let color;

clearButton.addEventListener("click", () => {});

// Functions

// to create the grid area and initiate coloring
// TODO need to 'pull' columns and rows from slider
function createGrid(columns, rows) {
  canvas.style.setProperty("grid-template-columns", columns);
  canvas.style.setProperty("grid-template-rows", rows);
  for (i = 0; i < columns * rows; i++) {
    let containerCell = document.createElement("div");
    canvas.appendChild(containerCell).className = "grid-cell";
    containerCell.addEventListener("mouseover", color);
  }
}
// to provide the selected
// TODO need to add event listeners to buttons
function selectColor(e) {
  colorButtonsAll.forEach((button) => {
    button.addEventListener("click", () => {
      console.log(button);
      color = String(button.textContent.toLowerCase());
      console.log(color);
    });
  });
  //   let selectedColor = color.value;
  //   e.target.style.backgroundColor = selectedColor;
}

selectColor();
