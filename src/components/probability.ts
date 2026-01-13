
import { Orbital } from '../types';
import { Panel } from './panel';
import Util from './util';

export class Probability extends Panel {
    y: number = null;
    z: number = null;
    padding = 10;

    constructor(public orbital: Orbital) {
        super(false, 400, 200);
        
        const panel = document.getElementById("probability")!;
        const header = document.querySelector("#probability > .panel-header")! as HTMLElement;
        this.draggable(panel);
        this.createContent(panel);
        this.collapsible(header);
    }
    createContent(elem: HTMLElement) {
        let svg = elem.getElementsByTagNameNS('http://www.w3.org/2000/svg', 'svg')[0];
        Util.createAxis(svg, this.contentHeight, this.contentWidth, this.padding, 'orange', 'darkgray', false);
    }

    setY(y: number) {
        this.y = y;
    }

    setZ(z: number) {
        this.z = z;
    }

    update(regionLimits: { x: number, color: string }[]) {
        let svg = document.querySelector('#probability svg') as SVGElement;
        let elems = svg.querySelectorAll('.distribution');
        elems.forEach(elem => svg.removeChild(elem));
        let n = 100, points: [number, number][] = [], pathD = "M",
            origin = { x: this.padding, y: this.contentHeight - this.padding };
        for (var i = 0; i < n; i++) {
            let x = i * this.orbital.maximumXY / n, distance = i * (this.contentWidth - 2 * this.padding) / n;
            let probability = this.orbital.probability(x, this.y, this.z);
            points.push([origin.x + distance, origin.y - probability * (this.contentHeight - 2 * this.padding)])
        }

        points.forEach(point => pathD += point[0] + "," + point[1] + "L");
        pathD = pathD .substring(0, pathD.length - 1);
        svg.appendChild(Util.createPath(pathD, 'darkgray', 'distribution'));

        regionLimits.forEach(xPoint => {
            let x = xPoint.x * (this.contentWidth - 2 * this.padding)
            let line = Util.createLine(svg, origin.x + x, this.padding, origin.x + x, this.contentHeight - this.padding, xPoint.color, 'distribution');
            line.setAttribute('opacity', '0.4');
        })
    }

    moveDown(height: number, width: number) {
        const panel = document.getElementById("probability")!;
        const top = parseFloat(panel.style.top), left = parseFloat(panel.style.left);
        if(top < height + 40 && left < width) panel.style.top = (height + 40) + "px";
    }
}