
import * as THREE from 'three';
import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/resizer';
import { createOrbitControls } from './systems/orbit-controls';
import { createCamera } from './systems/camera';
import { createScene } from './systems/scene';
import { createLights } from './systems/lights';
import { createAxis } from './systems/axis';
import OrbitalBuilder from './orbital-builder';
import { createSetting } from './components/settings';
import Intersection from "./components/intersection";
import { PerspectiveCamera, Scene, WebGLRenderer } from 'three';
import { Orbital } from './types';
import { Loop } from './systems/loop';

class OrbitalViewer {
    camera: PerspectiveCamera;
    scene: Scene;
    renderer: WebGLRenderer;
    loop: Loop;
    orbitalInx: number = 0;
    orbitalBuilder: OrbitalBuilder;
    orbital: Orbital;
    intersection: Intersection;
    meshes: THREE.Mesh[];

    constructor(container: HTMLElement) {
        this.camera = createCamera();
        this.scene = createScene();
        this.renderer = createRenderer();
        this.loop = new Loop(this.camera, this.scene, this.renderer);
        this.orbitalBuilder = new OrbitalBuilder(this.orbitalInx);
        this.intersection = new Intersection(this.orbitalBuilder.current);
        container.append(this.renderer.domElement);
        let axis = createAxis();
        const orbitControls = createOrbitControls(this.camera, this.renderer.domElement);
        this.loop.updatables.push(orbitControls);
        const { ambientLight, mainLight } = createLights();
        this.scene.add(axis, ambientLight, mainLight);
        orbitControls.addEventListener('change', () => { this.render(); });
        new Resizer(container, this.camera, this.renderer);
        this.init();    
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    start() {
        this.loop.start();
    }

    stop() {
        this.loop.stop();
    }

    init() {
        this.meshes = this.orbitalBuilder.createOrbital().meshes;
        let intersectorZ = this.orbitalBuilder.current.maximumZ / 4;
        this.meshes.forEach(mesh => this.scene.add(mesh));
        let titles = this.orbitalBuilder.all.map(x => x.title);
        let settings = {
            intersector:{
                min: -this.orbitalBuilder.current.maximumZ,
                max: +this.orbitalBuilder.current.maximumZ,
                event: (val: number) => this.changeIntersector(val)
            },
            orbital:{
                data: titles,
                current: titles[this.orbitalInx],
                intersector: intersectorZ,
                event: (title: string) => this.changeOrbital(title)
            }
        };
        createSetting(settings);
        this.intersection.update(intersectorZ);
        this.scene.add(this.intersection.plane);
    }

    clear(){
        this.scene.remove(this.intersection.plane);
        this.meshes?.forEach(mesh => this.scene.remove(mesh));
    }

    changeIntersector(value: number) {
        this.intersection.update(value);
    }

    changeOrbital(title: string) {
        this.clear();
        this.orbitalInx = this.orbitalBuilder.all.findIndex(x => x.title == title);
        this.orbitalBuilder = new OrbitalBuilder(this.orbitalInx);
        this.intersection.orbitalChanged(this.orbitalBuilder.current);
        this.init();
    }
}

export default OrbitalViewer;