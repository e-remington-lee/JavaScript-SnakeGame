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

//This line was originally used to allow the 'keydown' eventlistener, but it seems to work without it now
canvas.setAttribute('tabindex', 0);



var fps = 60;
setInterval(function() {
drawAll();


},1000/fps);


function collisionDetection(){
    if (startX > appleX-1 && startX <appleX+moveIncrement && startY >appleY-1 && startY <appleY+moveIncrement) {
        multiplyByFive();
        apples+=1;
        snake.push({x:1000, y:1000});
        //intead of this, I might be able to make an if statement for when the snake eats the apple to not have the snake.pop()
        //method occur, but this method works too, but you might be able to tell that the snake does't instantly get bigger

    }

    if (startX > canvas.width-moveIncrement-1 || startX <1 || startY <1 || startY > canvas.height-moveIncrement-1){
        snakeReset();
    }
    
    // if ((snakeHead.filter({x: startX, y: startY} = snake))){
    //     console.log('yes!!')
    // }


}

function snakeReset(){
    startX = 200
    startY = 200
    multiplyByFive();
    alert("You lose!")
 
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
}

var snakeHead =[{x:startX, y: startY}];

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



//     for(var m=1;m<snake.length;m++){
//         for(var n=1; n<snake.length;n++){
//             var cubeX = snake.x
//             var cubeY = snake.y

//             if(startX > cubeX-1 && startX <cubeX+moveIncrement && startY >cubeY-1 && startY <cubeY+moveIncrement){
//                 console.log('True!')
//             }
//         }
//     }
// }

 


function randomizeApple (max,min){
    return Math.floor(Math.random() *(max - min+1)+min);
}

function multiplyByFive (){
    appleX = randomizeApple(78,1)*randomincrement;
    appleY = randomizeApple(58,1)*randomincrement;
    
}
document.addEventListener('keydown', keyDownHandler);


function keyDownHandler(ev){

    var code = ev.keyCode;

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


//         if (code == 38){
//             upArrow = true;
//         }

//         if (upArrow){
//             snake.unshift({x:startX, y:startY-moveIncrement});
//             startY-=moveIncrement;
//             snake.pop();
   
//         }
//         if (code == 39){
//             rightArrow = true;
//             upArrow = false;
//         }

//         if (rightArrow){
//             snake.unshift({x:startX+moveIncrement, y:startY});
//             startX+=moveIncrement;
//             snake.pop();
  

//     }
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
