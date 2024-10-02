import {IConnectionParameters} from "pg-promise/typescript/pg-subset";
import {POSTGRES_DATABASE, POSTGRES_PASSWORD, POSTGRES_PORT, POSTGRES_USER} from "@util";

export const PG_CONECTION: IConnectionParameters = {
    port: 5432,
    max: 30,
    idleTimeoutMillis: 3000,
    query_timeout: 15000,
};

export const CONNECTION_PARAMETERS_EVENTOS: IConnectionParameters = {
    ...PG_CONECTION,
    port: POSTGRES_PORT,
    host: 'postgres',
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE,
};
