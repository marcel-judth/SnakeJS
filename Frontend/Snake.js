function Snake(scale, windowWidth, windowHeight) {
  this.tail = [new Point(80, 0), new Point(60, 0), new Point(40, 0), new Point(20, 0), new Point(0, 0)];
  this.xDirSpeed = 1;
  this.yDirSpeed = 0;
  this.scale = scale;
  this.windowWidth = windowWidth;
  this.windowHeight = windowHeight;

  this.move = function () {
    this.moveToDirection();
    this.tail.pop();
  }

  this.isOnFood = function (foodLocation) {
    return (foodLocation.xCoo == this.tail[0].xCoo && foodLocation.yCoo == this.tail[0].yCoo);
  }

  this.grow = function () {
    this.moveToDirection();
  }

  //private methods
  this.didCollide = function () {
    var head = this.tail[0];
    for (i = 1; i < this.tail.length; i++)
      if (this.tail[i].xCoo == head.xCoo && this.tail[i].yCoo == head.yCoo)
        return true;
    return false;
  }

  this.moveToDirection = function () {
    newX = this.tail[0].xCoo + this.xDirSpeed * this.scale;
    newY = this.tail[0].yCoo + this.yDirSpeed * this.scale;
    if (newX > this.windowWidth - this.scale) newX = 0;
    if (newY > this.windowHeight - this.scale) newY = 0;
    if (newX < 0) newX = this.windowWidth - this.scale;
    if (newY < 0) newY = this.windowHeight - this.scale;
    this.tail.unshift(new Point(newX, newY));
    if (this.didCollide()) throw new GameOver("Game Over!");
  }
}
