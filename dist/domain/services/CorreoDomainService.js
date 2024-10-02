"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarCorreo = void 0;
const validarCorreo = (correo) => {
    const regExp = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    if (!correo) {
        throw new Error('El correo es requerido');
    }
    if (!regExp.test(correo)) {
        throw new Error('El correo no tiene un formato válido');
    }
    return correo;
};
exports.validarCorreo = validarCorreo;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29ycmVvRG9tYWluU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kb21haW4vc2VydmljZXMvQ29ycmVvRG9tYWluU2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBTyxNQUFNLGFBQWEsR0FBRyxDQUFDLE1BQWMsRUFBVSxFQUFFO0lBQ3BELE1BQU0sTUFBTSxHQUFHLElBQUksTUFBTSxDQUFDLG1EQUFtRCxDQUFDLENBQUM7SUFDL0UsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ1YsTUFBTSxJQUFJLEtBQUssQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDO1FBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsc0NBQXNDLENBQUMsQ0FBQztJQUM1RCxDQUFDO0lBQ0QsT0FBTyxNQUFNLENBQUM7QUFDbEIsQ0FBQyxDQUFBO0FBVFksUUFBQSxhQUFhLGlCQVN6QiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCB2YWxpZGFyQ29ycmVvID0gKGNvcnJlbzogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgICBjb25zdCByZWdFeHAgPSBuZXcgUmVnRXhwKC9eW2EtekEtWjAtOS5fJSstXStAW2EtekEtWjAtOS4tXStcXC5bYS16QS1aXXsyLDR9JC8pO1xuICAgIGlmICghY29ycmVvKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRWwgY29ycmVvIGVzIHJlcXVlcmlkbycpO1xuICAgIH1cbiAgICBpZiAoIXJlZ0V4cC50ZXN0KGNvcnJlbykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFbCBjb3JyZW8gbm8gdGllbmUgdW4gZm9ybWF0byB2w6FsaWRvJyk7XG4gICAgfVxuICAgIHJldHVybiBjb3JyZW87XG59XG4iXX0=