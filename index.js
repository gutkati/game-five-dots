let gameField = document.querySelector('#game-field')
let colorIndicator = document.querySelector('#color-indicator span')
const winGamer = 5

let numberRows = 10
let numberColumns = 10

let arrGamers = ['gamer1', 'gamer2']
let arrColorsGamers = ['red', 'green']

let arrMoveGamer1 = []
let arrMoveGamer2 = []

let numGamer = 0

let currentColor = arrGamers[numGamer]


function showGameField() {
    getGameField(numberRows, numberColumns)
}

function getGameField(numberRows, numberColumns) {
    for (let row = 0; row < numberRows; row++) {
        for (let col = 0; col < numberColumns; col++) {
            let cell = document.createElement('div')
            cell.classList.add('cell')
            gameField.appendChild(cell)
            cell.addEventListener('click', handleCellClick)
        }
    }
}

function handleCellClick(e) {
    let cell = e.target
    // Ставим точку
    const dot = document.createElement('div')
    dot.classList.add('dot', arrGamers[numGamer])
    cell.appendChild(dot)

    // отменить клик
    cell.removeEventListener('click', handleCellClick)

    // поменять номер игрока
    numGamer++
    if (numGamer == arrGamers.length) {
        numGamer = 0
    }

    // Поменять имя игрока и цвет имени игрока
    colorIndicator.textContent = `${arrGamers[numGamer] === 'gamer1' ? 'Красный' : 'Зеленый'}`
    colorIndicator.classList.remove('red', 'green')
    colorIndicator.classList.add(arrColorsGamers[numGamer])
}

showGameField()