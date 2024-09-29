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
import { ReservaInfraService } from "@infrastructure/services"; // Asegúrate de tener este servicio definido

@injectable()
export class ReservaAppService {
    private reservaInfraService = DEPENDENCY_CONTAINER.get(ReservaInfraService);

    async getReserva(id: number): Promise<Response<ReservaEntity | null>> {
        const result = await this.reservaInfraService.consultar(id);
        return Result.ok(result);
    }

    async postReserva(reserva: ReservaPostParam): Promise<Response<ReservaEntity | null>> {
        const reservaEntity = ReservaEntity.create(
            reserva.asistente_id, reserva.evento_id, reserva.cantidad_boletos
            // Otros campos opcionales según tus necesidades (precio_total, forma_pago, etc.)
        );
        reservaEntity.id = await this.reservaInfraService.guardar(reservaEntity);
        return Result.ok(reservaEntity);
    }

    async patchReserva(id: number, reserva: ReservaPatchParam): Promise<Response<ReservaEntity | null>> {
        const reservaEntity = await this.reservaInfraService.actualizar(id, reserva);
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
