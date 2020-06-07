let numPixels = 700;
let currentMode;

function getRandomStr() {
    return 'rgb('+Math.floor(Math.random() * 256)+','
            +Math.floor(Math.random() * 256)+','+Math.floor(Math.random() * 256) +')';
}

function getGradientStr(e) {
    let currentRGB = e.target.style.backgroundColor;
    if(!currentRGB) {
        return 'rgb(225, 225, 225)';
    }
    else {
        //adds 10% (25) darkness
        newRGBValue = +currentRGB.substring(4,currentRGB.indexOf(',')) - 25;
        if(newRGBValue <= 0) {
            e.target.setAttribute('isFilled', 't');
        }
        return 'rgb('+newRGBValue+','+newRGBValue+','+newRGBValue+')';
    }
}

function changeCell(e) {
    if(currentMode === 'eraser') {
        e.target.style.backgroundColor = null;
        e.target.setAttribute('isFilled', 'f');
    }
    else if(e.target.getAttribute('isFilled') === 't') { //if isFilled and not erasing, return out
        return;
    }
    else if(currentMode === 'black') {
        e.target.style.backgroundColor = 'black';
        e.target.setAttribute('isFilled', 't');
    }
    else if(currentMode === 'random') {
        e.target.style.backgroundColor = getRandomStr();
        e.target.setAttribute('isFilled', 't');
    }
    else {
        //gradient- precondition: must be unfilled or of type gradient
        e.target.style.backgroundColor = getGradientStr(e);
    }

}

function removePreviousGrid() {
    document.querySelectorAll(".cell").forEach(e => e.parentNode.removeChild(e));
}

function resetGrid(numCells) {
    removePreviousGrid();
    let cellSize = numPixels / numCells;
    for(let i = 0; i < numCells ** 2; i++) {
        const container = document.querySelector('#grid');

        //formats for new cells
        container.style.gridTemplateRows = 'repeat(' + numCells + ',' + cellSize + 'px)';
        container.style.gridTemplateColumns = 'repeat(' + numCells + ',' + cellSize + 'px)';

        //adds all cells
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.style.width = cellSize + "px";
        cell.style.height = cellSize + "px";
        cell.setAttribute('isFilled', 'f');
        cell.addEventListener('mouseenter', changeCell);

        container.appendChild(cell);

    }
}

function resetButtonPressed() {
    let numCells = +prompt('How many cells would ya like');
    while(isNaN(numCells) || numCells > 100 || numCells <= 0) {
        numCells = prompt('Invalid input, How many cells would ya like');
    }
    resetGrid(numCells);
}

function modeChangeHandler(e) {
    currentMode = e.target.value;
}

function setUp() {
    currentMode = 'black';

    const radioBtns = document.getElementsByName("mode");
    radioBtns.forEach(radioBtn => {
        radioBtn.onclick = modeChangeHandler;
    });
    
    
    document.querySelector('#reset-btn').addEventListener('click', resetButtonPressed);
    resetGrid(16);
}

setUp();