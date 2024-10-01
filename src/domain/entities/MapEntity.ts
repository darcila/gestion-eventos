export interface Geometry {
    type: string;
    coordinates: number[];
}

export interface Properties {
    full_address: string;
    name: string;
}

export interface Feature {
    geometry: Geometry;
    properties: Properties;
}

export interface ResultMap {
    type: string;
    features: Feature[];
}

export interface Ubicacion {
    x: number;
    y: number;
}
