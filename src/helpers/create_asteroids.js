import createRock from "./create_rock";

const createAsteroids = (scene, asteroidTexture) => {
    const maxWidth = 1000;
    const maxHeight = 200;
    const maxDepth = 200;
    const asteroids = [];
    for (let i = 0; i < 7; i++) {
      asteroids.push(createRock(5 + Math.random() * 50, 200, maxWidth, 300, 400, scene, asteroidTexture));
    }
    for (let i = 0; i < 30; i++) {
      asteroids.push(createRock(5 + Math.random() * 10, 500, maxWidth, 200, 600, scene, asteroidTexture));
    }
    for (let i = 0; i < 160; i++) {
      asteroids.push(createRock(2 + Math.random() * 5, 1000, maxWidth, 150, 800, scene, asteroidTexture));
    }
    return asteroids;
  }

  export default createAsteroids;