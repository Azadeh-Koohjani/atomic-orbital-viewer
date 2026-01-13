export type CrudeRegion = {
    color: string;
    isConvex: boolean;
    closed?: boolean;
    coordinates?: { z: number; points: [number, number][] }[];
    xzCoordinates?: [number, number][];
    mirrorRegionInx?: number;
};