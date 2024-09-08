const container = document.querySelector("#container");

function updateGridSquare(e) {
    if (!e.target.className.includes("grid-square")) return;
    
    let opacity;
    opacity = 0.1 + Number(e.target.style.opacity);
    opacity = Math.min(opacity, 1.0);
    if (eraserMode) {
        e.target.style.opacity = 0.5;
        e.target.style.backgroundColor = 'white';
    } else {
        e.target.style.backgroundColor = 'rebeccapurple';
        e.target.style.opacity = opacity;
    }
    
};

let currentElementUnderTouch=null;

//https://www.codicode.com/art/easy_way_to_add_touch_support_to_your_website.aspx
function touch2Mouse(e)
{
  var theTouch = e.changedTouches[0];
  var mouseEv;
  
  switch(e.type)
  {
    case "touchstart": mouseEv="mousedown"; break;  
    case "touchend":   mouseEv="mouseup"; break;
    case "touchmove":  mouseEv="mouseover"; break;
    default: return;
  }
  
  if( currentElementUnderTouch==null){
    currentElementUnderTouch = e.target.id;
  } else {
    if( currentElementUnderTouch == e.target.id){
      return;
    }
  }

  var mouseEvent = container.createEvent("MouseEvent");
  mouseEvent(mouseEv, true, true, window, 1, theTouch.screenX, theTouch.screenY, theTouch.clientX, theTouch.clientY, false, false, false, false, 0, null);
  theTouch.target.dispatchEvent(mouseEvent);
  e.preventDefault();
}

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
      updateGridSquare(e);
    },
    false
  );

  // https://www.codicode.com/art/easy_way_to_add_touch_support_to_your_website.aspx
  container.addEventListener("touchstart",touch2Mouse, true);
  container.addEventListener("touchmove",touch2Mouse, true);
  container.addEventListener("touchend",touch2Mouse, true);

}

function requestNewGrid() {
  const answer = prompt("How many squares per size (limit 100)?", 16);
  if (answer === null) return;
  if (!Number.isInteger(Number(answer))) return;
  Array.from(container.children).forEach(
    x => container.removeChild(x) );
  createNewGrid( Math.min(100, Math.abs(answer)) );
}

document.addEventListener( "mousedown", (e) => {
    mouseDown = true;
    updateGridSquare(e);
}, false);
document.addEventListener( "mouseup", () => {mouseDown = false;}, false);

document.querySelector("#draw-without-mousedown").addEventListener("click", 
    (e) => { drawWithoutMousedown = e.target.checked} );

const labl = document.querySelector('#draw-or-erase-label');
document.querySelector("#eraser-mode").addEventListener("click", 
    (e) => { 
      eraserMode = e.target.checked;
      if (eraserMode){
        labl.textContent = 'Erase without clicking';
      } else {
        labl.textContent = 'Draw without clicking';
      }
    }
);

// initialize
let mouseDown = false;
let drawWithoutMousedown = true;
let eraserMode = false;
createNewGrid(16);
