import { injectable } from 'inversify';
import 'reflect-metadata';
import { Result, Response } from '@domain/response';
import {
    ReservaEntity,
    ReservaPatchParam,
    ReservaPostParam,
    ReservaRespuestaMensaje
} from "@domain/entities"; // Asegúrate de tener estas entidades definidas
import { DEPENDENCY_CONTAINER } from "@configuration";
import {AsistenteInfraService, EventoInfraService, ReservaInfraService} from "@infrastructure/services";
import {ReservaCacheInfraService} from "@infrastructure/services/ReservaCacheInfraService"; // Asegúrate de tener este servicio definido

@injectable()
export class ReservaAppService {
    private reservaInfraService = DEPENDENCY_CONTAINER.get(ReservaInfraService);
    private asistenteInfraService = DEPENDENCY_CONTAINER.get(AsistenteInfraService);
    private eventoInfraService = DEPENDENCY_CONTAINER.get(EventoInfraService);
    private reservaCacheInfraService = DEPENDENCY_CONTAINER.get(ReservaCacheInfraService);

    async getReserva(id: number): Promise<Response<ReservaEntity | null>> {
        const result = await this.reservaInfraService.consultar(id);
        return Result.ok(result);
    }

    async postReserva(reserva: ReservaPostParam): Promise<Response<ReservaEntity | null>> {
        await this.asistenteInfraService.consultarPorId(reserva.asistente_id);
        await this.eventoInfraService.consultar(reserva.evento_id);
        const reservaEntity = ReservaEntity.create(
            reserva.asistente_id, reserva.evento_id, reserva.cantidad_boletos
        );
        reservaEntity.id = await this.reservaInfraService.guardar(reservaEntity);
        return Result.ok(reservaEntity);
    }

    async patchReserva(reserva: ReservaPatchParam): Promise<Response<ReservaEntity | null>> {
        const reservaEntity = await this.reservaInfraService.actualizar(reserva);
        await this.reservaCacheInfraService.invalidateCacheAsistentesCount(reservaEntity.evento_id);
        return Result.ok(reservaEntity);
    }

    async deleteReserva(id: number): Promise<Response<ReservaRespuestaMensaje | null>> {
        const estado = await this.reservaInfraService.eliminar(id);
        if (estado) {
            return Result.ok({ mensaje: 'Reserva eliminada', id });
        }
        return Result.ok({ mensaje: 'Reserva no eliminada', id });
    }
}
