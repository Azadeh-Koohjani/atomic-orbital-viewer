import { CrudeRegion } from "./components/component";

export type Orbital = {
    title: string,
    maximumZ: number;
    maximumXY: number;
    probability: (x: number, y: number, z: number) => number,
    _regions: CrudeRegion[];
    regions: OrbitalRegion[];
};

export type OrbitalRegion = {
    coordinates?: { z: number; points: [number, number][] }[];
    xzCoordinates?: {
        pointsSide1: [number, number][];
        pointsSide2: [number, number][];
        minZ: number;
        maxZ: number;
    };
    isConvex: boolean;
    color: string;
    closed: boolean;
};