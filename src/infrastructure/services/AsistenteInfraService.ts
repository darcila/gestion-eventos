import { injectable } from 'inversify';
import 'reflect-metadata';
import {DEPENDENCY_CONTAINER, TYPES} from "@configuration";
import {AsistentesRepository} from "@domain/repository"; // Asegúrate de tener este repositorio
import {AsistenteEntity, AsistentePatchParam} from "@domain/entities";
import {MapInfraService} from "@infrastructure/services/MapInfraService"; // Asegúrate de tener estas entidades

@injectable()
export class AsistenteInfraService {
    private asistentesRepository = DEPENDENCY_CONTAINER.get<AsistentesRepository>(TYPES.AsistentesRepository);
    private mapService = DEPENDENCY_CONTAINER.get(MapInfraService);

    async actualizar(asistente: AsistentePatchParam):Promise<AsistenteEntity> {
        const asistenteEntity = await this.asistentesRepository.consultarPorIdentificacion(asistente.identificacion);
        if (!asistenteEntity) {
            throw new Error('Asistente no encontrado');
        }
        if (asistente.nombre) {
            asistenteEntity.nombre = asistente.nombre;
        }
        if (asistente.direccion) {
            asistenteEntity.direccion = asistente.direccion;
            asistenteEntity.ubicacion = await this.mapService.consultarUbicacion(asistente.direccion, asistenteEntity.ciudad);
        }
        if (asistente.telefono) {
            asistenteEntity.telefono = asistente.telefono;
        }
        if (asistente.correo) {
            asistenteEntity.correo = asistente.correo;
        }
        if (asistente.categorias) {
            asistenteEntity.categorias = asistente.categorias;
        }
        const idAsistente = await this.asistentesRepository.actualizar(asistenteEntity);
        if (idAsistente) {
            return asistenteEntity;
        }
        throw new Error('Error al actualizar el asistente');
    }

    async consultarPorId(id: number):Promise<AsistenteEntity> {
        const asistente = await this.asistentesRepository.consultarPorId(id);
        if (asistente) {
            return asistente;
        }
        throw new Error('Asistente no encontrado');
    }

    async consultar(identificacion: string):Promise<AsistenteEntity> {
        const asistente = await this.asistentesRepository.consultarPorIdentificacion(identificacion);
        if (asistente) {
            return asistente;
        }
        throw new Error('Asistente no encontrado');
    }

    async eliminar(identificacion: string):Promise<boolean> {
        return !!(await this.asistentesRepository.eliminar(identificacion));
    }

    async guardar(asistente: AsistenteEntity):Promise<number> {
        asistente.ubicacion = await this.mapService.consultarUbicacion(asistente.direccion, asistente.ciudad);
        const idAsistente = await this.asistentesRepository.guardar(asistente);
        if (idAsistente > 0) {
            return idAsistente;
        }
        throw new Error('Error al guardar el asistente');
    }
}
