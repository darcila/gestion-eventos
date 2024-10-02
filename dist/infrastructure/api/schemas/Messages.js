"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messages = void 0;
const messages = (field, option) => ({
    'any.required': `El campo ${field} es requerido`,
    'any.only': `El valor de ${field} debe ser ${option}`,
    'string.empty': `El campo ${field} no puede estar vacío`,
    'string.base': `El campo ${field} no es un string`,
    'string.length': `El campo ${field} no puede ser vacio o tener +/- de ${option} dígitos`,
    'string.email': `El campo ${field} debe tener un arreglo de correos válidos`,
    'string.max': `El campo ${field} excede la cantidad de caracteres permitidos ${option}`,
    'string.min': `El campo ${field} debe tener minimo ${option} caracteres `,
    'string.pattern.base': `El campo ${field} solo debe contener números `,
    'number.base': `El campo ${field} no es un número`,
    'number.min': `El campo ${field} debe ser mayor o igual a 0`,
    'number.integer': `El campo ${field} no puede ser un decimal`,
    'number.greater': `El campo ${field} debe ser mayor a ${option}`,
    'boolean.base': `El campo ${field} no es un booleano`,
    'array.base': `El campo ${field} no es un arreglo`,
    'array.includesRequiredUnknowns': `El campo ${field} debe tener al menos 1 item`,
});
exports.messages = messages;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvYXBpL3NjaGVtYXMvTWVzc2FnZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQU8sTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFhLEVBQUUsTUFBZSxFQUEwQixFQUFFLENBQUMsQ0FBQztJQUNqRixjQUFjLEVBQUUsWUFBWSxLQUFLLGVBQWU7SUFDaEQsVUFBVSxFQUFFLGVBQWUsS0FBSyxhQUFhLE1BQU0sRUFBRTtJQUNyRCxjQUFjLEVBQUUsWUFBWSxLQUFLLHVCQUF1QjtJQUN4RCxhQUFhLEVBQUUsWUFBWSxLQUFLLGtCQUFrQjtJQUNsRCxlQUFlLEVBQUUsWUFBWSxLQUFLLHNDQUFzQyxNQUFNLFVBQVU7SUFDeEYsY0FBYyxFQUFFLFlBQVksS0FBSywyQ0FBMkM7SUFDNUUsWUFBWSxFQUFFLFlBQVksS0FBSyxnREFBZ0QsTUFBTSxFQUFFO0lBQ3ZGLFlBQVksRUFBRSxZQUFZLEtBQUssc0JBQXNCLE1BQU0sY0FBYztJQUN6RSxxQkFBcUIsRUFBRSxZQUFZLEtBQUssOEJBQThCO0lBQ3RFLGFBQWEsRUFBRSxZQUFZLEtBQUssa0JBQWtCO0lBQ2xELFlBQVksRUFBRSxZQUFZLEtBQUssNkJBQTZCO0lBQzVELGdCQUFnQixFQUFFLFlBQVksS0FBSywwQkFBMEI7SUFDN0QsZ0JBQWdCLEVBQUUsWUFBWSxLQUFLLHFCQUFxQixNQUFNLEVBQUU7SUFDaEUsY0FBYyxFQUFFLFlBQVksS0FBSyxvQkFBb0I7SUFDckQsWUFBWSxFQUFFLFlBQVksS0FBSyxtQkFBbUI7SUFDbEQsZ0NBQWdDLEVBQUUsWUFBWSxLQUFLLDZCQUE2QjtDQUNuRixDQUFDLENBQUM7QUFqQlUsUUFBQSxRQUFRLFlBaUJsQiIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCBtZXNzYWdlcyA9IChmaWVsZDogc3RyaW5nLCBvcHRpb24/OiBzdHJpbmcpOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0+ICh7XG4gICAgJ2FueS5yZXF1aXJlZCc6IGBFbCBjYW1wbyAke2ZpZWxkfSBlcyByZXF1ZXJpZG9gLFxuICAgICdhbnkub25seSc6IGBFbCB2YWxvciBkZSAke2ZpZWxkfSBkZWJlIHNlciAke29wdGlvbn1gLFxuICAgICdzdHJpbmcuZW1wdHknOiBgRWwgY2FtcG8gJHtmaWVsZH0gbm8gcHVlZGUgZXN0YXIgdmFjw61vYCxcbiAgICAnc3RyaW5nLmJhc2UnOiBgRWwgY2FtcG8gJHtmaWVsZH0gbm8gZXMgdW4gc3RyaW5nYCxcbiAgICAnc3RyaW5nLmxlbmd0aCc6IGBFbCBjYW1wbyAke2ZpZWxkfSBubyBwdWVkZSBzZXIgdmFjaW8gbyB0ZW5lciArLy0gZGUgJHtvcHRpb259IGTDrWdpdG9zYCxcbiAgICAnc3RyaW5nLmVtYWlsJzogYEVsIGNhbXBvICR7ZmllbGR9IGRlYmUgdGVuZXIgdW4gYXJyZWdsbyBkZSBjb3JyZW9zIHbDoWxpZG9zYCxcbiAgICAnc3RyaW5nLm1heCc6IGBFbCBjYW1wbyAke2ZpZWxkfSBleGNlZGUgbGEgY2FudGlkYWQgZGUgY2FyYWN0ZXJlcyBwZXJtaXRpZG9zICR7b3B0aW9ufWAsXG4gICAgJ3N0cmluZy5taW4nOiBgRWwgY2FtcG8gJHtmaWVsZH0gZGViZSB0ZW5lciBtaW5pbW8gJHtvcHRpb259IGNhcmFjdGVyZXMgYCxcbiAgICAnc3RyaW5nLnBhdHRlcm4uYmFzZSc6IGBFbCBjYW1wbyAke2ZpZWxkfSBzb2xvIGRlYmUgY29udGVuZXIgbsO6bWVyb3MgYCxcbiAgICAnbnVtYmVyLmJhc2UnOiBgRWwgY2FtcG8gJHtmaWVsZH0gbm8gZXMgdW4gbsO6bWVyb2AsXG4gICAgJ251bWJlci5taW4nOiBgRWwgY2FtcG8gJHtmaWVsZH0gZGViZSBzZXIgbWF5b3IgbyBpZ3VhbCBhIDBgLFxuICAgICdudW1iZXIuaW50ZWdlcic6IGBFbCBjYW1wbyAke2ZpZWxkfSBubyBwdWVkZSBzZXIgdW4gZGVjaW1hbGAsXG4gICAgJ251bWJlci5ncmVhdGVyJzogYEVsIGNhbXBvICR7ZmllbGR9IGRlYmUgc2VyIG1heW9yIGEgJHtvcHRpb259YCxcbiAgICAnYm9vbGVhbi5iYXNlJzogYEVsIGNhbXBvICR7ZmllbGR9IG5vIGVzIHVuIGJvb2xlYW5vYCxcbiAgICAnYXJyYXkuYmFzZSc6IGBFbCBjYW1wbyAke2ZpZWxkfSBubyBlcyB1biBhcnJlZ2xvYCxcbiAgICAnYXJyYXkuaW5jbHVkZXNSZXF1aXJlZFVua25vd25zJzogYEVsIGNhbXBvICR7ZmllbGR9IGRlYmUgdGVuZXIgYWwgbWVub3MgMSBpdGVtYCxcbn0pO1xuIl19