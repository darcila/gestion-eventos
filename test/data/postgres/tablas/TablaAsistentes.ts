import { IMemoryDb } from 'pg-mem';

export const tablaAsistentes = {
    crearTablaAsistentes: (dbmem: IMemoryDb) => {
        dbmem.public.none(`CREATE TABLE asistente (
                id SERIAL PRIMARY KEY,
                identificacion TEXT NOT NULL,
                nombre TEXT NOT NULL,
                direccion TEXT NOT NULL,
                telefono TEXT NOT NULL,
                correo TEXT NOT NULL,
                ciudad TEXT NOT NULL,
                ubicacion POINT,
                categorias TEXT,
                creado timestamp default current_timestamp,
                actualizado timestamp,
                eliminado timestamp
            )`);
    },
}
