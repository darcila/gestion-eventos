import dotenv from 'dotenv';
dotenv.config();
import { IMain, IDatabase } from 'pg-promise';
import pgPromise from 'pg-promise';
import { NODE_ENV } from '@util';
import { CONNECTION_PARAMETERS_EVENTOS } from './config';
import {IDataBase, IEnvironments} from "@infrastructure/repositories/postgres/model";
import {IConnectionParameters} from "pg-promise/typescript/pg-subset";

const getConnectionParametersAGW = (db: string): IConnectionParameters => {
    const DATABASES: IEnvironments<IConnectionParameters> = {
        development: {},
        testing: {},
        production: {},
    };
    const DATABASE = DATABASES[NODE_ENV] || DATABASES.development;
    const CONEXION: IDataBase<IConnectionParameters> = {
        cloudDb: { ...CONNECTION_PARAMETERS_EVENTOS, ...DATABASE },
    };
    //console.log('db coneccion', CONEXION);
    return CONEXION[db];
};

const pgpCloud: IMain = pgPromise({ schema: 'public' });
export const dbEventos = pgpCloud(getConnectionParametersAGW('cloudDb')) as IDatabase<IMain>;
