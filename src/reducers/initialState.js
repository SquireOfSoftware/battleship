const initialState = {
  ships: [],
  boardSize: {
    x: 25,
    y: 10
  },
  obstacleIntensity: 0.3,
  obstacles: []
}
initialState.obstacles = generateObstacleMap()

function generateObstacleMap() {
  let obstacleIntensity = initialState.obstacleIntensity;
  let obstacles = [];
  for (let x = 0; x < initialState.boardSize.x; x++) {
    for (let y = 0; y < initialState.boardSize.y; y++) {
      let value = Math.random();
      if (value < obstacleIntensity) {
        let obstacle = {
          x,
          y
        };
        obstacles.push(obstacle)
      }
    }
  }
  return obstacles;
}

export default initialState