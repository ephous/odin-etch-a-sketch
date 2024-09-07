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
      if (e.target.className == "grid-square") {
        e.target.className = "grid-square marked";
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

// initialize
createNewGrid(16);
