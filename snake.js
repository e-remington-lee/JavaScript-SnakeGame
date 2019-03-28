//Snake game app

const DIRECTION = {
    NORTH: "NORTH",
    SOUTH: 'SOUTH',
    EAST: 'EAST',
    WEST: 'WEST'
};

var canvas;
var context;

var columns = 80;
var rows = 60;

var direction = DIRECTION.EAST;

var moveIncrement = 10;

var randomincrement = 10;


var appleX = 200;
var appleY = 200;

var score = 0;
var highScore = 0;

canvas = document.getElementById('snakeGame');
context = canvas.getContext('2d');
canvas.setAttribute('tabindex', 0);

var startX = canvas.width / 2;
var startY = canvas.height / 2;


var fps = 15;
var mainGaime = setInterval(runGame, 1000 / fps);

function runGame() {


    drawCanvas();

    drawApple();

    drawSnake();

    drawAppleScore();

    var snakeBoundaryCollision = detectBoundaryCollision();
    if (snakeBoundaryCollision) {
        stopIntervalFunction();
        snakeReset();
    }

    moveSnake();

    var selfCollision = checkforSelfCollision();
    if (selfCollision) {
        stopIntervalFunction();
        snakeReset();
    }

    snakeEatApple();
}



function draw(leftX, topY, width, height, drawColor, lineColor) {
    context.fillStyle = drawColor;
    context.strokestyle = lineColor;

    context.fillRect(leftX, topY, width, height);
    context.strokeRect(leftX, topY, width, height);
}

function drawCanvas() {
    draw(0, 0, canvas.width, canvas.height, 'black', 'red')
}

function drawApple() {
    draw(appleX, appleY, 10, 10, 'red', 'black');
}

function drawAppleScore() {
    context.font = '15px Georgia'
    context.fillText("Score: " + score, 690, 40)
    context.fillText("High Score: " + highScore, 690, 55)
}

function stopIntervalFunction(mainGaime) {
    clearInterval(mainGaime);
    alert("Game Over...Play Again?");
}

function moveSnake() {

    if (direction == DIRECTION.EAST) {
        rightArrow();
    }
    if (direction == DIRECTION.NORTH) {
        upArrow();
    }
    if (direction == DIRECTION.SOUTH) {
        downArrow();
    }
    if (direction == DIRECTION.WEST) {
        leftArrow();
    }
}

function detectBoundaryCollision() {
    if (startX > canvas.width - 1 || startX < -1 || startY < -1 ||
        startY > canvas.height - 1) {
        return true;
    }
    return false;
}

function checkforSelfCollision() {
    for (let i = 0; i < snake.length; i++) {
        var snakeCubeX = snake[i].x;
        var snakeCubeY = snake[i].y;
        if (startX == snakeCubeX && startY == snakeCubeY) {
            return true;
        }
    }
}

function snakeEatApple() {
    if (startX == appleX && startY == appleY) {
        randomizeApplePlacement();
        score += 1;
        if (score > highScore) {
            highScore += 1
        }
        snake.push({
            x: 1000,
            y: 1000
        });
    }
}

function snakeReset() {
    var randomStart = getRange(40, 38);

    if (randomStart == 38) {
        direction = DIRECTION.NORTH;
    }
    if (randomStart == 39) {
        direction = DIRECTION.EAST;
    }
    if (randomStart == 40) {
        direction = DIRECTION.SOUTH;
    }

    startX = canvas.width / 2;
    startY = canvas.height / 2;

    score = 0;

    while (snake.length > 0) {
        snake.pop();
    }
    snakeHead.unshift({
        x: startX,
        y: startY
    });
    snakeHead.pop();
    snake.unshift({
        x: startX - moveIncrement,
        y: startY
    }, {
        x: startX - 2 * moveIncrement,
        y: startY
    }, {
        x: startX - 3 * moveIncrement,
        y: startY
    }, {
        x: startX - 4 * moveIncrement,
        y: startY
    }, )

    randomizeApplePlacement();
}

var snakeHead = [{
    x: startX,
    y: startY
}];

var snake = [{
        x: startX - moveIncrement,
        y: startY
    },
    {
        x: startX - 2 * moveIncrement,
        y: startY
    },
    {
        x: startX - 3 * moveIncrement,
        y: startY
    },
    {
        x: startX - 4 * moveIncrement,
        y: startY
    },
];

function drawSnake() {
    snakeHead.forEach(drawSnakeCube)
    snake.forEach(drawSnakeCube);
}

function drawSnakeCube(snakeCube) {

    context.fillStyle = 'green';
    context.strokestyle = 'darkgreen';

    context.fillRect(snakeCube.x, snakeCube.y, 10, 10);
    context.strokeRect(snakeCube.x, snakeCube.y, 10, 10);
}

function getRange(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomizeApplePlacement() {
    appleX = getRange(78, 1) * randomincrement;
    appleY = getRange(58, 1) * randomincrement;
}

document.addEventListener('keydown', keyDownHandler);

function keyDownHandler(ev) {
    var code = ev.keyCode;

    if (code == 38) {
        direction = DIRECTION.NORTH;
    }
    if (code == 39) {
        direction = DIRECTION.EAST;
    }
    if (code == 37) {
        direction = DIRECTION.WEST;
    }
    if (code == 40) {
        direction = DIRECTION.SOUTH;
    }
}

function upArrow() {
    snakeHead.unshift({
        x: startX,
        y: startY - moveIncrement
    });
    snakeHead.pop();
    snake.unshift({
        x: startX,
        y: startY
    });
    startY -= moveIncrement;
    snake.pop();
}


function downArrow() {
    snakeHead.unshift({
        x: startX,
        y: startY + moveIncrement
    });
    snakeHead.pop();
    snake.unshift({
        x: startX,
        y: startY
    });
    startY += moveIncrement;
    snake.pop();
}

function rightArrow() {
    snakeHead.unshift({
        x: startX + moveIncrement,
        y: startY
    });
    snakeHead.pop();
    snake.unshift({
        x: startX,
        y: startY
    });
    startX += moveIncrement;
    snake.pop();

}

function leftArrow() {
    snakeHead.unshift({
        x: startX - moveIncrement,
        y: startY
    });
    snakeHead.pop();
    snake.unshift({
        x: startX,
        y: startY
    });
    startX -= moveIncrement;
    snake.pop();
}