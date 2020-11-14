import createRock from "./create_rock";
import { randomFloat } from './calc';

const createAsteroids = (scene, asteroidTexture, asteroids, renderer, camera) => {
  var maxWidth = 30;

  if (asteroids !== {}) {
    for (const obj in asteroids) {
      asteroids[obj].forEach((asteroid) => {
        const { estimated_diameter: { kilometers: { estimated_diameter_min, estimated_diameter_max} }} = asteroid;
        const min_radius = (estimated_diameter_min * 70) / 2;
        const max_radius = (estimated_diameter_max * 70) / 2;
        const size = randomFloat(min_radius, max_radius);
        createRock(size, 500, maxWidth, 200, 600, scene, asteroidTexture, asteroid, renderer, camera);
      })
      
    }
  }
  // for (var i = 0; i < 30; i++) {
  //   createRock(5 + Math.random() * 10, 500, maxWidth, 200, 600, scene, asteroidTexture);
  // }
  // for (var i = 0; i < 7; i++) {
  //   asteroids.push(createRock(5 + Math.random() * 50, 200, maxWidth, 300, 400, scene, asteroidTexture));
  // }
  
  // for (var i = 0; i < 160; i++) {
  //   createRock(2 + Math.random() * 5, 1000, maxWidth, 150, 800, scene, asteroidTexture);
  // }
}

export default createAsteroids;