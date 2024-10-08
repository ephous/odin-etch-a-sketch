const container = document.querySelector("#container");

function updateGridSquare(e) {
    if (!e.target.className.includes("grid-square")) return;
    
    if (eraserMode) {
        e.target.style.opacity = 0.5;
        e.target.style.backgroundColor = 'white';
    } else {
      let opacity;
      if (e.target.style.backgroundColor == 'white'){
        // clicked on a blank or erased pixel
        opacity = 0.1;
      } else {
        opacity = 0.1 + Number(e.target.style.opacity);
        opacity = Math.min(opacity, 1.0);
      }
      e.target.style.opacity = opacity;
      e.target.style.backgroundColor = 'rebeccapurple';
    }
    
};

let currentElementUnderTouch=null;

//https://www.codicode.com/art/easy_way_to_add_touch_support_to_your_website.aspx
function touch2Mouse(e) {
  
  var theTouch = e.changedTouches[0];
  var mouseEv;
  
  let elem;
  try {
    elem = document.elementFromPoint( e.touches[0].clientX, e.touches[0].clientY );
  } catch {
    elem = null;
  }

  switch(e.type)
  {
    case "touchstart": {
      currentElementUnderTouch = elem;
      mouseEv="mousedown";
      break;
    }    
    case "touchend": {
      currentElementUnderTouch = null;
      mouseEv="mouseup";
      break;
    }
    case "touchmove": {
      if( currentElementUnderTouch == elem ) {
        //console.log('returning...');
        return;
      }
      //console.log('continuing...');
      currentElementUnderTouch = elem;
      mouseEv="mouseover";
      theTouch = new Touch(
        { identifier: 0,
          target: elem });
      break;
    }
    default: return;
  }
    
  //var mouseEvent = document.createEvent("MouseEvent");
  //mouseEvent(mouseEv, true, true, window, 1, theTouch.screenX, theTouch.screenY, theTouch.clientX, theTouch.clientY, false, false, false, false, 0, null);
  // Create a synthetic click MouseEvent
  //https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent
  let evt = new MouseEvent(mouseEv, {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  theTouch.target.dispatchEvent(evt);
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
      if (!mouseDown) return;
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

const labl = document.querySelector('#draw-or-erase-label');
document.querySelector("#eraser-mode").addEventListener("click", 
    (e) => { 
      eraserMode = e.target.checked;
      try{ // label will have been removed for mobile
        if (eraserMode){
          labl.textContent = 'Erase without clicking';
        } else {
          labl.textContent = 'Draw without clicking';
        }
      } catch{
        // no action
      }}
);


// initialize
let mouseDown = false;
let eraserMode = false;

// initialize size for mobile phone
// https://bito.ai/resources/javascript-check-if-mobile-javascript-explained
if (navigator.userAgent.match(/Linux/i)) {
  createNewGrid(16); // assumed linux computer
} else if (navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/Android/i)) { 
    container.style.width = '280px';
    container.style.height = '280px';
    createNewGrid(10); // mobile
  } else {
    createNewGrid(16); // assumed windows computer
  }