import { Color, Scene } from 'three';

function createScene() {
    const scene = new Scene();
    scene.background = new Color('#383839');
    return scene;
}

export { createScene };