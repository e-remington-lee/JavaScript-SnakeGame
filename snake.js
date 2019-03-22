//Snake game app

var canvas;
var context;

var columns = 80;
var rows = 60;

var snakeL = 20;
var snakeW = 10;
var x;
var y;
var gridincrement = 10
var moveIncrement = 10;
var randomincrement = 10;
var appleX = 400
var appleY = 300
var snakeCube = 3

// var upArrow = false
// var downArrow = false
// var rightArrow = false
// var leftArrow = false



// var grid = []
// for(i=0; i<80; i++) {
//     grid[i] = [];
//     for(j=0; j<60; j++);
//     grid[i][j] = {x:0, y:0};
// }




canvas = document.getElementById('snakeGame');
context = canvas.getContext('2d');
canvas.setAttribute('tabindex', 0);


var fps = 60;
setInterval(function() {
drawAll();


},1000/fps);

    // canvas.addEventListener('keydown', function(ev) {
    //     var keyReturn = moveSnake(ev);
    //     console.log(keyReturn);
    // })


function collisionDetection(){
    if (x > appleX-1 && x <appleX+10 && y >appleY-1 && y<appleY+10) {
        multiplyByFive();}

    if (x > canvas.width-snakeW-1 || x <1 || y <1 || y > canvas.height){
        snakeReset();
    }

}

function snakeReset(){
    x = 300
    y = 300
    multiplyByFive();
    alert("you lose!")
 
}

var snake = [
    {x: 150, y: 150},
    {x: 140, y: 150},
    {x: 130, y: 150},
    {x: 120, y: 150},
    {x: 110, y: 150},
  ];




var items = [
    [1, 2],
    [3, 4],
    [5, 6]
  ];
  console.log(items[0][1]); //2, 0,0 returns 1
  console.log(items); //returns the array


// context.fillstyle = 'blue';
// for(i=0; i<snakeCube; i++) {
//     for(j=0;j<1;j++){
//         var x = i*gridincrement;
//         var y =j*gridincrement;
        
//         context.fillRect(x,y,gridincrement,gridincrement);

//     }

function drawSnake(){

    snake.forEach(drawSnakePart);
}


function drawSnakePart(snakePart){

    context.fillStyle = 'green';
    context.strokestyle = 'darkgreen';
    
    context.fillRect(snakePart.x,snakePart.y,10,10);
    context.strokeRect(snakePart.x,snakePart.y,10,10);

}




function randomizeApple (max,min){
    return Math.floor(Math.random() *(max - min+1));
}

function multiplyByFive (){
    appleX = randomizeApple(80,10)*randomincrement;
    appleY = randomizeApple(60,10)*randomincrement;

    // console.log(randomizeApple(80,30)*moveIncrement), console.log(randomizeApple(60,30)*moveIncrement);

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
    snakePart.y -= moveIncrement;
    return console.log(y);
}

function downArrow(){
    y +=moveIncrement;
    return y,console.log(y);
}

function rightArrow(){
    x +=moveIncrement;
    return x,console.log(x);
}

function leftArrow(){
    x -=moveIncrement;
    return x,console.log(x);
}

function drawAll () {

    // //canvas
    draw(0,0,canvas.width, canvas.height, 'black')

    //snake
    // draw(x,y, snakeW,snakeL, 'blue');
    drawSnake();

    
    //apple
    draw(appleX, appleY, 11,11,'red')
    collisionDetection();
    

    // if(upArrow) {a
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