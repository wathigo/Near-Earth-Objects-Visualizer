import { SpotLight } from "three";

const createSpotlights = scene => {
    const color = 0xFFFFFF;
    const intensity = 5;
    const distance = 25;
    const angle = Math.PI / 2;
  
    new Array(6).fill('').forEach((item, i) => {
      const spotlight = new SpotLight(color, intensity, distance, angle);
      const value = i % 2 === 0 ? 25 : -25;
  
      spotlight.position.set(
        i < 2 ? value : 0,
        i >= 2 && i < 4 ? value : 0,
        i >= 4 ? value : 0
      );
      scene.add(spotlight);
    });
  }

  export default createSpotlights;