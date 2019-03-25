//Snake game app

var canvas;
var context;

var columns = 80;
var rows = 60;

var snakeL = 20;
var snakeW = 10;

var startX = 150;
var startY = 200;

var gridincrement = 10;

var moveIncrement = 10;

var randomincrement = 10;

var appleX = 400
var appleY = 300

var apples = 0

var x = 100;
var y = 100;
// var upArrow = false
// var downArrow = false
// var rightArrow = false
// var leftArrow = false





canvas = document.getElementById('snakeGame');
context = canvas.getContext('2d');
canvas.setAttribute('tabindex', 0);


var fps = 60;
setInterval(function() {
drawAll();


},1000/fps);


function collisionDetection(){
    if (startX > appleX-1 && startX <appleX+10 && startY >appleY-1 && startY <appleY+10) {
        multiplyByFive();
        snake.push({x:1000, y:1000});
        //intead of this, I might be able to make an if statement for when the snake eats the apple to not have the snake.pop()
        //method occur, but this method works too, but you might be able to tell that the snake does't instantly get bigger

    }

    if (startX > canvas.width-snake-1 || startX <1 || startY <1 || startY > canvas.height){
        snakeReset();
    }
}

function snakeReset(){
    startX = 200
    startY = 200
    multiplyByFive();
    alert("you lose!")
    snake.unshift(
        {x: startX, y: startY},
        {x: startX-moveIncrement, y: startY},
        {x: startX-2*moveIncrement, y: startY},
        {x: startX-3*moveIncrement, y: startY},
        {x: startX-4*moveIncrement, y: startY},)
}


var snake = [
    {x: startX, y: startY},
    {x: startX-moveIncrement, y: startY},
    {x: startX-2*moveIncrement, y: startY},
    {x: startX-3*moveIncrement, y: startY},
    {x: startX-4*moveIncrement, y: startY},
  ];



function drawSnake(){

    snake.forEach(drawSnakeCube);
}


function drawSnakeCube(snakeCube){

    context.fillStyle = 'green';
    context.strokestyle = 'darkgreen';
    
    context.fillRect(snakeCube.x,snakeCube.y,10,10);
    context.strokeRect(snakeCube.x,snakeCube.y,10,10);

}

 


function randomizeApple (max,min){
    return Math.floor(Math.random() *(max - min+1)+min);
}

function multiplyByFive (){
    appleX = randomizeApple(78,1)*randomincrement;
    appleY = randomizeApple(58,1)*randomincrement;
    apples+=1
}
document.addEventListener('keydown', keyDownHandler);


function keyDownHandler(ev){

    var code = ev.keyCode;

    // if (code == 38){
    //     upArrow = true;
    // }
    // if (code ==39){
    //     rightArrow = true;
    // }
    // if (code ==37){
    //     leftArrow = true;
    // }
    // if (code ==40){
    //     downArrow = true;
    // }
   

    if (code == 38){
        upArrow();
    }
    if (code ==39){
        rightArrow();
    }
    if (code ==37){
        leftArrow();
    }
    if (code ==40){
        downArrow();
    }   
}

function upArrow(){
    snake.unshift({x:startX, y:startY-moveIncrement});
    startY-=moveIncrement;
    snake.pop();
    console.log(startX);
}

function downArrow(){
    snake.unshift({x:startX, y:startY+moveIncrement});
    startY+=moveIncrement;
    snake.pop();
    console.log(startX);
}

function rightArrow(){
    snake.unshift({x:startX+moveIncrement, y:startY});
    startX+=moveIncrement;
    snake.pop();
    console.log(startX);
}

function leftArrow(){
    snake.unshift({x:startX-moveIncrement, y:startY});
    startX-=moveIncrement;
    snake.pop();
    console.log(startX);
   
}

function appleScore(){

    context.fillText("Score: " + apples, 750,50)
}
function drawAll () {

    // //canvas
    draw(0,0,canvas.width, canvas.height, 'black')
  

    //apple
    draw(appleX, appleY, 11,11,'red');

    drawSnake();
    appleScore();

    if(appleX == 790 || appleX == 0 ||appleY == 0 || appleY == 590) {
        alert("Error 4404: Apple outside boundary")
    }

    collisionDetection();
    


    function draw(leftX, topY, width, height, drawColor) {
        context.fillStyle = drawColor;
        context.fillRect(leftX, topY, width, height);
      }
}




// function makeApple(){
//     context.fillStyle = "red";
//     context.beginPath();
//     context.arc(305, 305, 5, 0, Math.PI*2, true);
//     context.fill();
// }



// var grid = []
// for(i=0; i<80; i++) {
//     grid[i] = [];
//     for(j=0; j<60; j++);
//     grid[i][j] = {x:0, y:0};
// }


    // if(upArrow) {
    //     y-=2;
    // }

    // if(rightArrow) {
    //     x+=2;
    // }

    // if(downArrow) {
    //     y+=2;
    // }

    // if(leftArrow) {
    //     x-=2;
    // }

            // context.beginPath();
        // context.rect(snakex, snakey, 20, 20);
        // context.fillStyle = "#0095DD";
        // context.fill();
        // context.closePath();

// function testSnake(){
// for(var i=lowerx; i<upperx; i++) {
//     for(var j=lowery; j<uppery; j++){
//         var snakex = i*moveIncrement;
//         var snakey =j*moveIncrement;
//         snake[i][j].x = snakex;
//         snake[i][j].y = snakey;

        
//         context.fillStyle = 'green';
//         context.strokestyle ='blue';

//         context.fillRect(snakex,snakey, moveIncrement,moveIncrement);

//         context.strokeRect(snakex,snakey,moveIncrement,moveIncrement);
//         }
//     }
// }


// var snake = [];
// for(var i=lowerx; i<upperx; i++) {
//     snake[i] = [];
//     for(var j=lowery; j<uppery; j++) {
//     snake[i][j] = {x: 0, y: 0};
//     }
