import { injectable } from 'inversify';
import 'reflect-metadata';
import { Result, Response } from '@domain/response';
import { AsistenteEntity, AsistentePatchParam, AsistentePostParam, AsistenteRespuestaMensaje } from "@domain/entities";
import { DEPENDENCY_CONTAINER } from "@configuration";
import { AsistenteInfraService } from "@infrastructure/services";
import {validarCorreo} from "@domain/services";

@injectable()
export class AsistenteAppService {
    private asistenteInfraService = DEPENDENCY_CONTAINER.get(AsistenteInfraService);

    async getAsistente(identificacion: string): Promise<Response<AsistenteEntity | null>> {
        const result = await this.asistenteInfraService.consultar(identificacion);
        return Result.ok(result);
    }

    async postAsistente(asistente: AsistentePostParam): Promise<Response<AsistenteEntity | null>> {
        const asistenteEntity = AsistenteEntity.create(
            asistente.identificacion, asistente.nombre, asistente.direccion, asistente.telefono,
            validarCorreo(asistente.correo), asistente.categorias, asistente.ciudad
        );
        asistenteEntity.id = await this.asistenteInfraService.guardar(asistenteEntity);
        return Result.ok(asistenteEntity);
    }

    async patchAsistente(asistente: AsistentePatchParam): Promise<Response<AsistenteEntity | null>> {
        this.prevalidarCamposAsistente(asistente);
        const asistenteEntity = await this.asistenteInfraService.actualizar(asistente);
        return Result.ok(asistenteEntity);
    }

    async deleteAsistente(identificacion: string): Promise<Response<AsistenteRespuestaMensaje | null>> {
        const estado = await this.asistenteInfraService.eliminar(identificacion);
        if (estado) {
            return Result.ok({ mensaje: 'Asistente eliminado', identificacion });
        }
        return Result.ok({ mensaje: 'Asistente no eliminado', identificacion });
    }

    private prevalidarCamposAsistente(asistente: AsistentePatchParam): void {
        if (!asistente.nombre && !asistente.direccion && !asistente.telefono && !asistente.correo && !asistente.categorias) {
            throw new Error('Debes enviar al menos un campo a actualizar');
        }
    }
}
