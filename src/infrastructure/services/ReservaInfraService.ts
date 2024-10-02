import { injectable } from 'inversify';
import 'reflect-metadata';
import { DEPENDENCY_CONTAINER, TYPES } from "@configuration";
import { ReservasRepository } from "@domain/repository";
import { ReservaEntity, ReservaPatchParam } from "@domain/entities";

@injectable()
export class ReservaInfraService {
    private reservasRepository = DEPENDENCY_CONTAINER.get<ReservasRepository>(TYPES.ReservasRepository);

    async actualizar(reserva: ReservaPatchParam): Promise<ReservaEntity> {
        const reservaEntity = await this.reservasRepository.consultarPorId(reserva.id);
        if (!reservaEntity) {
            throw new Error('Reserva no encontrada');
        }

        if (reserva.cantidad_boletos !== undefined) {
            reservaEntity.cantidad_boletos = reserva.cantidad_boletos;
        }
        if (reserva.estado) {
            reservaEntity.estado = reserva.estado;
        }

        const idReservaActualizada = await this.reservasRepository.actualizar(reservaEntity);
        if (idReservaActualizada) {
            return reservaEntity;
        }
        throw new Error('Error al actualizar la reserva');
    }

    async consultar(id: number): Promise<ReservaEntity> {
        const reserva = await this.reservasRepository.consultarPorId(id);
        if (reserva) {
            return reserva;
        }
        throw new Error('Reserva no encontrada');
    }

    async eliminar(id: number): Promise<boolean> {
        return !!(await this.reservasRepository.eliminar(id));
    }

    async guardar(reserva: ReservaEntity): Promise<number> {
        const idReserva = await this.reservasRepository.guardar(reserva);
        if (idReserva > 0) {
            return idReserva;
        }
        throw new Error('Error al guardar la reserva');
    }
    async totalAsistentes(idEvento: number): Promise<number> {
        return await this.reservasRepository.totalAsistentes(idEvento);
    }
}
