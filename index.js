let gameField = document.querySelector('#game-field')
let colorIndicator = document.querySelector('#color-indicator span')
let showWinner = document.querySelector('.end-game')
let closeEnd = document.querySelector('#close-end')
let nameGamer = document.querySelector('.name-gamer span')
let startOver = document.querySelector('.start-over')
let rulesGame = document.querySelector('.rules')
let infoText = document.querySelector('.rules-game')
let CloseRules = document.querySelector('#close-rules')
let OpenTitle = document.querySelector('#open-title')


const winGamer = 5
let pointRow = 10
let pointCol = 17
let numGamer = 0

let arrGamers = ['gamer1', 'gamer2']
let arrColorsGamers = ['red', 'green']

let arrMoveGamer1 = []
let arrMoveGamer2 = []

function showGameField() {
    getGameField(pointRow, pointCol)
}

function getGameField(pointRow, pointCol) {
    for (let row = 0; row < pointRow; row++) {
        for (let col = 0; col < pointCol; col++) {
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
    closeEnd.addEventListener('click', function () {
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

startOver.addEventListener('click', function () {
    showWinner.classList.remove('end-game_visible')
    resetGamer()
})

rulesGame.addEventListener('click', showPopupRulesGame)

OpenTitle.addEventListener('click', showPopupRulesGame)

function showPopupRulesGame() {
    infoText.classList.add('rules-game_visible')
    CloseRules.addEventListener('click', function () {
        infoText.classList.remove('rules-game_visible')
    })
}

showGameField()