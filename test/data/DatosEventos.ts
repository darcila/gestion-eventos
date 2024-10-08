export const usuarioAuth = { usuario: 'admin', clave: 'admin', id: 1, correo: 'admin@mail.com' };

export const mockAsistente = {
    identificacion: '1234567890',
    nombre: 'Juan Perez',
    direccion: 'Calle 123',
    telefono: '1234567',
    correo: 'juan@mail.com',
    categorias: [],
    ciudad: 'Bogota'
};

export const consultaUsuario = {
    "id": 4,
    "identificacion": "12345679",
    "nombre": "Asistente 1",
    "direccion": "Direccion 1",
    "telefono": "12345678911",
    "correo": "asistente1@mail.com",
    "ciudad": "Bogota",
    "ubicacion": {
        "x": 4.60971,
        "y": -74.08175
    },
    "creado": null,
    "actualizado": null,
    "eliminado": null
};
export const consulta = '/undefined/undefined';

export const asistenteRespose = {
    id: consultaUsuario.id,
    identificacion: consultaUsuario.identificacion,
    nombre: consultaUsuario.nombre,
    direccion: consultaUsuario.direccion,
    telefono: consultaUsuario.telefono,
    correo: consultaUsuario.correo,
    categorias: [],
};

export const dataResponseAsistente = {
    isError: false,
    id: expect.any(String),
    data: asistenteRespose,
    timestamp: expect.any(String),
};

export const dataAsistenteCreado = {
    isError: false,
    id: expect.any(String),
    data: {
        id: expect.any(Number),
        identificacion: mockAsistente.identificacion,
        nombre: mockAsistente.nombre,
        direccion: mockAsistente.direccion,
        telefono: mockAsistente.telefono,
        correo: mockAsistente.correo,
        categorias: mockAsistente.categorias,
    },
    timestamp: expect.any(String),
};

export const dataResponseEvento = {
    isError: false,
    id: expect.any(String),
    data: {
        id: 2,
        nombre: 'Evento 2',
        descripcion: 'Descripcion Evento 2',
        lugar: 'Parque Simon Bolivar',
        ciudad: 'Bogota',
        fecha: '2024-02-02',
        hora: '10:00:00',
        valor: 10000,
        capacidad: 100,
    },
    timestamp: expect.any(String),
};

export const mockEvento = {
    nombre: 'Evento 5',
    descripcion: 'Descripcion Evento 5',
    lugar: 'Carrera 852',
    ciudad: 'Bogota',
    fecha: '2024-02-02',
    hora: '10:00:00',
    capacidad: 200,
};

export const eventoCreado = {
    id: 1,
    ...mockEvento
}

export const dataResponseEventoCreado = {
    isError: false,
    id: expect.any(String),
    data: eventoCreado,
    timestamp: expect.any(String),
};

export const datoResponseReserva = {
    isError: false,
    id: expect.any(String),
    data: {
        id: 4,
        asistente_id: 4,
        evento_id: 4,
        cantidad_boletos: 2,
        estado: 'CREADA',
    },
    timestamp: expect.any(String),
};

export const respuestaReservaBorrar = {
    isError: false,
    id: expect.any(String),
    data: {
        mensaje: "Reserva eliminada",
    },
    timestamp: expect.any(String),
};
