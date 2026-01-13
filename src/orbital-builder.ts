import * as THREE from 'three';
import { orbitals } from './data/orbital-data';
import { ConvexGeometry } from 'three/addons/geometries/ConvexGeometry.js';
import { LoopSubdivision } from 'three-subdivide';
import { Orbital } from './types';


class OrbitalBuilder
{
    current: Orbital;
    all: Orbital[];
    constructor(selectedIndex: number)
    {
        this.all = orbitals;
        this.current = orbitals[selectedIndex];
        this.current.regions = [];
        this.current._regions.forEach(region => {
            if (region.mirrorRegionInx !== undefined) {
                let mirror = this.current._regions[region.mirrorRegionInx];
                region.closed = mirror.closed;
                region.xzCoordinates = [...mirror.xzCoordinates!].map(p => ([p[0], -p[1]]));
                region.xzCoordinates.reverse();
            }

            if (region.isConvex)
                this.current.regions.push({ coordinates: region.coordinates, isConvex: region.isConvex, color: region.color, closed: true });
            else {
                let coordinates = [...region.xzCoordinates!], pointsSide1: [number, number][], pointsSide2: [number, number][];
                let minZ = Math.min(...coordinates.map(c => c[1])), maxZ = Math.max(...coordinates.map(c => c[1]));
                if(region.closed) {
                    coordinates.pop();
                    let indexMinZ = coordinates.findIndex(c => c[1] === minZ), indexMaxZ = coordinates.findIndex(c => c[1] === maxZ);
                    pointsSide1 = coordinates.slice(indexMinZ, indexMaxZ + 1);
                    pointsSide2 = [...coordinates.slice(indexMaxZ, coordinates.length), ...coordinates.slice(0, indexMinZ + 1)];
                    pointsSide2.reverse();
                }
                else pointsSide1 = coordinates;
                let {isConvex, color, closed } = region;
                this.current.regions.push({ xzCoordinates: { pointsSide1, pointsSide2, minZ, maxZ }, isConvex, color, closed });
            }
        });
    }

    createOrbital() {
        let regions = this.current._regions;
        let meshes: THREE.Mesh[] = [], geometry;
        regions.forEach(region => {
            let points: (THREE.Vector2 | THREE.Vector3)[] = [];

            if (region.isConvex) {
                let coordinates = region.coordinates!;
                coordinates.forEach(coordinate => {
                    let z = coordinate.z, cPoints = coordinate.points;
                    for (var i = 0; i < cPoints.length; i++) {
                        points.push(new THREE.Vector3(cPoints[i][0], cPoints[i][1], z));
                    }

                });
                geometry = new ConvexGeometry(points as THREE.Vector3[]);
                geometry = LoopSubdivision.modify(geometry, 2);
            }
            else { // region.isConvex is false
                if (region.xzCoordinates) region.xzCoordinates.forEach(c => points.push(new THREE.Vector2(c[0], c[1])));
                geometry = new THREE.LatheGeometry(points as THREE.Vector2[], 50);
            }
            var material = new THREE.MeshLambertMaterial({
                color: region.color,
                opacity: 0.7,
                side: THREE.DoubleSide,
                transparent: true
            });
            var mesh = new THREE.Mesh(geometry, material);
            if (!region.isConvex)
                mesh.rotation.x = Math.PI / 2;
            meshes.push(mesh);
        });
        return { meshes };
    }
}
export default OrbitalBuilder