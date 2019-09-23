var snake = null;
var foodSpawner = null;
function setup() {
  document.onkeydown = keyPressed;
  var c = document.getElementById("snakeCanvas");
  snake = new Snake(20, c.width, c.height);
  foodSpawner = new FoodSpawner(c.width, c.height);
  foodSpawner.spawn();
  run();
}

function run() {
  setTimeout(function onTick() {
    snake.move();
    draw(snake);
    run();
  }, 100);
}

function keyPressed(e) {
  e = e || window.event;
  if (e.keyCode == '38') {
    // up arrow
    snake.xDirSpeed = 0;
    snake.yDirSpeed = -1;
  }
  else if (e.keyCode == '40') {
    // down arrow
    snake.xDirSpeed = 0;
    snake.yDirSpeed = 1;
  }
  else if (e.keyCode == '37') {
    // left arrow
    snake.xDirSpeed = -1;
    snake.yDirSpeed = 0;
  }
  else if (e.keyCode == '39') {
    // right arrow
    snake.xDirSpeed = 1;
    snake.yDirSpeed = 0;
  }
}

function draw(snake) {
  var c = document.getElementById("snakeCanvas");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.fillStyle = "lightgreen";
  ctx.strokestyle = 'darkgreen';
  ctx.clearRect(0, 0, c.width, c.height);
  snake.tail.forEach(element => {
    ctx.fillRect(element.xCoo, element.yCoo, snake.scale, snake.scale);
  });
}
