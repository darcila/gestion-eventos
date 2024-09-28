"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swagger_config = void 0;
const _util_1 = require("@util");
exports.swagger_config = {
    swagger: {
        info: {
            title: 'Microservice Template',
            description: 'Este microservicio se encarga de guardar la configuración inicial Firestore',
            version: '0.1.0',
            contact: {
                name: 'Coordinadora Mercantil S.A',
                url: 'http://www.coordinadora.com/',
                email: 'it@coordinadora.com',
            },
        },
        host: _util_1.HOST,
        schemes: _util_1.NODE_ENV === 'local' ? ['http'] : ['https'],
        consumes: ['application/json'],
        produces: ['application/json'],
    },
    hideUntagged: true,
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL2FwaS9zd2FnZ2VyL2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpQ0FBdUM7QUFHMUIsUUFBQSxjQUFjLEdBQWlDO0lBRXhELE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRTtZQUNGLEtBQUssRUFBRSx1QkFBdUI7WUFDOUIsV0FBVyxFQUFFLDZFQUE2RTtZQUMxRixPQUFPLEVBQUUsT0FBTztZQUNoQixPQUFPLEVBQUU7Z0JBQ0wsSUFBSSxFQUFFLDRCQUE0QjtnQkFDbEMsR0FBRyxFQUFFLDhCQUE4QjtnQkFDbkMsS0FBSyxFQUFFLHFCQUFxQjthQUMvQjtTQUNKO1FBQ0QsSUFBSSxFQUFFLFlBQUk7UUFDVixPQUFPLEVBQUUsZ0JBQVEsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDO1FBQ3BELFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO1FBQzlCLFFBQVEsRUFBRSxDQUFDLGtCQUFrQixDQUFDO0tBQ2pDO0lBRUQsWUFBWSxFQUFFLElBQUk7Q0FDckIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEhPU1QsIE5PREVfRU5WIH0gZnJvbSAnQHV0aWwnO1xuaW1wb3J0IHsgRmFzdGlmeUR5bmFtaWNTd2FnZ2VyT3B0aW9ucyB9IGZyb20gJ0BmYXN0aWZ5L3N3YWdnZXInO1xuXG5leHBvcnQgY29uc3Qgc3dhZ2dlcl9jb25maWc6IEZhc3RpZnlEeW5hbWljU3dhZ2dlck9wdGlvbnMgPSB7XG4gICAgLy9yb3V0ZVByZWZpeDogYCR7UFJFRklYfS9kb2NzYCxcbiAgICBzd2FnZ2VyOiB7XG4gICAgICAgIGluZm86IHtcbiAgICAgICAgICAgIHRpdGxlOiAnTWljcm9zZXJ2aWNlIFRlbXBsYXRlJyxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnRXN0ZSBtaWNyb3NlcnZpY2lvIHNlIGVuY2FyZ2EgZGUgZ3VhcmRhciBsYSBjb25maWd1cmFjacOzbiBpbmljaWFsIEZpcmVzdG9yZScsXG4gICAgICAgICAgICB2ZXJzaW9uOiAnMC4xLjAnLFxuICAgICAgICAgICAgY29udGFjdDoge1xuICAgICAgICAgICAgICAgIG5hbWU6ICdDb29yZGluYWRvcmEgTWVyY2FudGlsIFMuQScsXG4gICAgICAgICAgICAgICAgdXJsOiAnaHR0cDovL3d3dy5jb29yZGluYWRvcmEuY29tLycsXG4gICAgICAgICAgICAgICAgZW1haWw6ICdpdEBjb29yZGluYWRvcmEuY29tJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIGhvc3Q6IEhPU1QsXG4gICAgICAgIHNjaGVtZXM6IE5PREVfRU5WID09PSAnbG9jYWwnID8gWydodHRwJ10gOiBbJ2h0dHBzJ10sXG4gICAgICAgIGNvbnN1bWVzOiBbJ2FwcGxpY2F0aW9uL2pzb24nXSxcbiAgICAgICAgcHJvZHVjZXM6IFsnYXBwbGljYXRpb24vanNvbiddLFxuICAgIH0sXG4gICAgLy9leHBvc2VSb3V0ZTogdHJ1ZSxcbiAgICBoaWRlVW50YWdnZWQ6IHRydWUsXG59O1xuIl19