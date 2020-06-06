let numPixels = 960;

function changeCell(e) {
    e.target.style.backgroundColor = 'black';
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
        cell.addEventListener('mouseenter', changeCell);

        container.appendChild(cell);

    }
}

function resetButtonPressed() {
    const numCells = +prompt('How many cells would ya like');
    resetGrid(numCells);
}
document.querySelector('#reset-btn').addEventListener('click', resetButtonPressed);
resetGrid(16);
