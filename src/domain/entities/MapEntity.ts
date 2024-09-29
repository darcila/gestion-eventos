export interface Geometry {
    type: string;
    coordinates: number[];
}
export interface Feature {
    geometry: Geometry;
}

export interface ResultMap {
    type: string;
    features: Feature[];
}
