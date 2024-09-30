export const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'local';

export const GCP_PROJECT = process.env.GCP_PROJECT;

export const PREFIX = `/${process.env.DOMAIN}/${process.env.SERVICE_NAME}`;

export const HOST = process.env.HOST || 'localhost';

export const API_EXAMPLE = process.env.API_EXAMPLE;

export const KEY_MAPBOX = process.env.KEY_MAPBOX;

export const POSTGRES_HOST = process.env.POSTGRES_HOST || 'localhost';

export const POSTGRES_USER = process.env.POSTGRES_USER || '';

export const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD || '';

export const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT ?? '5432');

export const POSTGRES_DATABASE = process.env.POSTGRES_DATABASE || '';

export const KEY_JWT = process.env.KEY_JWT || '';

