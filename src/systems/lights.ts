import * as THREE from 'three';

function createLights() {
    // const ambientLight = new THREE.AmbientLight(0xcccccc, 0.4);
    const ambientLight = new THREE.HemisphereLight(
        'white', // bright sky color
        'darkslategrey', // dim ground color
        5, // intensity
    );
    // const mainLight = new THREE.DirectionalLight('white', 0.8);
    const mainLight = new THREE.PointLight(0xffffff, 0.8);
    mainLight.position.set(0, 0, 0);
    return { ambientLight, mainLight };
}

export { createLights };