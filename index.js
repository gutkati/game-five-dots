let gameField = document.querySelector('#game-field')
let colorIndicator = document.querySelector('#color-indicator .red')
let startOver = document.querySelector('.start-over')
let rulesGame = document.querySelector('.rules')
let infoText = document.querySelector('.rules-game')
let CloseRules = document.querySelector('#close-rules')
let OpenTitle = document.querySelector('#open-title')
let subtitle = document.querySelector('#color-indicator .action')
const svg = document.querySelector('.lines')

let redColor = 'красный'
let greenColor = 'зеленый'

const winGamer = 5
let pointRow = 12
let pointCol = 24
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
            endGame(redColor, arrColorsGamers[numGamer])
            getMinMaxCoordinates(arrColorsGamers[numGamer])
            gameField.classList.add('blocked') // блокируется поле
            return
        }
    } else {
        arrMoveGamer2.push([row, col])
        if (checkWin(arrMoveGamer2)) {
            endGame(greenColor, arrColorsGamers[numGamer])
            getMinMaxCoordinates(arrColorsGamers[numGamer])
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
    colorIndicator.textContent = `${arrGamers[numGamer] === 'gamer1' ? redColor : greenColor}`
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
    subtitle.textContent = 'победил: '
    colorIndicator.classList.add(color)
    colorIndicator.textContent = name
}

function resetGamer() {

    let boardField = document.querySelectorAll('#game-field div')
    boardField.forEach(div => {
        div.innerHTML = ''
        div.addEventListener('click', handleCellClick)
    })

    svg.innerHTML = ''
    arrMoveGamer1 = []
    arrMoveGamer2 = []
    numGamer = 0
    colorIndicator.innerHTML = ''
    subtitle.textContent = 'ходит: '
    colorIndicator.classList.remove('red', 'green')
    colorIndicator.classList.add(arrColorsGamers[numGamer])
    colorIndicator.textContent = redColor
    gameField.classList.remove('blocked')
}

// по координатам добавить div элементы
function getMinMaxCoordinates(color) {
    let allMoves = [...arrMoveGamer1, ...arrMoveGamer2]
    const {minRowArray, maxRowArray} = getColumnMinMaxCoordinates(allMoves)
    const arrDivElement = []
    // перевернуть массив максимальных точек и добавить первую координату от минимальных точек
    let arrReverse = [...maxRowArray.reverse(), minRowArray[0]]
    // объединить в общий массив
    const arrCells = [...minRowArray, ...arrReverse]
    arrCells.forEach(([row, col]) => {
        arrDivElement.push(document.querySelector(`.cell[data-row="${row}"][data-col="${col}"]`))
    })

    connectCellsWithLine(arrDivElement, color)
}

// возвращает по колонкам массивы строк с min и max координатами точек
function getColumnMinMaxCoordinates(points) {
    // Группируем точки по колонкам
    const columns = {}

    points.forEach(([row, col]) => {
        if (!columns[col]) {
            columns[col] = []
        }
        columns[col].push(row)
    })

    // Формируем результат в нужном формате
    const minRowArray = []
    const maxRowArray = []
    Object.entries(columns).forEach(([col, rows]) => {
        const minRow = Math.min(...rows)
        const maxRow = Math.max(...rows)
        minRowArray.push([minRow, parseInt(col, 10)]) // Минимум
        maxRowArray.push([maxRow, parseInt(col, 10)]) // Максимум
    })

    return {minRowArray, maxRowArray}
}

// отрисовка линии по координатам точек игроков
function connectCellsWithLine(cells, color) {
    let fieldRect = gameField.getBoundingClientRect()
    const svg = document.querySelector('.lines')

    for (let i = 0; i < cells.length - 1; i++) {
        const startCell = cells[i]
        const endCell = cells[i + 1]

        // Получить координаты начального и конечного элементов
        const startRect = startCell.getBoundingClientRect()
        const endRect = endCell.getBoundingClientRect()

        // Вычислить центр ячеек
        const startX = (startRect.left + startRect.width / 2) - fieldRect.left
        const startY = (startRect.top + startRect.height / 2) - fieldRect.top
        const endX = (endRect.left + endRect.width / 2) - fieldRect.left
        const endY = (endRect.top + endRect.height / 2) - fieldRect.top

        // Создать линию
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', startX)
        line.setAttribute('y1', startY)
        line.setAttribute('x2', endX)
        line.setAttribute('y2', endY)
        line.setAttribute('stroke', color);
        line.setAttribute('stroke-width', '2');

        // Добавить линию в SVG
        svg.appendChild(line);
    }
}

startOver.addEventListener('click', function () {
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