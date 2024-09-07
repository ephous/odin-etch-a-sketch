const container = document.querySelector("#container");

function createNewGrid(n) {
  
  for (let i = 0; i < n; i++) {
    let gridRow = document.createElement("div");
    gridRow.className = "grid-row";
    container.appendChild(gridRow);

    for (let i = 0; i < n; i++) {
      let gridSquare = document.createElement("div");
      gridSquare.className = "grid-square";
      gridRow.appendChild(gridSquare);
    }
  }

  container.addEventListener(
    "mouseover",
    (e) => {
      //works too: e.target.style.backgroundColor="rebeccapurple";
      if (!drawWithoutMousedown && !mouseDown) return;
      //if (e.target.className == "grid-square") {
      if (e.target.className.includes("grid-square")) {
        if (eraserMode) {
            e.target.className = "grid-square";
        } else {
          e.target.className = "grid-square marked";
        }
      }
    },
    false
  );

}

function requestNewGrid() {
  const answer = prompt("How many squares per size (limit 100)?", 16);
  if (answer === null) return;
  if (!Number.isInteger(Number(answer))) return;
  Array.from(container.children).forEach(
    x => container.removeChild(x) );
  createNewGrid( Math.min(100, Math.abs(answer)) );
}

document.addEventListener( "mousedown", () => {mouseDown = true;}, false);
document.addEventListener( "mouseup", () => {mouseDown = false;}, false);

document.querySelector("#draw-without-mousedown").addEventListener("click", 
    (e) => { drawWithoutMousedown = e.target.checked} );

document.querySelector("#eraser-mode").addEventListener("click", 
    (e) => { eraserMode = e.target.checked} );


// initialize
let mouseDown = false;
let drawWithoutMousedown = true;
let eraserMode = false;
createNewGrid(16);
