import React, { useEffect, useRef } from 'react';
import * as THREE from "three";

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

import createAsteroids from '../helpers/create_asteroids';
import createSpotlights from '../helpers/create_spotlights';

const Renderer = () => {
    const renderingEl = useRef(null);

    useEffect(() => {
        // RENDERER
        const renderer = new THREE.WebGLRenderer({
            alpha: false,
        });
        renderer.setClearColor("#121212", 1);

        renderingEl.current.appendChild(renderer.domElement);
        const SCREEN_WIDTH = window.innerWidth;
        const SCREEN_HEIGHT = window.innerHeight;

        // CAMERA
        const camera = new THREE.PerspectiveCamera(100, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 1000);
        camera.position.set(30, 5, 35);

        // ORBIT CONTROLS
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.target.set(0, 5, 0);

        // SCENE
        const scene = new THREE.Scene();

        // TEXTURES
        const loader = new THREE.TextureLoader();
        const earthTexture = loader.load('/assets/earth.jpg');
        const asteroidTexture = loader.load('/assets/asteroid.jpg');

        console.log(earthTexture, asteroidTexture)

        // // MATERIALS

        const earthMaterial = new THREE.MeshStandardMaterial({ map: earthTexture });
        const material = new THREE.PointsMaterial({
            color: 0x555555
        });

        // GEOMETRY
        const geometry = new THREE.Geometry();

        let x, y, z;
        for (let i = 0; i < 2000; i++) {
            x = (Math.random() * SCREEN_WIDTH * 2) - SCREEN_WIDTH;
            y = (Math.random() * SCREEN_HEIGHT * 2) - SCREEN_HEIGHT;
            z = (Math.random() * 3000) - 1500;

            geometry.vertices.push(new THREE.Vector3(x, y, z));
        };


        createAsteroids(scene, asteroidTexture);

        const earthGeometry = new THREE.SphereGeometry(1, 32, 16);
        const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
        earthMesh.position.set(0, 0, 0);
        earthMesh.scale.setScalar(15);
        scene.add(earthMesh);

        //LIGHTING
        const pointCloud = new THREE.PointCloud(geometry, material);
        scene.add(pointCloud);
        const light = new THREE.PointLight("white", 1.25);
        light.position.set(0, 0, 0);
        scene.add(light);

        // illuminate the earth
        createSpotlights(scene);

        const animate = () => {
            requestAnimationFrame(animate);
            earthMesh.rotation.y += 0.15;
            controls.update();
            renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
            renderer.render(scene, camera);
        }

        animate()

    }, [createAsteroids]);

    return (
        <div ref={renderingEl} ></div>
    )
}

export default Renderer;