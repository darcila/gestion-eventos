import { IMemoryDb, newDb } from 'pg-mem';
import {tablaAsistentes, tablaEventos, tablaReservas, tablaUsuarios} from "../tablas";

export const dbEventos = (db?: IMemoryDb) => {
    const dbmem = db ?? newDb();
    tablaReservas.crearTablaReservas(dbmem);
    dbmem.public.none(`INSERT INTO reserva VALUES (4, 1, 1, '2024-02-02', 2, 'CREADA');`);
    dbmem.public.none(`INSERT INTO reserva VALUES (2, 2, 2, '2024-02-02', 1, 'CREADA');`);
    dbmem.public.none(`INSERT INTO reserva VALUES (3, 3, 3, '2024-02-02', 1, 'CREADA');`);

    tablaEventos.crearTablaEventos(dbmem);
    dbmem.public.none(`INSERT INTO evento VALUES (1, 'Evento 1', 'Descripcion Evento 1', 'Bogota', '2024-02-02', '10:00:00', 'Categoria 1', 100, 10000, '(4.60971, -74.08175)', 'CREADO', '2024-02-02', null, null);`);
    dbmem.public.none(`INSERT INTO evento VALUES (2, 'Evento 2', 'Descripcion Evento 2', 'Bogota', '2024-02-02', '10:00:00', 'Categoria 1', 100, 10000, '(4.60971, -74.08175)', 'CREADO', '2024-02-02', null, null);`);
    dbmem.public.none(`INSERT INTO evento VALUES (3, 'Evento 3', 'Descripcion Evento 3', 'Bogota', '2024-02-02', '10:00:00', 'Categoria 1', 100, 10000, '(4.60971, -74.08175)', 'CREADO', '2024-02-02', null, null);`);

    tablaAsistentes.crearTablaAsistentes(dbmem);
    dbmem.public.none(`INSERT INTO asistente VALUES (4, '12345679', 'Asistente 1', 'Direccion 1', '12345678911', 'asistente1@mail.com', 'Bogota', '(4.60971, -74.08175)', null, null, null);`);
    dbmem.public.none(`INSERT INTO asistente VALUES (2, '12345678', 'Asistente 2', 'Direccion 2', '12345678910', 'asistente2@mail.com', 'Bogota', '(4.60971, -74.08175)', null, null, null);`);
    dbmem.public.none(`INSERT INTO asistente VALUES (3, '12345672', 'Asistente 3', 'Direccion 3', '12345678913', 'asistente3@mail.com', 'Bogota', '(4.60971, -74.08175)', null, null, null);`);

    tablaUsuarios.crearTablaUsuarios(dbmem);
    dbmem.public.none(`INSERT INTO usuarios VALUES (1, 'admin', '$2a$10$64Mnsq0LSKSbPnzVcAHEKukWokkzk8JvwMk7xIL9Cn9dV6AmoRAg.');`);
    return dbmem;
};
