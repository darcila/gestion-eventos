"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservaInfraService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const _configuration_1 = require("@configuration");
let ReservaInfraService = class ReservaInfraService {
    constructor() {
        this.reservasRepository = _configuration_1.DEPENDENCY_CONTAINER.get(_configuration_1.TYPES.ReservasRepository);
    }
    async actualizar(reserva) {
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
    async consultar(id) {
        const reserva = await this.reservasRepository.consultarPorId(id);
        if (reserva) {
            return reserva;
        }
        throw new Error('Reserva no encontrada');
    }
    async eliminar(id) {
        return !!(await this.reservasRepository.eliminar(id));
    }
    async guardar(reserva) {
        const idReserva = await this.reservasRepository.guardar(reserva);
        if (idReserva > 0) {
            return idReserva;
        }
        throw new Error('Error al guardar la reserva');
    }
    async totalAsistentes(idEvento) {
        return await this.reservasRepository.totalAsistentes(idEvento);
    }
};
exports.ReservaInfraService = ReservaInfraService;
exports.ReservaInfraService = ReservaInfraService = __decorate([
    (0, inversify_1.injectable)()
], ReservaInfraService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzZXJ2YUluZnJhU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9zZXJ2aWNlcy9SZXNlcnZhSW5mcmFTZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLHlDQUF1QztBQUN2Qyw0QkFBMEI7QUFDMUIsbURBQTZEO0FBS3RELElBQU0sbUJBQW1CLEdBQXpCLE1BQU0sbUJBQW1CO0lBQXpCO1FBQ0ssdUJBQWtCLEdBQUcscUNBQW9CLENBQUMsR0FBRyxDQUFxQixzQkFBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUE0Q3hHLENBQUM7SUExQ0csS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUEwQjtRQUN2QyxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQy9FLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDN0MsQ0FBQztRQUVELElBQUksT0FBTyxDQUFDLGdCQUFnQixLQUFLLFNBQVMsRUFBRSxDQUFDO1lBQ3pDLGFBQWEsQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7UUFDOUQsQ0FBQztRQUNELElBQUksT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2pCLGFBQWEsQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztRQUMxQyxDQUFDO1FBRUQsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDckYsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1lBQ3ZCLE9BQU8sYUFBYSxDQUFDO1FBQ3pCLENBQUM7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELEtBQUssQ0FBQyxTQUFTLENBQUMsRUFBVTtRQUN0QixNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxjQUFjLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDakUsSUFBSSxPQUFPLEVBQUUsQ0FBQztZQUNWLE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUM7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsRUFBVTtRQUNyQixPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFRCxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQXNCO1FBQ2hDLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRSxJQUFJLFNBQVMsR0FBRyxDQUFDLEVBQUUsQ0FBQztZQUNoQixPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQ0QsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFDRCxLQUFLLENBQUMsZUFBZSxDQUFDLFFBQWdCO1FBQ2xDLE9BQU8sTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FDSixDQUFBO0FBN0NZLGtEQUFtQjs4QkFBbkIsbUJBQW1CO0lBRC9CLElBQUEsc0JBQVUsR0FBRTtHQUNBLG1CQUFtQixDQTZDL0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3RhYmxlIH0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCAncmVmbGVjdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBERVBFTkRFTkNZX0NPTlRBSU5FUiwgVFlQRVMgfSBmcm9tIFwiQGNvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IFJlc2VydmFzUmVwb3NpdG9yeSB9IGZyb20gXCJAZG9tYWluL3JlcG9zaXRvcnlcIjtcbmltcG9ydCB7IFJlc2VydmFFbnRpdHksIFJlc2VydmFQYXRjaFBhcmFtIH0gZnJvbSBcIkBkb21haW4vZW50aXRpZXNcIjtcblxuQGluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFJlc2VydmFJbmZyYVNlcnZpY2Uge1xuICAgIHByaXZhdGUgcmVzZXJ2YXNSZXBvc2l0b3J5ID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0PFJlc2VydmFzUmVwb3NpdG9yeT4oVFlQRVMuUmVzZXJ2YXNSZXBvc2l0b3J5KTtcblxuICAgIGFzeW5jIGFjdHVhbGl6YXIocmVzZXJ2YTogUmVzZXJ2YVBhdGNoUGFyYW0pOiBQcm9taXNlPFJlc2VydmFFbnRpdHk+IHtcbiAgICAgICAgY29uc3QgcmVzZXJ2YUVudGl0eSA9IGF3YWl0IHRoaXMucmVzZXJ2YXNSZXBvc2l0b3J5LmNvbnN1bHRhclBvcklkKHJlc2VydmEuaWQpO1xuICAgICAgICBpZiAoIXJlc2VydmFFbnRpdHkpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignUmVzZXJ2YSBubyBlbmNvbnRyYWRhJyk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocmVzZXJ2YS5jYW50aWRhZF9ib2xldG9zICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJlc2VydmFFbnRpdHkuY2FudGlkYWRfYm9sZXRvcyA9IHJlc2VydmEuY2FudGlkYWRfYm9sZXRvcztcbiAgICAgICAgfVxuICAgICAgICBpZiAocmVzZXJ2YS5lc3RhZG8pIHtcbiAgICAgICAgICAgIHJlc2VydmFFbnRpdHkuZXN0YWRvID0gcmVzZXJ2YS5lc3RhZG87XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBpZFJlc2VydmFBY3R1YWxpemFkYSA9IGF3YWl0IHRoaXMucmVzZXJ2YXNSZXBvc2l0b3J5LmFjdHVhbGl6YXIocmVzZXJ2YUVudGl0eSk7XG4gICAgICAgIGlmIChpZFJlc2VydmFBY3R1YWxpemFkYSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc2VydmFFbnRpdHk7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFcnJvciBhbCBhY3R1YWxpemFyIGxhIHJlc2VydmEnKTtcbiAgICB9XG5cbiAgICBhc3luYyBjb25zdWx0YXIoaWQ6IG51bWJlcik6IFByb21pc2U8UmVzZXJ2YUVudGl0eT4ge1xuICAgICAgICBjb25zdCByZXNlcnZhID0gYXdhaXQgdGhpcy5yZXNlcnZhc1JlcG9zaXRvcnkuY29uc3VsdGFyUG9ySWQoaWQpO1xuICAgICAgICBpZiAocmVzZXJ2YSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlc2VydmE7XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZXNlcnZhIG5vIGVuY29udHJhZGEnKTtcbiAgICB9XG5cbiAgICBhc3luYyBlbGltaW5hcihpZDogbnVtYmVyKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIHJldHVybiAhIShhd2FpdCB0aGlzLnJlc2VydmFzUmVwb3NpdG9yeS5lbGltaW5hcihpZCkpO1xuICAgIH1cblxuICAgIGFzeW5jIGd1YXJkYXIocmVzZXJ2YTogUmVzZXJ2YUVudGl0eSk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIGNvbnN0IGlkUmVzZXJ2YSA9IGF3YWl0IHRoaXMucmVzZXJ2YXNSZXBvc2l0b3J5Lmd1YXJkYXIocmVzZXJ2YSk7XG4gICAgICAgIGlmIChpZFJlc2VydmEgPiAwKSB7XG4gICAgICAgICAgICByZXR1cm4gaWRSZXNlcnZhO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRXJyb3IgYWwgZ3VhcmRhciBsYSByZXNlcnZhJyk7XG4gICAgfVxuICAgIGFzeW5jIHRvdGFsQXNpc3RlbnRlcyhpZEV2ZW50bzogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMucmVzZXJ2YXNSZXBvc2l0b3J5LnRvdGFsQXNpc3RlbnRlcyhpZEV2ZW50byk7XG4gICAgfVxufVxuIl19