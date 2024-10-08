"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsuarioEntity = void 0;
class UsuarioEntity {
    constructor(usuario, clave, estado, rol, nombre, apellido, correo, creado, actualizado, id) {
        this.id = id;
        this.usuario = usuario;
        this.clave = clave;
        this.estado = estado;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.rol = rol;
        this.creado = creado;
        this.actualizado = actualizado;
    }
    static create(usuario, clave, estado = true, rol = 'usuario', nombre, apellido, correo, creado, actualizado, id) {
        return new UsuarioEntity(usuario, clave, estado, rol, nombre, apellido, correo, creado, actualizado, id);
    }
}
exports.UsuarioEntity = UsuarioEntity;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXN1YXJpb0VudGl0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb21haW4vZW50aXRpZXMvVXN1YXJpb0VudGl0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFhLGFBQWE7SUFZdEIsWUFDSSxPQUFlLEVBQ2YsS0FBYSxFQUNiLE1BQWUsRUFDZixHQUFXLEVBQ1gsTUFBZSxFQUNmLFFBQWlCLEVBQ2pCLE1BQWUsRUFDZixNQUFhLEVBQ2IsV0FBa0IsRUFDbEIsRUFBVztRQUVYLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7UUFDekIsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFDckIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNuQyxDQUFDO0lBRUQsTUFBTSxDQUFDLE1BQU0sQ0FDVCxPQUFlLEVBQ2YsS0FBYSxFQUNiLFNBQWtCLElBQUksRUFDdEIsTUFBYyxTQUFTLEVBQ3ZCLE1BQWUsRUFDZixRQUFpQixFQUNqQixNQUFlLEVBQ2YsTUFBYSxFQUNiLFdBQWtCLEVBQ2xCLEVBQVc7UUFFWCxPQUFPLElBQUksYUFBYSxDQUNwQixPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQ3JELE1BQU0sRUFBRSxXQUFXLEVBQUUsRUFBRSxDQUMxQixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBckRELHNDQXFEQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBVc3VhcmlvRW50aXR5IHtcbiAgICBpZD86IG51bWJlcjtcbiAgICB1c3VhcmlvOiBzdHJpbmc7XG4gICAgY2xhdmU6IHN0cmluZztcbiAgICBlc3RhZG86IGJvb2xlYW47XG4gICAgbm9tYnJlPzogc3RyaW5nO1xuICAgIGFwZWxsaWRvPzogc3RyaW5nO1xuICAgIGNvcnJlbz86IHN0cmluZztcbiAgICByb2w6IHN0cmluZztcbiAgICBjcmVhZG8/OiBEYXRlO1xuICAgIGFjdHVhbGl6YWRvPzogRGF0ZTtcblxuICAgIGNvbnN0cnVjdG9yKFxuICAgICAgICB1c3VhcmlvOiBzdHJpbmcsXG4gICAgICAgIGNsYXZlOiBzdHJpbmcsXG4gICAgICAgIGVzdGFkbzogYm9vbGVhbixcbiAgICAgICAgcm9sOiBzdHJpbmcsXG4gICAgICAgIG5vbWJyZT86IHN0cmluZyxcbiAgICAgICAgYXBlbGxpZG8/OiBzdHJpbmcsXG4gICAgICAgIGNvcnJlbz86IHN0cmluZyxcbiAgICAgICAgY3JlYWRvPzogRGF0ZSxcbiAgICAgICAgYWN0dWFsaXphZG8/OiBEYXRlLFxuICAgICAgICBpZD86IG51bWJlcixcbiAgICApIHtcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xuICAgICAgICB0aGlzLnVzdWFyaW8gPSB1c3VhcmlvO1xuICAgICAgICB0aGlzLmNsYXZlID0gY2xhdmU7XG4gICAgICAgIHRoaXMuZXN0YWRvID0gZXN0YWRvO1xuICAgICAgICB0aGlzLm5vbWJyZSA9IG5vbWJyZTtcbiAgICAgICAgdGhpcy5hcGVsbGlkbyA9IGFwZWxsaWRvO1xuICAgICAgICB0aGlzLmNvcnJlbyA9IGNvcnJlbztcbiAgICAgICAgdGhpcy5yb2wgPSByb2w7XG4gICAgICAgIHRoaXMuY3JlYWRvID0gY3JlYWRvO1xuICAgICAgICB0aGlzLmFjdHVhbGl6YWRvID0gYWN0dWFsaXphZG87XG4gICAgfVxuXG4gICAgc3RhdGljIGNyZWF0ZShcbiAgICAgICAgdXN1YXJpbzogc3RyaW5nLFxuICAgICAgICBjbGF2ZTogc3RyaW5nLFxuICAgICAgICBlc3RhZG86IGJvb2xlYW4gPSB0cnVlLCAvLyBFc3RhZG8gYWN0aXZvIHBvciBkZWZlY3RvXG4gICAgICAgIHJvbDogc3RyaW5nID0gJ3VzdWFyaW8nLCAvLyBSb2wgJ3VzdWFyaW8nIHBvciBkZWZlY3RvXG4gICAgICAgIG5vbWJyZT86IHN0cmluZyxcbiAgICAgICAgYXBlbGxpZG8/OiBzdHJpbmcsXG4gICAgICAgIGNvcnJlbz86IHN0cmluZyxcbiAgICAgICAgY3JlYWRvPzogRGF0ZSxcbiAgICAgICAgYWN0dWFsaXphZG8/OiBEYXRlLFxuICAgICAgICBpZD86IG51bWJlcixcbiAgICApOiBVc3VhcmlvRW50aXR5IHtcbiAgICAgICAgcmV0dXJuIG5ldyBVc3VhcmlvRW50aXR5KFxuICAgICAgICAgICAgdXN1YXJpbywgY2xhdmUsIGVzdGFkbywgcm9sLCBub21icmUsIGFwZWxsaWRvLCBjb3JyZW8sXG4gICAgICAgICAgICBjcmVhZG8sIGFjdHVhbGl6YWRvLCBpZFxuICAgICAgICApO1xuICAgIH1cbn1cbiJdfQ==