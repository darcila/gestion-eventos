"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutenticacionAppService = void 0;
const inversify_1 = require("inversify");
require("reflect-metadata");
const response_1 = require("@domain/response");
const entities_1 = require("@domain/entities");
const _configuration_1 = require("@configuration");
const services_1 = require("@domain/services");
let AutenticacionAppService = class AutenticacionAppService {
    constructor() {
        this.usuarioRepository = _configuration_1.DEPENDENCY_CONTAINER.get(_configuration_1.TYPES.UsuariosRepository);
    }
    async autenticar(usuario, clave) {
        const usuarioEntity = await this.validarUsuario(usuario, clave);
        const autenticacionEntity = {
            usuario: usuarioEntity.usuario,
            token: (0, services_1.generarToken)(usuarioEntity),
        };
        return response_1.Result.ok(autenticacionEntity);
    }
    async crearUsuario(usuario, clave) {
        const claveCript = await (0, services_1.encryptPassword)(clave);
        const usuarioEntity = entities_1.UsuarioEntity.create(usuario, claveCript);
        usuarioEntity.correo = 'admin@admin.com';
        usuarioEntity.id = await this.usuarioRepository.guardar(usuarioEntity);
        return response_1.Result.ok('ok');
    }
    async validarToken(token) {
        if (!token) {
            return false;
        }
        const usuarioJwt = (0, services_1.validarJWT)(token);
        if (!usuarioJwt) {
            return false;
        }
        const usuarioEntity = await this.usuarioRepository.consultar(usuarioJwt.usuario);
        if (!usuarioEntity) {
            return false;
        }
        if (usuarioEntity.id !== usuarioJwt.id) {
            return false;
        }
        return true;
    }
    async validarUsuario(usuario, clave) {
        const usuarioEntity = await this.usuarioRepository.consultar(usuario);
        if (!usuarioEntity) {
            throw new Error('Usuario no valido');
        }
        const claveValida = await (0, services_1.validatePassword)(clave, usuarioEntity.clave);
        if (!claveValida) {
            throw new Error('Usuario no valido');
        }
        return usuarioEntity;
    }
};
exports.AutenticacionAppService = AutenticacionAppService;
exports.AutenticacionAppService = AutenticacionAppService = __decorate([
    (0, inversify_1.injectable)()
], AutenticacionAppService);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXV0ZW50aWNhY2lvbkFwcFNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXBwbGljYXRpb24vc2VydmljZXMvQXV0ZW50aWNhY2lvbkFwcFNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEseUNBQXVDO0FBQ3ZDLDRCQUEwQjtBQUMxQiwrQ0FBa0Q7QUFDbEQsK0NBQW9FO0FBQ3BFLG1EQUEyRDtBQUUzRCwrQ0FBNkY7QUFHdEYsSUFBTSx1QkFBdUIsR0FBN0IsTUFBTSx1QkFBdUI7SUFBN0I7UUFDSyxzQkFBaUIsR0FBRyxxQ0FBb0IsQ0FBQyxHQUFHLENBQXFCLHNCQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQTZDdkcsQ0FBQztJQTNDRyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQWUsRUFBRSxLQUFhO1FBQzNDLE1BQU0sYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDaEUsTUFBTSxtQkFBbUIsR0FBd0I7WUFDN0MsT0FBTyxFQUFFLGFBQWEsQ0FBQyxPQUFPO1lBQzlCLEtBQUssRUFBRSxJQUFBLHVCQUFZLEVBQUMsYUFBYSxDQUFDO1NBQ3JDLENBQUM7UUFDRixPQUFPLGlCQUFNLENBQUMsRUFBRSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDMUMsQ0FBQztJQUNELEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBZSxFQUFFLEtBQWE7UUFDN0MsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFBLDBCQUFlLEVBQUMsS0FBSyxDQUFDLENBQUE7UUFDL0MsTUFBTSxhQUFhLEdBQUcsd0JBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQ2hFLGFBQWEsQ0FBQyxNQUFNLEdBQUcsaUJBQWlCLENBQUM7UUFDekMsYUFBYSxDQUFDLEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDdkUsT0FBTyxpQkFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0QsS0FBSyxDQUFDLFlBQVksQ0FBQyxLQUF5QjtRQUN4QyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDVCxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsTUFBTSxVQUFVLEdBQUcsSUFBQSxxQkFBVSxFQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNkLE9BQU8sS0FBSyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxNQUFNLGFBQWEsR0FBRyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2pGLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNqQixPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsSUFBSSxhQUFhLENBQUMsRUFBRSxLQUFLLFVBQVUsQ0FBQyxFQUFFLEVBQUUsQ0FBQztZQUNyQyxPQUFPLEtBQUssQ0FBQztRQUNqQixDQUFDO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUNPLEtBQUssQ0FBQyxjQUFjLENBQUMsT0FBZSxFQUFFLEtBQWE7UUFDdkQsTUFBTSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RFLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUNqQixNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDekMsQ0FBQztRQUNELE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBQSwyQkFBZ0IsRUFBQyxLQUFLLEVBQUUsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNmLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBQ0QsT0FBTyxhQUFhLENBQUM7SUFDekIsQ0FBQztDQUNKLENBQUE7QUE5Q1ksMERBQXVCO2tDQUF2Qix1QkFBdUI7SUFEbkMsSUFBQSxzQkFBVSxHQUFFO0dBQ0EsdUJBQXVCLENBOENuQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluamVjdGFibGUgfSBmcm9tICdpbnZlcnNpZnknO1xuaW1wb3J0ICdyZWZsZWN0LW1ldGFkYXRhJztcbmltcG9ydCB7UmVzcG9uc2UsIFJlc3VsdH0gZnJvbSBcIkBkb21haW4vcmVzcG9uc2VcIjtcbmltcG9ydCB7QXV0ZW50aWNhY2lvbkVudGl0eSwgVXN1YXJpb0VudGl0eX0gZnJvbSBcIkBkb21haW4vZW50aXRpZXNcIjtcbmltcG9ydCB7REVQRU5ERU5DWV9DT05UQUlORVIsIFRZUEVTfSBmcm9tIFwiQGNvbmZpZ3VyYXRpb25cIjtcbmltcG9ydCB7VXN1YXJpb3NSZXBvc2l0b3J5fSBmcm9tIFwiQGRvbWFpbi9yZXBvc2l0b3J5XCI7XG5pbXBvcnQge2VuY3J5cHRQYXNzd29yZCwgZ2VuZXJhclRva2VuLCB2YWxpZGFySldULCB2YWxpZGF0ZVBhc3N3b3JkfSBmcm9tIFwiQGRvbWFpbi9zZXJ2aWNlc1wiO1xuXG5AaW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQXV0ZW50aWNhY2lvbkFwcFNlcnZpY2Uge1xuICAgIHByaXZhdGUgdXN1YXJpb1JlcG9zaXRvcnkgPSBERVBFTkRFTkNZX0NPTlRBSU5FUi5nZXQ8VXN1YXJpb3NSZXBvc2l0b3J5PihUWVBFUy5Vc3Vhcmlvc1JlcG9zaXRvcnkpO1xuXG4gICAgYXN5bmMgYXV0ZW50aWNhcih1c3VhcmlvOiBzdHJpbmcsIGNsYXZlOiBzdHJpbmcpOiBQcm9taXNlPFJlc3BvbnNlPEF1dGVudGljYWNpb25FbnRpdHkgfCBudWxsPj4ge1xuICAgICAgICBjb25zdCB1c3VhcmlvRW50aXR5ID0gYXdhaXQgdGhpcy52YWxpZGFyVXN1YXJpbyh1c3VhcmlvLCBjbGF2ZSk7XG4gICAgICAgIGNvbnN0IGF1dGVudGljYWNpb25FbnRpdHk6IEF1dGVudGljYWNpb25FbnRpdHkgPSB7XG4gICAgICAgICAgICB1c3VhcmlvOiB1c3VhcmlvRW50aXR5LnVzdWFyaW8sXG4gICAgICAgICAgICB0b2tlbjogZ2VuZXJhclRva2VuKHVzdWFyaW9FbnRpdHkpLFxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gUmVzdWx0Lm9rKGF1dGVudGljYWNpb25FbnRpdHkpO1xuICAgIH1cbiAgICBhc3luYyBjcmVhclVzdWFyaW8odXN1YXJpbzogc3RyaW5nLCBjbGF2ZTogc3RyaW5nKTogUHJvbWlzZTxSZXNwb25zZTxzdHJpbmcgfCBudWxsPj4ge1xuICAgICAgICBjb25zdCBjbGF2ZUNyaXB0ID0gYXdhaXQgZW5jcnlwdFBhc3N3b3JkKGNsYXZlKVxuICAgICAgICBjb25zdCB1c3VhcmlvRW50aXR5ID0gVXN1YXJpb0VudGl0eS5jcmVhdGUodXN1YXJpbywgY2xhdmVDcmlwdCk7XG4gICAgICAgIHVzdWFyaW9FbnRpdHkuY29ycmVvID0gJ2FkbWluQGFkbWluLmNvbSc7XG4gICAgICAgIHVzdWFyaW9FbnRpdHkuaWQgPSBhd2FpdCB0aGlzLnVzdWFyaW9SZXBvc2l0b3J5Lmd1YXJkYXIodXN1YXJpb0VudGl0eSk7XG4gICAgICAgIHJldHVybiBSZXN1bHQub2soJ29rJyk7XG4gICAgfVxuICAgIGFzeW5jIHZhbGlkYXJUb2tlbih0b2tlbjogc3RyaW5nIHwgdW5kZWZpbmVkKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICAgIGlmICghdG9rZW4pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1c3VhcmlvSnd0ID0gdmFsaWRhckpXVCh0b2tlbik7XG4gICAgICAgIGlmICghdXN1YXJpb0p3dCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHVzdWFyaW9FbnRpdHkgPSBhd2FpdCB0aGlzLnVzdWFyaW9SZXBvc2l0b3J5LmNvbnN1bHRhcih1c3VhcmlvSnd0LnVzdWFyaW8pO1xuICAgICAgICBpZiAoIXVzdWFyaW9FbnRpdHkpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodXN1YXJpb0VudGl0eS5pZCAhPT0gdXN1YXJpb0p3dC5pZCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBwcml2YXRlIGFzeW5jIHZhbGlkYXJVc3VhcmlvKHVzdWFyaW86IHN0cmluZywgY2xhdmU6IHN0cmluZyk6IFByb21pc2U8VXN1YXJpb0VudGl0eT4ge1xuICAgICAgICBjb25zdCB1c3VhcmlvRW50aXR5ID0gYXdhaXQgdGhpcy51c3VhcmlvUmVwb3NpdG9yeS5jb25zdWx0YXIodXN1YXJpbyk7XG4gICAgICAgIGlmICghdXN1YXJpb0VudGl0eSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdVc3VhcmlvIG5vIHZhbGlkbycpO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNsYXZlVmFsaWRhID0gYXdhaXQgdmFsaWRhdGVQYXNzd29yZChjbGF2ZSwgdXN1YXJpb0VudGl0eS5jbGF2ZSk7XG4gICAgICAgIGlmICghY2xhdmVWYWxpZGEpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignVXN1YXJpbyBubyB2YWxpZG8nKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXN1YXJpb0VudGl0eTtcbiAgICB9XG59XG4iXX0=