import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

function createOrbitControls(camera, canvas) {
    const controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;

    //*** Limiting Zoom ***//
    // controls.minDistance = 5;
    // controls.maxDistance = 25;

    //*** You can optionally listen for key events and use the arrow keys to pan the camera ***//
    // controls.enablePan = true;
    // controls.listenToKeyEvents(window);

    controls.tick = () => controls.update();
    return controls;
}

export { createOrbitControls };