import { IMemoryDb } from 'pg-mem';

export const tablaUsuarios = {
    crearTablaUsuarios: (dbmem: IMemoryDb) => {
        dbmem.public.none(`CREATE TABLE usuarios (
                id SERIAL PRIMARY KEY,
                usuario TEXT NOT NULL,
                clave TEXT NOT NULL
            )`);
    },
}
