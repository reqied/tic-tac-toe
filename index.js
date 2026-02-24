const CROSS = 'X';
const ZERO = 'O';
const EMPTY = ' ';

const container = document.getElementById('fieldWrapper');
let field = [
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
    ];
let step = 1;
let winnerExist = false;
startGame();
addResetListener();


function startGame () {
    renderGrid(3);
}
function checkWinner () {
    for (let i = 0; i < field.length; i++) {
        let check = [[i,0], [i,1], [i,2]]
        if (field[i].every(val => val === CROSS))
            return [CROSS, check];
        if (field[i].every(val => val === ZERO))
            return [ZERO, check];
    }
    for (let i = 0; i < field.length; i++) {
        let column = [field[0][i], field[1][i], field[2][i]];
        let check = [[0,i], [1,i], [2,i]]
        if (column.every(val => val === CROSS)) {
            return [CROSS, check];
        }
        if (column.every(val => val === ZERO)) {
            return [ZERO, check];
        }
    }
    let diagonal1 = [field[0][0], field[1][1], field[2][2]]
    let check1 = [[0,0], [1,1], [2,2]];
    if (diagonal1.every(val => val === CROSS)) {
        return [CROSS, check1];
    }
    if (diagonal1.every(val => val === ZERO)) {
        return [ZERO, check1];
    }
    let diagonal2 = [field[0][2], field[1][1], field[2][0]]
    let check2 = [[0,2], [1,1], [2,0]];
    if (diagonal2.every(val => val === CROSS)) {
        return [CROSS, check2];
    }
    if (diagonal2.every(val => val === ZERO)) {
        return [ZERO, check2];
    }
    return null;
}

function renderGrid (dimension) {
    container.innerHTML = '';
    for (let i = 0; i < dimension; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < dimension; j++) {
            const cell = document.createElement('td');
            cell.textContent = EMPTY;
            field[i][j] = EMPTY;
            cell.addEventListener('click', () => cellClickHandler(i, j));
            row.appendChild(cell);
        }
        container.appendChild(row);
    }
}

function cellClickHandler (row, col) {

    console.log(`Clicked on cell: ${row}, ${col}`);
    if (field[row][col] !== EMPTY || winnerExist) {
        return;
    }
    if (step % 2 === 1){
        renderSymbolInCell(CROSS, row, col)
        field[row][col] = CROSS;
    } else {
        renderSymbolInCell(ZERO, row, col)
        field[row][col] = ZERO;
    }
    step += 1;
    let WINNER = checkWinner();
    if (WINNER) {
        winnerExist = true;
        let player = WINNER[0];
        for (const element of WINNER[1].slice(0, WINNER[1].length)) {
            renderSymbolInCell(player, element[0], element[1], 'red')
        }
    }
    if (step === 10) alert("Победила дружба");
}

function renderSymbolInCell (symbol, row, col, color = '#333') {
    const targetCell = findCell(row, col);

    targetCell.textContent = symbol;
    targetCell.style.color = color;
}

function findCell (row, col) {
    const targetRow = container.querySelectorAll('tr')[row];
    return targetRow.querySelectorAll('td')[col];
}

function addResetListener () {
    const resetButton = document.getElementById('reset');
    resetButton.addEventListener('click', resetClickHandler);
}

function resetClickHandler () {
    renderGrid(3)
    console.log('reset!');
}


/* Test Function */
/* Победа первого игрока */
function testWin () {
    clickOnCell(0, 2);
    clickOnCell(0, 0);
    clickOnCell(2, 0);
    clickOnCell(1, 1);
    clickOnCell(2, 2);
    clickOnCell(1, 2);
    clickOnCell(2, 1);
}

/* Ничья */
function testDraw () {
    clickOnCell(2, 0);
    clickOnCell(1, 0);
    clickOnCell(1, 1);
    clickOnCell(0, 0);
    clickOnCell(1, 2);
    clickOnCell(1, 2);
    clickOnCell(0, 2);
    clickOnCell(0, 1);
    clickOnCell(2, 1);
    clickOnCell(2, 2);
}

function clickOnCell (row, col) {
    findCell(row, col).click();
}
