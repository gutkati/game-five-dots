let gameField = document.querySelector('#game-field')
let colorIndicator = document.querySelector('#color-indicator span')
let showWinner = document.querySelector('.end-game')
let close = document.querySelector('.close')
let nameGamer = document.querySelector('.name-gamer span')
let startOver = document.querySelector('.start-over')

const winGamer = 5
let fieldSize = 9
let numGamer = 0

let arrGamers = ['gamer1', 'gamer2']
let arrColorsGamers = ['red', 'green']

let arrMoveGamer1 = []
let arrMoveGamer2 = []

function showGameField() {
    getGameField(fieldSize)
}

startOver.addEventListener('click', function () {
    showWinner.classList.remove('end-game_visible')
    resetGamer()
})

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
//     отменить клик
    cell.removeEventListener('click', handleCellClick)

    if (arrGamers[numGamer] === 'gamer1') {
        arrMoveGamer1.push([row, col])
        if (checkWin(arrMoveGamer1)) {
            endGame('Красный', arrColorsGamers[numGamer])
            gameField.classList.add('blocked') // блокируется поле
            return
        }
    } else {
        arrMoveGamer2.push([row, col])
        if (checkWin(arrMoveGamer2)) {
            endGame('Зеленый', arrColorsGamers[numGamer])
            gameField.classList.add('blocked') // блокируется поле
            return
        }
    }
    
    // поменять номер игрока
    numGamer++
    if (numGamer === arrGamers.length) {
        numGamer = 0
    }

    // Поменять имя игрока и цвет имени игрока
    colorIndicator.textContent = `${arrGamers[numGamer] === 'gamer1' ? 'Красный' : 'Зеленый'}`
    colorIndicator.classList.remove('red', 'green')
    colorIndicator.classList.add(arrColorsGamers[numGamer])
}

function checkWin(arrMoves) {

    const directions = [
        [0, 1], // горизонталь
        [1, 0], // вертикаль
        [1, 1], // диагональ вправо вниз
        [1, -1] // диагональ вправо вверх
    ]

    for (const [x, y] of directions) {
        for (const [res, col] of arrMoves) {
            let count = 1
            for (let step = 1; step <= winGamer; step++) {
                if (arrMoves.some(([r, c]) => r === res + x * step && c === col + y * step)) {
                    count++
                } else {
                    break
                }
            }

            for (let step = 1; step <= winGamer; step++) {
                if (arrMoves.some(([r, c]) => r === res - x * step && c === col - y * step)) {
                    count++
                } else {
                    break
                }
            }

            if (count >= winGamer) {
                return true
            }
        }
    }
    return false
}

function endGame(name, color) {
    showWinner.classList.add('end-game_visible')
    nameGamer.textContent = name
    nameGamer.classList.add(color)
    close.addEventListener('click', function () {
        showWinner.classList.remove('end-game_visible')
    })
}

function resetGamer() {
    arrMoveGamer1 = []
    arrMoveGamer2 = []
    numGamer = 0
    gameField.innerHTML = '';
    colorIndicator.classList.remove('red', 'green')
    colorIndicator.classList.add(arrColorsGamers[numGamer])
    colorIndicator.textContent = "Красный"
    gameField.classList.remove('blocked')
    showGameField()
}

showGameField()