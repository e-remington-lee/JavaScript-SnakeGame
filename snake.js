//Snake game app
var canvas = document.getElementById('snakeGame');
var context = canvas.getContext('2d')
var snakeL = 10
var snakeW = 20


//canvas
draw(0,0,800,600, 'black');

//snake
draw(100,200, 10,15, 'blue');

//apple
draw(300,300,10,10, 'red');

function draw(leftX, topY, width, height, drawColor) {
    context.fillStyle = drawColor;
    context.fillRect(leftX, topY, width, height);
}