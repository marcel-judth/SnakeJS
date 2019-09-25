var snake = null;
var foodSpawner = null;
var scale = 20;
var score = 0;
var scoreData = null;

function setup() {
  scoreData = [new Scorer("Judth", 500), new Scorer("Franz", 700), new Scorer("Chef", 1200)];
  fillScoreTable();
  document.onkeydown = keyPressed;
  var c = document.getElementById("snakeCanvas");
  snake = new Snake(scale, c.width, c.height);
  foodSpawner = new FoodSpawner(c.width, c.height, scale);
  foodSpawner.spawn();
  run();
}

function saveScore() {
  var name = document.getElementById("scorerName").value;
  scoreData.push(new Scorer(name, score));
  fillScoreTable();
  $('#gameOverModal').modal('hide');
}

function run() {
  setTimeout(function onTick() {
    try {
      snake.move();
      if (snake.isOnFood(foodSpawner.currentFoodLoc)) {
        snake.grow();
        foodSpawner.spawn();
        score += 100;
      }
      draw();
      run();
    } catch (error) {
      if (error.name == "GameOver") {
        $('#gameOverModal').modal({
          keyboard: false
        });
        $('#gameOverModal').modal('toggle');
        $('#gameOverModal').modal('show');
      } else {
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
  document.getElementById("score").innerHTML = "Current score: " + score + " Points";
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

function fillScoreTable() {
  tableBody = document.getElementById("scoreTableBody");
  tableBody.innerHTML = "";
  scoreData.forEach((item, index) => {
    var tr = document.createElement('TR');
    var th = document.createElement('TH');
    th.appendChild(document.createTextNode(index + 1));
    var nameTD = document.createElement('TD');
    nameTD.appendChild(document.createTextNode(item.name));
    var scoreTD = document.createElement('TD');
    scoreTD.appendChild(document.createTextNode(item.score));
    tr.appendChild(th);
    tr.appendChild(nameTD);
    tr.appendChild(scoreTD);
    tableBody.appendChild(tr);
  });
}