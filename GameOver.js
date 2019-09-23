class GameOver extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "GameOver"; // (2)
  }
}