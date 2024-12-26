let gameField = document.querySelector('#game-field')
let colorIndicator = document.querySelector('#color-indicator span')
const winGamer = 5

let fieldSize = 9
let arrGamers = ['gamer1', 'gamer2']
let arrColorsGamers = ['red', 'green']

let arrMoveGamer1 = []
let arrMoveGamer2 = []

let numGamer = 0

const board = Array.from({length: fieldSize}, () => Array(fieldSize).fill(null));

console.log('board', board)

function showGameField() {
    getGameField(fieldSize)
}

function getGameField(fieldSize) {
    for (let row = 0; row < fieldSize; row++) {
        for (let col = 0; col < fieldSize; col++) {
            let cell = document.createElement('div')
            cell.classList.add('cell')
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick)
            gameField.appendChild(cell)
        }
    }
}

function handleCellClick(e) {
    let cell = e.target
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);
    // Ставим точку
    const dot = document.createElement('div')
    dot.classList.add('dot', arrGamers[numGamer])
    cell.appendChild(dot)
    // отменить клик
    cell.removeEventListener('click', handleCellClick)

    if (arrGamers[numGamer] === 'gamer1') {
        arrMoveGamer1.push([row, col])
    } else {
        arrMoveGamer2.push([row,col])
    }

    console.log('gamer', arrGamers[numGamer])
    console.log('red', arrMoveGamer1)
    console.log('green', arrMoveGamer2)

    // поменять номер игрока
    numGamer++
    if (numGamer === arrGamers.length) {
        numGamer = 0
    }

    // Поменять имя игрока и цвет имени игрока
    colorIndicator.textContent = `${arrGamers[numGamer] === 'gamer1' ? 'Красный' : 'Зеленый'}`
    colorIndicator.classList.remove('red', 'green')
    colorIndicator.classList.add(arrColorsGamers[numGamer])
    console.log('board', board)


}

showGameField()