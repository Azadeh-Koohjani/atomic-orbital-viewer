import * as THREE from 'three';

function createCamera() {
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.set(6, 6, 6);
    camera.up.set(0,0,1);    
    return camera;
}

export { createCamera };