import * as THREE from 'three';
import { Orbital } from '../types';
import Util from './util';
import { Probability } from './probability';
import { Panel } from './panel';

class Intersection extends Panel {
    plane: THREE.Mesh | null;
    probability: Probability;
    padding = 5;
    intersections: { color: string, points?: [number, number][], radius?: number } [] = []
    constructor(public orbital: Orbital) {
        super(false, 300, 300);
        this.probability = new Probability(orbital);
        
        const panel = document.getElementById("intersection")!;
        const header = panel.querySelector(".panel-header")! as HTMLElement;
        this.createPlane();
        this.draggable(panel);
        this.createContent(panel);
        this.collapsible(header);
        if(!this.collapsed) this.onOpen();
    }

    orbitalChanged(orbital: Orbital) {
        this.orbital = orbital;
        this.probability.orbital = orbital;
        this.createPlane();
    }

    createContent(elem: HTMLElement) {
        let svg = elem.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'svg')[0];
        Util.createAxis(svg, this.contentHeight, this.contentWidth, this.padding, 'orange', 'chartreuse', true);
        this.createCrossLine(svg);
    }

    createCrossLine(svg: SVGElement) {
        let height = (this.contentHeight - 2 * this.padding) / 2 + this.padding, width = this.contentWidth - 2 * this.padding - 26;
        var icon = svg.querySelector('#move-icon')! as SVGGElement;
        this.setProbabilityY(height);
        var crossLine = Util.createLine(svg, this.padding, height, width, height, 'darkgray', 'cross-line', 1.5);
        icon.setAttribute('transform', `translate(${width},${height - 11.5})`);
        crossLine.after(icon);
        let originY = 0;
        icon.onmousedown = (event: MouseEvent) => crossLine_md(event);

        const crossLine_md = (e: MouseEvent) => {
            originY = e.clientY;
            svg.onmousemove = (event: MouseEvent) => crossLine_mm(event);
            icon.onmouseup = () => crossLine_mu();
            e.stopPropagation();
        }

        const crossLine_mm = (e: MouseEvent) => {
            if (e.buttons !== 1) return crossLine_mu();
            height += e.clientY - originY;
            if(height > this.padding && height < this.contentHeight - this.padding) {
                Util.moveLine(crossLine, 5, height, width, height);
                icon.setAttribute('transform', `translate(${width},${height - 11.5})`);
                this.setProbabilityY(height);
                this.updateProbability();
            }
            originY = e.clientY;
        }

        const crossLine_mu = () => {
            svg.onmousemove = null;
            icon.onmouseup = null;
        }
    }

    setProbabilityY(height: number) {
        let y = this.orbital.maximumXY * (this.contentHeight / 2 - height) / (this.contentHeight / 2 - this.padding);
        this.probability.setY(y);
    }

    updateProbability() {
        let regionLimits: { x: number, color: string }[] = []
        this.intersections.forEach(item => {
            if(item.radius) {
                if(item.radius >= Math.abs(this.probability.y)) {
                    let x = Math.sqrt(item.radius**2 - this.probability.y**2) / this.orbital.maximumXY;
                    regionLimits.push({ x, color: item.color });
                }
            }
        });
        this.probability.update(regionLimits);
    }

    update(z: number) {
        this.plane!.position.set(0, 0, z);
        this.intersections = [];
        let svg = document.querySelector('#intersection svg') as SVGSVGElement;
        let paths = [...document.getElementsByClassName("cross-section")];
        paths.forEach(path => svg.removeChild(path));
        this.orbital.regions.forEach(region => {
            if (region.isConvex) {
                let points: [number, number][] = [];
                points = [];
                let coordinates = region.coordinates!;
                for (var i = 0; i < coordinates.length; i++) {
                    points = coordinates[i].points;
                    if (coordinates[i].z >= z)
                        break;
                }
                this.createCrossSection(points, svg, region.color);  
            }
            else {
                let coordinates = region.xzCoordinates!;
                const addCircle = points => {
                    let circle = this.getCircle(points, z)
                    this.intersections.push({color: region.color, radius: circle.radius});
                    this.createCrossSection(circle.points, svg, region.color);
                }
                if(z >= coordinates.minZ && z <= coordinates.maxZ){
                    addCircle(coordinates.pointsSide1);
                    if(region.closed) addCircle(coordinates.pointsSide2);
                } 
            }         
        });
        this.probability.setZ(z);
        this.updateProbability();
    }

    getCircle(points: [number, number][], z: number) {
        let n = 100;
        let cilclePoints: [number, number][] = [];
        let index = points.findIndex(m => m[1] >= z);
        let p1 = points[index];
        let x = p1[0];
        if(index > 0) {
            let p0 = points[index - 1];
            x = p0[0] + (p1[0] - p0[0]) * (z - p0[1]) / (p1[1] - p0[1])
        }
        for (var j = 0; j <= n; j++) {
            cilclePoints.push([x * Math.cos(j * 2 * Math.PI / n), x * Math.sin(j * 2 * Math.PI / n)]);
        }
        return { points: cilclePoints, radius: x };
    }

    createCrossSection(points: [number, number][], svg: SVGSVGElement, color: string) {
        let pathD = "M", counter = 0, origin = { x: this.contentWidth / 2, y: this.contentHeight / 2 };
        points.forEach(point => {
            counter++;
            let x = origin.x + point[0] * (this.contentWidth - this.padding) / 2 / this.orbital.maximumXY, 
                y = origin.y - point[1] * (this.contentHeight - this.padding) / 2 / this.orbital.maximumXY;
            if (counter == points.length)
                pathD += x + "," + y + "Z";
            else
                pathD += x + "," + y + "L";
        });
        svg.appendChild(Util.createPath(pathD, color, 'cross-section'));
    }

    createPlane() {
        let points: THREE.Vector2[] = [];
        let max = this.orbital.maximumXY;
        const coordinates = [[max, max], [-max, max], [-max, -max], [max, -max]];
        function addPoints(point: number[]) {
            points.push(new THREE.Vector2(point[0], point[1]));
        }
    
        for (let i = 0; i < coordinates.length; i++) {
            addPoints(coordinates[i]);
        }
    
        const polygon = new THREE.Shape(points);
        const geometry = new THREE.ShapeGeometry(polygon);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide, transparent: true, opacity: .2 });
        this.plane = new THREE.Mesh(geometry, material);
    }
    
    public onOpen()
    {
        const panel = document.getElementById("intersection")!;
        const top = parseFloat(panel.style.top), left = parseFloat(panel.style.left);
        if(top < this.contentHeight && left < this.contentWidth) this.probability.moveDown(this.contentHeight + top, this.contentWidth + left);
    }
}

export default Intersection