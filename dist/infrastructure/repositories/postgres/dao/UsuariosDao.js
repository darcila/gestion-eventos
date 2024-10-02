"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuariosDao = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const _configuration_1 = require("@configuration");
let UsuariosDao = class UsuariosDao {
    constructor() {
        this.db = _configuration_1.DEPENDENCY_CONTAINER.get(_configuration_1.TYPES.PostgresqlEventos);
    }
    async guardar(usuario) {
        try {
            const sql = `INSERT INTO usuarios (usuario, clave, correo) VALUES ($1, $2, $3) RETURNING id`;
            const resultado = await this.db.one(sql, [usuario.usuario, usuario.clave, usuario.correo]);
            return resultado.id;
        }
        catch (error) {
            console.error('Error al guardar', error);
            return -1;
        }
    }
    async consultar(usuario) {
        try {
            const sql = `SELECT id, usuario, clave FROM usuarios WHERE usuario = $1`;
            const resultado = await this.db.oneOrNone(sql, usuario);
            return resultado;
        }
        catch (error) {
            console.error('Error al consultar', error);
            return null;
        }
    }
};
exports.UsuariosDao = UsuariosDao;
exports.UsuariosDao = UsuariosDao = __decorate([
    (0, inversify_1.injectable)()
], UsuariosDao);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXN1YXJpb3NEYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvcmVwb3NpdG9yaWVzL3Bvc3RncmVzL2Rhby9Vc3Vhcmlvc0Rhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSx5Q0FBdUM7QUFDdkMsNEJBQTBCO0FBRTFCLG1EQUE2RDtBQUt0RCxJQUFNLFdBQVcsR0FBakIsTUFBTSxXQUFXO0lBQWpCO1FBQ0ssT0FBRSxHQUFHLHFDQUFvQixDQUFDLEdBQUcsQ0FBbUIsc0JBQUssQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO0lBc0JyRixDQUFDO0lBcEJHLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBc0I7UUFDaEMsSUFBSSxDQUFDO1lBQ0QsTUFBTSxHQUFHLEdBQUcsZ0ZBQWdGLENBQUM7WUFDN0YsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBd0IsR0FBRyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2xILE9BQU8sU0FBUyxDQUFDLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDekMsT0FBTyxDQUFDLENBQUMsQ0FBQztRQUNkLENBQUM7SUFDTCxDQUFDO0lBQ0QsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFlO1FBQzNCLElBQUksQ0FBQztZQUNELE1BQU0sR0FBRyxHQUFHLDREQUE0RCxDQUFDO1lBQ3pFLE1BQU0sU0FBUyxHQUFHLE1BQU0sSUFBSSxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQWdCLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztZQUN2RSxPQUFPLFNBQVMsQ0FBQztRQUNyQixDQUFDO1FBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztZQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUM7WUFDM0MsT0FBTyxJQUFJLENBQUM7UUFDaEIsQ0FBQztJQUNMLENBQUM7Q0FDSixDQUFBO0FBdkJZLGtDQUFXO3NCQUFYLFdBQVc7SUFEdkIsSUFBQSxzQkFBVSxHQUFFO0dBQ0EsV0FBVyxDQXVCdkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpbmplY3RhYmxlIH0gZnJvbSAnaW52ZXJzaWZ5JztcbmltcG9ydCAncmVmbGVjdC1tZXRhZGF0YSc7XG5pbXBvcnQge1VzdWFyaW9zUmVwb3NpdG9yeX0gZnJvbSBcIkBkb21haW4vcmVwb3NpdG9yeVwiO1xuaW1wb3J0IHsgREVQRU5ERU5DWV9DT05UQUlORVIsIFRZUEVTIH0gZnJvbSBcIkBjb25maWd1cmF0aW9uXCI7XG5pbXBvcnQgeyBJRGF0YWJhc2UsIElNYWluIH0gZnJvbSBcInBnLXByb21pc2VcIjtcbmltcG9ydCB7UmVzdWx0YWRvUmVzZXJ2YUNvbklkLCBVc3VhcmlvRW50aXR5fSBmcm9tIFwiQGRvbWFpbi9lbnRpdGllc1wiO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgVXN1YXJpb3NEYW8gaW1wbGVtZW50cyBVc3Vhcmlvc1JlcG9zaXRvcnkge1xuICAgIHByaXZhdGUgZGIgPSBERVBFTkRFTkNZX0NPTlRBSU5FUi5nZXQ8SURhdGFiYXNlPElNYWluPj4oVFlQRVMuUG9zdGdyZXNxbEV2ZW50b3MpO1xuXG4gICAgYXN5bmMgZ3VhcmRhcih1c3VhcmlvOiBVc3VhcmlvRW50aXR5KTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGNvbnN0IHNxbCA9IGBJTlNFUlQgSU5UTyB1c3VhcmlvcyAodXN1YXJpbywgY2xhdmUsIGNvcnJlbykgVkFMVUVTICgkMSwgJDIsICQzKSBSRVRVUk5JTkcgaWRgO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0YWRvID0gYXdhaXQgdGhpcy5kYi5vbmU8UmVzdWx0YWRvUmVzZXJ2YUNvbklkPihzcWwsIFt1c3VhcmlvLnVzdWFyaW8sIHVzdWFyaW8uY2xhdmUsIHVzdWFyaW8uY29ycmVvXSk7XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0YWRvLmlkO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyb3IgYWwgZ3VhcmRhcicsIGVycm9yKTtcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBhc3luYyBjb25zdWx0YXIodXN1YXJpbzogc3RyaW5nKTogUHJvbWlzZTxVc3VhcmlvRW50aXR5IHwgbnVsbD4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3Qgc3FsID0gYFNFTEVDVCBpZCwgdXN1YXJpbywgY2xhdmUgRlJPTSB1c3VhcmlvcyBXSEVSRSB1c3VhcmlvID0gJDFgO1xuICAgICAgICAgICAgY29uc3QgcmVzdWx0YWRvID0gYXdhaXQgdGhpcy5kYi5vbmVPck5vbmU8VXN1YXJpb0VudGl0eT4oc3FsLCB1c3VhcmlvKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHRhZG87XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBhbCBjb25zdWx0YXInLCBlcnJvcik7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbn1cbiJdfQ==