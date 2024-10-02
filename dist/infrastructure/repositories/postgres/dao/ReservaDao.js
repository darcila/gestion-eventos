"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReservasDao = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const _configuration_1 = require("@configuration");
let ReservasDao = class ReservasDao {
    constructor() {
        this.db = _configuration_1.DEPENDENCY_CONTAINER.get(_configuration_1.TYPES.PostgresqlEventos);
    }
    async actualizar(reserva) {
        try {
            const sql = `UPDATE reserva 
                         SET estado = $1, actualizado = NOW() 
                         WHERE id = $2 
                         RETURNING id`;
            const result = await this.db.oneOrNone(sql, [
                reserva.estado,
                reserva.id
            ]);
            return result === null || result === void 0 ? void 0 : result.id;
        }
        catch (error) {
            console.error('Error al actualizar la reserva', error);
            return null;
        }
    }
    async consultarPorId(id) {
        try {
            const sql = `SELECT * FROM reserva WHERE id = $1`;
            return await this.db.oneOrNone(sql, [id]);
        }
        catch (error) {
            console.error('Error al consultar la reserva', error);
            return null;
        }
    }
    async eliminar(id) {
        try {
            const sql = `DELETE FROM reserva WHERE id = $1 RETURNING id`;
            const result = await this.db.oneOrNone(sql, [id]);
            return result === null || result === void 0 ? void 0 : result.id;
        }
        catch (error) {
            console.error('Error al eliminar la reserva', error);
            return null;
        }
    }
    async guardar(reserva) {
        try {
            const sql = `INSERT INTO reserva (asistente_id, evento_id, cantidad_boletos) 
                         VALUES ($1, $2, $3) 
                         RETURNING id`;
            const result = await this.db.one(sql, [
                reserva.asistente_id,
                reserva.evento_id,
                reserva.cantidad_boletos
            ]);
            return result.id;
        }
        catch (error) {
            console.error('Error al guardar la reserva', error);
            return -1;
        }
    }
    async totalAsistentes(idEvento) {
        try {
            const sql = `SELECT coalesce(SUM(cantidad_boletos), 0) as total_asistentes 
                         FROM reserva 
                         WHERE evento_id = $1 and estado = 'confirmada'`;
            const result = await this.db.one(sql, [idEvento]);
            return result.total_asistentes;
        }
        catch (error) {
            console.error('Error al consultar el total de asistentes', error);
            return -1;
        }
    }
};
exports.ReservasDao = ReservasDao;
exports.ReservasDao = ReservasDao = __decorate([
    (0, inversify_1.injectable)()
], ReservasDao);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzZXJ2YURhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9yZXBvc2l0b3JpZXMvcG9zdGdyZXMvZGFvL1Jlc2VydmFEYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUNBQXVDO0FBQ3ZDLDRCQUEwQjtBQUcxQixtREFBNkQ7QUFJdEQsSUFBTSxXQUFXLEdBQWpCLE1BQU0sV0FBVztJQUFqQjtRQUNLLE9BQUUsR0FBRyxxQ0FBb0IsQ0FBQyxHQUFHLENBQW1CLHNCQUFLLENBQUMsaUJBQWlCLENBQUMsQ0FBQztJQXVFckYsQ0FBQztJQXJFRyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQXNCO1FBQ25DLElBQUksQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHOzs7c0NBR2MsQ0FBQztZQUUzQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFpQixHQUFHLEVBQUU7Z0JBQ3hELE9BQU8sQ0FBQyxNQUFNO2dCQUNkLE9BQU8sQ0FBQyxFQUFFO2FBQ2IsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyxnQ0FBZ0MsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUN2RCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxjQUFjLENBQUMsRUFBVTtRQUMzQixJQUFJLENBQUM7WUFDRCxNQUFNLEdBQUcsR0FBRyxxQ0FBcUMsQ0FBQztZQUNsRCxPQUFPLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQWdCLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7WUFDYixPQUFPLENBQUMsS0FBSyxDQUFDLCtCQUErQixFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3RELE9BQU8sSUFBSSxDQUFDO1FBQ2hCLENBQUM7SUFDTCxDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFVO1FBQ3JCLElBQUksQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLGdEQUFnRCxDQUFDO1lBQzdELE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQWlCLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbEUsT0FBTyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNyRCxPQUFPLElBQUksQ0FBQztRQUNoQixDQUFDO0lBQ0wsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDO1lBQ0QsTUFBTSxHQUFHLEdBQUc7O3NDQUVjLENBQUM7WUFFM0IsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBaUIsR0FBRyxFQUFFO2dCQUNsRCxPQUFPLENBQUMsWUFBWTtnQkFDcEIsT0FBTyxDQUFDLFNBQVM7Z0JBQ2pCLE9BQU8sQ0FBQyxnQkFBZ0I7YUFDM0IsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3JCLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQyw2QkFBNkIsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNwRCxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7SUFDRCxLQUFLLENBQUMsZUFBZSxDQUFDLFFBQWdCO1FBQ2xDLElBQUksQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHOzt3RUFFZ0QsQ0FBQztZQUU3RCxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUErQixHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLE9BQU8sTUFBTSxDQUFDLGdCQUFnQixDQUFDO1FBQ25DLENBQUM7UUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTyxDQUFDLEtBQUssQ0FBQywyQ0FBMkMsRUFBRSxLQUFLLENBQUMsQ0FBQztZQUNsRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ2QsQ0FBQztJQUNMLENBQUM7Q0FDSixDQUFBO0FBeEVZLGtDQUFXO3NCQUFYLFdBQVc7SUFEdkIsSUFBQSxzQkFBVSxHQUFFO0dBQ0EsV0FBVyxDQXdFdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3RhYmxlIH0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCAncmVmbGVjdC1tZXRhZGF0YSc7XG5pbXBvcnQgeyBSZXNlcnZhc1JlcG9zaXRvcnkgfSBmcm9tIFwiQGRvbWFpbi9yZXBvc2l0b3J5XCI7XG5pbXBvcnQgeyBSZXNlcnZhRW50aXR5LCBSZXN1bHRhZG9Db25JZCB9IGZyb20gXCJAZG9tYWluL2VudGl0aWVzXCI7XG5pbXBvcnQgeyBERVBFTkRFTkNZX0NPTlRBSU5FUiwgVFlQRVMgfSBmcm9tIFwiQGNvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7IElEYXRhYmFzZSwgSU1haW4gfSBmcm9tIFwicGctcHJvbWlzZVwiO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgUmVzZXJ2YXNEYW8gaW1wbGVtZW50cyBSZXNlcnZhc1JlcG9zaXRvcnkge1xuICAgIHByaXZhdGUgZGIgPSBERVBFTkRFTkNZX0NPTlRBSU5FUi5nZXQ8SURhdGFiYXNlPElNYWluPj4oVFlQRVMuUG9zdGdyZXNxbEV2ZW50b3MpO1xuXG4gICAgYXN5bmMgYWN0dWFsaXphcihyZXNlcnZhOiBSZXNlcnZhRW50aXR5KTogUHJvbWlzZTxudW1iZXIgfCBudWxsIHwgdW5kZWZpbmVkPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzcWwgPSBgVVBEQVRFIHJlc2VydmEgXG4gICAgICAgICAgICAgICAgICAgICAgICAgU0VUIGVzdGFkbyA9ICQxLCBhY3R1YWxpemFkbyA9IE5PVygpIFxuICAgICAgICAgICAgICAgICAgICAgICAgIFdIRVJFIGlkID0gJDIgXG4gICAgICAgICAgICAgICAgICAgICAgICAgUkVUVVJOSU5HIGlkYDtcblxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5kYi5vbmVPck5vbmU8UmVzdWx0YWRvQ29uSWQ+KHNxbCwgW1xuICAgICAgICAgICAgICAgIHJlc2VydmEuZXN0YWRvLFxuICAgICAgICAgICAgICAgIHJlc2VydmEuaWRcbiAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdD8uaWQ7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhbCBhY3R1YWxpemFyIGxhIHJlc2VydmEnLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGNvbnN1bHRhclBvcklkKGlkOiBudW1iZXIpOiBQcm9taXNlPFJlc2VydmFFbnRpdHkgfCBudWxsPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzcWwgPSBgU0VMRUNUICogRlJPTSByZXNlcnZhIFdIRVJFIGlkID0gJDFgO1xuICAgICAgICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuZGIub25lT3JOb25lPFJlc2VydmFFbnRpdHk+KHNxbCwgW2lkXSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhbCBjb25zdWx0YXIgbGEgcmVzZXJ2YScsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgYXN5bmMgZWxpbWluYXIoaWQ6IG51bWJlcik6IFByb21pc2U8bnVtYmVyIHwgbnVsbCB8IHVuZGVmaW5lZD4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc3FsID0gYERFTEVURSBGUk9NIHJlc2VydmEgV0hFUkUgaWQgPSAkMSBSRVRVUk5JTkcgaWRgO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5kYi5vbmVPck5vbmU8UmVzdWx0YWRvQ29uSWQ+KHNxbCwgW2lkXSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0Py5pZDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGVsaW1pbmFyIGxhIHJlc2VydmEnLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGFzeW5jIGd1YXJkYXIocmVzZXJ2YTogUmVzZXJ2YUVudGl0eSk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBjb25zdCBzcWwgPSBgSU5TRVJUIElOVE8gcmVzZXJ2YSAoYXNpc3RlbnRlX2lkLCBldmVudG9faWQsIGNhbnRpZGFkX2JvbGV0b3MpIFxuICAgICAgICAgICAgICAgICAgICAgICAgIFZBTFVFUyAoJDEsICQyLCAkMykgXG4gICAgICAgICAgICAgICAgICAgICAgICAgUkVUVVJOSU5HIGlkYDtcblxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5kYi5vbmU8UmVzdWx0YWRvQ29uSWQ+KHNxbCwgW1xuICAgICAgICAgICAgICAgIHJlc2VydmEuYXNpc3RlbnRlX2lkLFxuICAgICAgICAgICAgICAgIHJlc2VydmEuZXZlbnRvX2lkLFxuICAgICAgICAgICAgICAgIHJlc2VydmEuY2FudGlkYWRfYm9sZXRvc1xuICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0LmlkO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgZ3VhcmRhciBsYSByZXNlcnZhJywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgfVxuICAgIGFzeW5jIHRvdGFsQXNpc3RlbnRlcyhpZEV2ZW50bzogbnVtYmVyKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHNxbCA9IGBTRUxFQ1QgY29hbGVzY2UoU1VNKGNhbnRpZGFkX2JvbGV0b3MpLCAwKSBhcyB0b3RhbF9hc2lzdGVudGVzIFxuICAgICAgICAgICAgICAgICAgICAgICAgIEZST00gcmVzZXJ2YSBcbiAgICAgICAgICAgICAgICAgICAgICAgICBXSEVSRSBldmVudG9faWQgPSAkMSBhbmQgZXN0YWRvID0gJ2NvbmZpcm1hZGEnYDtcblxuICAgICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5kYi5vbmU8eyB0b3RhbF9hc2lzdGVudGVzOiBudW1iZXIgfT4oc3FsLCBbaWRFdmVudG9dKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQudG90YWxfYXNpc3RlbnRlcztcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGFsIGNvbnN1bHRhciBlbCB0b3RhbCBkZSBhc2lzdGVudGVzJywgZXJyb3IpO1xuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgfVxufVxuIl19