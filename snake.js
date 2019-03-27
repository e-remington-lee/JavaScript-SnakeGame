//Snake game app

var canvas;
var context;

var columns = 80;
var rows = 60;

var snakeL = 20;
var snakeW = 10;



var direction = 'East'

var moveIncrement = 10;

var randomincrement = 10;

var appleX = 200
var appleY = 200

var score = 0
var highScore = 0

canvas = document.getElementById('snakeGame');
context = canvas.getContext('2d');
canvas.setAttribute('tabindex', 0);

var startX = canvas.width/2;
var startY = canvas.height/2;



var fps = 15;
setInterval(runGame,1000/fps);

function runGame(){

    drawBorder();
    drawCanvas();

    drawApple();

    drawSnake();

    drawAppleScore();

    var snakeBoundaryCollision = detectBoundaryCollision();
    if (snakeBoundaryCollision){
        alert("Game Over");
        snakeReset();
    }

    if(direction == 'East'){
        rightArrow();
    } 
    if(direction == 'North'){
        upArrow();
    }
    if(direction == 'South'){
        downArrow();
    }
    if(direction == 'West'){
        leftArrow();
    }

    var selfCollision = checkforSelfCollision();
    if (selfCollision){
        alert("Game Over")
        snakeReset();  
    }

    snakeEatApple();
}
   

function draw(leftX, topY, width, height, drawColor, lineColor) {
    context.fillStyle = drawColor;
    context.strokestyle = lineColor;

    context.fillRect(leftX, topY, width, height);
    context.strokeRect(leftX, topY, width, height)
;
  }

function drawBorder(){
    draw(0,0,canvas.width, canvas.height,'gray', 'gray')
}

function drawCanvas(){
    draw(moveIncrement,moveIncrement,canvas.width-2*moveIncrement, canvas.height-2*moveIncrement, 'black', 'red')
}

function drawApple(){
    draw(appleX, appleY, 10,10,'red', 'green');
}

function drawAppleScore(){
    context.font = '15px Georgia'
    context.fillText("Score: " + score, 690,40)
    context.fillText("High Score: " + highScore, 690,55)
}

function detectBoundaryCollision(){
    if (startX > canvas.width-moveIncrement-1 || startX < moveIncrement-1 || startY < moveIncrement-1
        || startY > canvas.height-moveIncrement-1){
        return true;
    }
    return false;
}

function checkforSelfCollision(){
   for (let i =0; i<snake.length; i++){
       var snakeCubeX = snake[i].x;
       var snakeCubeY = snake[i].y;
       if(startX == snakeCubeX && startY == snakeCubeY){
           return true;
       }
   }
}

function snakeEatApple(){
    if (startX == appleX && startY == appleY) {
        randomizeApplePlacement();
        score+=1;
        if (score>highScore){
            highScore+=1
        }
        snake.push({x:1000, y:1000});
    }
}

function snakeReset(){
    var randomStart = getRange(40,38);

    if (randomStart == 38){
        direction = 'North';
    }
    if (randomStart ==39){
        direction = 'East';
    }
    if (randomStart ==40){
        direction = 'South';
    } 

    startX = canvas.width/2;
    startY = canvas.height/2;
   
    score = 0;
    
    while(snake.length>0){
        snake.pop();
    }
    snakeHead.unshift({x: startX, y: startY});
    snakeHead.pop();
    snake.unshift(
        {x: startX-moveIncrement, y: startY},
        {x: startX-2*moveIncrement, y: startY},
        {x: startX-3*moveIncrement, y: startY},
        {x: startX-4*moveIncrement, y: startY},)

    randomizeApplePlacement();
}

var snakeHead =[{x: startX, y: startY}];

var snake = [
    {x: startX-moveIncrement, y: startY},
    {x: startX-2*moveIncrement, y: startY},
    {x: startX-3*moveIncrement, y: startY},
    {x: startX-4*moveIncrement, y: startY},
  ];

function drawSnake(){
    snakeHead.forEach(drawSnakeCube)
    snake.forEach(drawSnakeCube);
}

function drawSnakeCube(snakeCube){

    context.fillStyle = 'green';
    context.strokestyle = 'darkgreen';
    
    context.fillRect(snakeCube.x,snakeCube.y,10,10);
    context.strokeRect(snakeCube.x,snakeCube.y,10,10);
}

function getRange (max,min){
    return Math.floor(Math.random() *(max - min+1)+min);
}

function randomizeApplePlacement (){
    appleX = getRange(78,1)*randomincrement;
    appleY = getRange(58,1)*randomincrement;  
}

document.addEventListener('keydown', keyDownHandler);

function keyDownHandler(ev){
    var code = ev.keyCode;

    if (code == 38){
        direction = 'North';
    }
    if (code ==39){
        direction = 'East';
    }
    if (code ==37){
        direction = 'West';
    }
    if (code ==40){
        direction = 'South';
    }   
}

function upArrow(){
    snakeHead.unshift({x:startX, y:startY-moveIncrement});
    snakeHead.pop();
    snake.unshift({x:startX, y:startY})
    startY-=moveIncrement;
    snake.pop();
    console.log(startX);
    }


function downArrow(){
    snakeHead.unshift({x:startX, y:startY+moveIncrement});
    snakeHead.pop();
    snake.unshift({x:startX, y:startY})
    startY+=moveIncrement;
    snake.pop();
    console.log(startX);
}

function rightArrow(){
    snakeHead.unshift({x:startX+moveIncrement, y:startY});
    snakeHead.pop();
    snake.unshift({x:startX, y:startY})
    startX+=moveIncrement;
    snake.pop();
    console.log(startX);
}

function leftArrow(){
    snakeHead.unshift({x:startX-moveIncrement, y:startY});
    snakeHead.pop();
    snake.unshift({x:startX, y:startY})
    startX-=moveIncrement;
    snake.pop();
    console.log(startX);  
}