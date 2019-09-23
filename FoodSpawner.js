function FoodSpawner(windowWidth, windowHeight, scale) {
    this.windowWidth = windowWidth;
    this.windowHeight = windowHeight;
    this.scale = scale;
    this.currentFoodLoc = null;

    this.spawn = function () {
        this.currentFoodLoc = new Point(randomIntFromInterval(1, windowWidth / scale) * scale, 
        randomIntFromInterval(1, windowHeight / scale) * scale);
    }

    function randomIntFromInterval(min, max) { // min and max included 
        return Math.floor((Math.random() * (max - min + 1) + min));
    }
}