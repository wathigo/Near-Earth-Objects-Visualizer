import * as THREE from "three";
import ColorLuminance from "./color_luminance"

const TOOL_TIP_ENABLED_OBECTS = [];

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let latestMouseProjection;
let hoveredObj;
let tooltipDisplayTimeout;
let renderer;
let camera;

const showTooltip = () => {
  const divElement = document.querySelector("#tooltip");

  if (divElement && latestMouseProjection) {
    divElement.style.display = "block";
    divElement.style.opacity = 0.0;

    const canvasHalfWidth = renderer.domElement.offsetWidth / 2;
    const canvasHalfHeight = renderer.domElement.offsetHeight / 2;

    const tooltipPosition = latestMouseProjection.clone().project(camera);
    tooltipPosition.x = (tooltipPosition.x * canvasHalfWidth) + canvasHalfWidth + renderer.domElement.offsetLeft;
    tooltipPosition.y = -(tooltipPosition.y * canvasHalfHeight) + canvasHalfHeight + renderer.domElement.offsetTop;

    const tootipWidth = divElement.offsetWidth;
    const tootipHeight = divElement.offsetHeight;
    console.log(tootipWidth, tootipHeight);

    divElement.style.left = `${tooltipPosition.x - tootipWidth / 2}px`;
    divElement.style.top = `${tooltipPosition.y - tootipHeight - 5}px`

    console.log(divElement)
    divElement.textContent = hoveredObj.userData.tooltipText;

    setTimeout(function () {
      divElement.style.opacity = 1.0;
    }, 25);
  }
}

const hideTooltip = () => {
  const divElement = document.querySelector("#tooltip");
  if (divElement) {
    divElement.style.display = "none";
  }
}

const updateMouseCoords = (event, coordsObj) => {
  coordsObj.x = ((event.clientX - renderer.domElement.offsetLeft + 0.5) / window.innerWidth) * 2 - 1;
  coordsObj.y = -((event.clientY - renderer.domElement.offsetTop + 0.5) / window.innerHeight) * 2 + 1;
}

const handleManipulationUpdate = () => {
  raycaster.setFromCamera(mouse, camera); {
    var intersects = raycaster.intersectObjects(TOOL_TIP_ENABLED_OBECTS);
    if (intersects.length > 0) {
      latestMouseProjection = intersects[0].point;
      hoveredObj = intersects[0].object;
    }
  }

  if (tooltipDisplayTimeout || !latestMouseProjection) {
    clearTimeout(tooltipDisplayTimeout);
    tooltipDisplayTimeout = undefined;
    hideTooltip();
  }

  if (!tooltipDisplayTimeout && latestMouseProjection) {
    tooltipDisplayTimeout = setTimeout(function () {
      tooltipDisplayTimeout = undefined;
      showTooltip();
    }, 330);
  }
}

const onMouseMove = (event) => {
  updateMouseCoords(event, mouse);

    latestMouseProjection = undefined;
    hoveredObj = undefined;
    handleManipulationUpdate();
}

const createRock = (size, spreadX, maxWidth, maxHeight, maxDepth, scene, asteroidTexture, asteroid, render, cam) => {
  const { lunar } = asteroid.close_approach_data[0].miss_distance
  renderer = render;
  camera = cam;
  const geometry = new THREE.DodecahedronGeometry(size, 1);
  geometry.vertices.forEach(function (v) {
    v.x += (0 - Math.random() * (size / 4));
    v.y += (0 - Math.random() * (size / 4));
    v.z += (0 - Math.random() * (size / 4));
  })
  let color = '#111111';
  color = ColorLuminance(color, 2 + Math.random() * 10);
  // console.log(color);
  const texture = new THREE.MeshStandardMaterial({
    map: asteroidTexture,
    // flatShading: THREE.FlatShading,
    // shininess: 0.5,
    roughness: 0.8,
    metalness: 1
  });

  const cube = new THREE.Mesh(geometry, texture);
  const randomPos = [1, -1]
  const pos = randomPos[Math.floor(Math.random() * randomPos.length)];
  const x = lunar * pos;
  const centeredness = 1 - (Math.abs(x) / (maxWidth / 2));
  const z = (maxDepth / 2 - Math.random() * maxDepth) * centeredness
  const y = lunar * pos;
  cube.position.set(x, y, z)
  console.log(JSON.stringify())
  cube.userData.tooltipText = JSON.stringify(asteroid);
  TOOL_TIP_ENABLED_OBECTS.push(cube)
  scene.add(cube);
  window.addEventListener('mousemove', onMouseMove, false);
}

export default createRock;