export class ReservaEntity {
    id?: number;
    asistente_id: number;
    evento_id: number;
    fecha_reserva?: Date;
    cantidad_boletos: number;
    estado: string;
    creado?: Date;
    actualizado?: Date;
    eliminado?: Date;

    constructor(
        asistente_id: number,
        evento_id: number,
        cantidad_boletos: number,
        estado: string,
        fecha_reserva?: Date,
        creado?: Date,
        actualizado?: Date,
        eliminado?: Date,
        id?: number,
    ) {
        this.id = id;
        this.asistente_id = asistente_id;
        this.evento_id = evento_id;
        this.fecha_reserva = fecha_reserva || new Date();
        this.cantidad_boletos = cantidad_boletos;
        this.estado = estado;
        this.creado = creado;
        this.actualizado = actualizado;
        this.eliminado = eliminado;
    }

    static create(
        asistente_id: number,
        evento_id: number,
        cantidad_boletos: number,
        estado: string = 'pendiente', // Estado por defecto
        fecha_reserva?: Date,
        creado?: Date,
        actualizado?: Date,
        eliminado?: Date,
        id?: number,
    ): ReservaEntity {
        return new ReservaEntity(
            asistente_id, evento_id, cantidad_boletos, estado, fecha_reserva,
            creado, actualizado, eliminado, id
        );
    }
}
