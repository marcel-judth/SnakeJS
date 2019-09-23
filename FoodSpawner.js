function FoodSpawner(windowWidth, windowHeight) {
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;

    this.spawn = function () {
        return new Point(randomIntFromInterval(1, windowWidth), randomIntFromInterval(1, windowHeight));
    }

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}