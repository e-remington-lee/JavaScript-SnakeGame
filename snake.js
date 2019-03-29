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

var apple = {
    x: 200,
    y: 200,
    length: 10,
    width: 10,
    color: 'red',
    strokeColor: 'red',
}

var score = 0;
var highScore = 0;

canvas = document.getElementById('snakeGame');
context = canvas.getContext('2d');
canvas.setAttribute('tabindex', 0);

var snakeHead = {
    x: canvas.width / 2,
    y: canvas.width / 2,
    length: 10,
    width: 10,
    color: 'green',
    strokeColor: 'darkgreen',
}

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
    draw(apple.x, apple.y, apple.length, apple.width, apple.color, apple.strokeColor);
}

function drawAppleScore() {
    context.font = '15px Georgia'
    context.fillText("Score: " + score, 690, 40)
    context.fillText("High Score: " + highScore, 690, 55)
}

function stopIntervalFunction(mainGaime) {
    clearInterval(mainGaime);
    console.log("Game Over...Reloading...");
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
    if (snakeHead.x > canvas.width - 1 || snakeHead.x < -1 || snakeHead.y < -1 ||
        snakeHead.y > canvas.height - 1) {
        return true;
    }
    return false;
}

function checkforSelfCollision() {
    for (let i = 0; i < snake.length; i++) {
        var snakeCubeX = snake[i].x;
        var snakeCubeY = snake[i].y;
        if (snakeHead.x == snakeCubeX && snakeHead.y == snakeCubeY) {
            return true;
        }
    }
}

function snakeEatApple() {
    if (snakeHead.x == apple.x && snakeHead.y == apple.y) {
        randomizeApplePlacement();
        score += 1;
        if (score > highScore) {
            highScore += 1
        }
        snake.push({
            x: 10000000,
            y: 10000000
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

    snakeHead.x = canvas.width / 2;
    snakeHead.y = canvas.height / 2;

    score = 0;

    while (snake.length > 0) {
        snake.pop();
    }
    snakeHeadPiece.unshift({
        x: snakeHead.x,
        y: snakeHead.y
    });
    snakeHeadPiece.pop();
    snake.unshift({
        x: snakeHead.x - moveIncrement,
        y: snakeHead.y
    }, {
        x: snakeHead.x - 2 * moveIncrement,
        y: snakeHead.y
    }, {
        x: snakeHead.x - 3 * moveIncrement,
        y: snakeHead.y
    }, {
        x: snakeHead.x - 4 * moveIncrement,
        y: snakeHead.y
    }, )

    randomizeApplePlacement();
}

var snakeHeadPiece = [{
    x: snakeHead.x,
    y: snakeHead.y
}];

var snake = [{
        x: snakeHead.x - moveIncrement,
        y: snakeHead.y
    },
    {
        x: snakeHead.x - 2 * moveIncrement,
        y: snakeHead.y
    },
    {
        x: snakeHead.x - 3 * moveIncrement,
        y: snakeHead.y
    },
    {
        x: snakeHead.x - 4 * moveIncrement,
        y: snakeHead.y
    },
];

function drawSnake() {
    snakeHeadPiece.forEach(drawSnakeCube)
    snake.forEach(drawSnakeCube);
}

function drawSnakeCube(snakeCube) {

    context.fillStyle = snakeHead.color;
    context.strokestyle = snakeHead.strokeColor;

    context.fillRect(snakeCube.x, snakeCube.y, snakeHead.length, snakeHead.width);
    context.strokeRect(snakeCube.x, snakeCube.y, snakeHead.length, snakeHead.width);
}

function getRange(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomizeApplePlacement() {
    apple.x = getRange(78, 1) * randomincrement;
    apple.y = getRange(58, 1) * randomincrement;
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
    snakeHeadPiece.unshift({
        x: snakeHead.x,
        y: snakeHead.y - moveIncrement
    });
    snakeHeadPiece.pop();
    snake.unshift({
        x: snakeHead.x,
        y: snakeHead.y
    });
    snakeHead.y -= moveIncrement;
    snake.pop();
}


function downArrow() {
    snakeHeadPiece.unshift({
        x: snakeHead.x,
        y: snakeHead.y + moveIncrement
    });
    snakeHeadPiece.pop();
    snake.unshift({
        x: snakeHead.x,
        y: snakeHead.y
    });
    snakeHead.y += moveIncrement;
    snake.pop();
}

function rightArrow() {
    snakeHeadPiece.unshift({
        x: snakeHead.x + moveIncrement,
        y: snakeHead.y
    });
    snakeHeadPiece.pop();
    snake.unshift({
        x: snakeHead.x,
        y: snakeHead.y
    });
    snakeHead.x += moveIncrement;
    snake.pop();

}

function leftArrow() {
    snakeHeadPiece.unshift({
        x: snakeHead.x - moveIncrement,
        y: snakeHead.y
    });
    snakeHeadPiece.pop();
    snake.unshift({
        x: snakeHead.x,
        y: snakeHead.y
    });
    snakeHead.x -= moveIncrement;
    snake.pop();
}