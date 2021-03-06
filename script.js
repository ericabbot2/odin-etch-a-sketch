// script.js

//document.documentElement.style.overflow = 'hidden';
document.querySelector('#fullscreen-button').addEventListener('click', function () {
    let elem = document.documentElement;
    if (!document.fullscreenElement) {
        elem.requestFullscreen().catch(err => {
          alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
        });
      } else {
        document.exitFullscreen();
      }
})

let gridContainer = document.querySelector('#grid-container')
gridContainer.addEventListener('mousedown', toggleDrawing)
gridContainer.addEventListener('touchstart', toggleDrawing)
gridContainer.addEventListener('mouseup', toggleDrawing)
gridContainer.addEventListener('touchend', toggleDrawing)

function toggleDrawing(e) {
    drawing = !drawing
    //console.log(e)
}

// Step 1: create 16x16 grid of square divs
// inside a container div

let rowSize = 16;
let totalRows = rowSize;
let cellArray = []
let drawing = false;

function drawGrid(){
    for (i=0; i < totalRows; i++) {
        let gridRow = document.createElement('div');
        gridRow.classList.add('grid-row');
        for (j=0; j < rowSize; j++) {
            let gridCell = document.createElement('div');
            gridCell.classList.add('grid-cell')
            gridRow.appendChild(gridCell)
            cellArray.push(gridCell)
        }
        gridContainer.appendChild(gridRow)
    }

    cellArray.forEach(cell => 
        cell.addEventListener('mousedown', activateCell));
    cellArray.forEach(cell => 
        cell.addEventListener('mousemove', activateCell));
    cellArray.forEach(cell => 
        cell.addEventListener('touchmove', activateCell));
}

// Step 2: add hover effect on divs to change color
// on mouse over (background color)
    // Step 2a: add with event listener on mouse over
    // and add class
    // Step 3a: have to have mouse down for the
    // color to apply


function activateCell(e) {
    let cell = e.target
    if (e.type === 'mousedown') {
        cell.classList.add('active')
    }
    if (e.type === 'touchmove') {
        cell = document.elementFromPoint(e.changedTouches[0].clientX, e.changedTouches[0].clientY);
    }
    if (drawing === true) {
        cell.classList.add('active')
    }

    //console.log(e)
}

// Step 3: add button (top of screen) to clear
// current grid and send user popup asking for
// number of sqaures per side for new grid
    // Step 3a. maximum squares per side = 100
    // NOTE: grid should be generated in same total
    // space as before
    // NOTE: use button and prompt
// Step 4: Optional changing color task/fading to black

let sizeBtn = document.querySelector('#size-button')
sizeBtn.addEventListener('click', setGrid);

let resetBtn = document.querySelector('#reset-button')
resetBtn.addEventListener('click', resetGrid);

function setGrid() {
    for (i=0; i < cellArray.length; i++) {
        // cellArray[i].classList.remove('active')
        cellArray[i].parentNode.remove()
    };

    let rowSizeInput = prompt("Input new grid size (less than 100)")
    rowSizeInput = parseInt(rowSizeInput);
    if (rowSizeInput > 100) {
        rowSizeInput = 100;
    }
    if (!rowSizeInput){
        rowSizeInput = 2;
    }
    rowSize = rowSizeInput;
    totalRows = rowSize;
    drawGrid()

};

function resetGrid() {
    for (i=0; i < cellArray.length; i++) {
        cellArray[i].classList.remove('active')
    };
};

drawGrid()
