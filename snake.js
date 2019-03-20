//Snake game app

var canvas;
var context;

var snakeL = 20
var snakeW = 10
var x = 200
var y = 100
var yspeed = 5

// var canvas = document.getElementById('snakeGame');
// var context = canvas.getContext('2d');


window.onload = function (){
    canvas = document.getElementById('snakeGame');
    context = canvas.getContext('2d');
    canvas.setAttribute('tabindex', 0);
    var fps = 60;
    setInterval(function() {
        drawAll();
        // move();
    }
        ,1000/fps);

    canvas.addEventListener('keydown', function(ev) {
        var keyReturn = moveSnake(ev);
        console.log(keyReturn);
    });
        
 

}


function moveSnake(ev){
    canvas.getBoundingClientRect();
    document.documentElement;
    var code = ev.keyCode;
    return{code};
    
}


function drawAll () {
    //canvas
    draw(0,0,800,600, 'black');

    //snake
    draw(x,y, snakeW,snakeL, 'blue');

    //apple
    draw(300,300,10,10, 'red');

    function draw(leftX, topY, width, height, drawColor) {
        context.fillStyle = drawColor;
        context.fillRect(leftX, topY, width, height);
    }


  
}

// function move(){
//     y += yspeed;
//     if(y > canvas.height) {
//     yspeed = -yspeed;
//     }

//         if(y < 0) {
//         yspeed = -yspeed;
//         }
// }