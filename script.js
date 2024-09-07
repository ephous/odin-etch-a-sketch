const container = document.querySelector('#container');
for (let i=0;i<16;i++){
    
    let gridRow = document.createElement('div');
    gridRow.className = "grid-row";
    container.appendChild(gridRow);
    
    for (let i=0;i<16;i++){
        let gridSquare = document.createElement('div');
        gridSquare.className = "grid-square";
        gridRow.appendChild(gridSquare);
    }
}

container.addEventListener('mouseover', (e) => {
    //works too: e.target.style.backgroundColor="rebeccapurple";
    if(e.target.className=="grid-square"){
        e.target.className="grid-square marked";
    }
}, false)
