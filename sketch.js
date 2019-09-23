var snake = null;
var foodSpawner = null;
var scale = 20;
var score = 0;

function setup() {
  document.onkeydown = keyPressed;
  var c = document.getElementById("snakeCanvas");
  snake = new Snake(scale, c.width, c.height);
  foodSpawner = new FoodSpawner(c.width, c.height, scale);
  foodSpawner.spawn();
  run();
}

function run() {
  setTimeout(function onTick() {
    try{
      snake.move();
      if (snake.isOnFood(foodSpawner.currentFoodLoc)){
        snake.grow();
        foodSpawner.spawn();
        score += 100;
      }
      draw();
      run();
    }catch(error){
      if(error.name == "GameOver"){
        alert("Game Over! Your score: " + score);
      }else{
        alert(error);
      }
    }
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


function draw() {
  document.getElementById("score").innerHTML = score;
  var c = document.getElementById("snakeCanvas");
  var ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.clearRect(0, 0, c.width, c.height);
  ctx.fillStyle = "red";
  ctx.fillRect(foodSpawner.currentFoodLoc.xCoo, foodSpawner.currentFoodLoc.yCoo, this.snake.scale, this.snake.scale);
  ctx.fillStyle = "lightgreen";
  ctx.strokestyle = 'darkgreen';
  this.snake.tail.forEach(element => {
    ctx.fillRect(element.xCoo, element.yCoo, this.snake.scale, this.snake.scale);
  });
}
