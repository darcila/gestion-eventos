"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asistenteDelete = exports.asistentePatch = exports.asistentePost = exports.asistenteGet = void 0;
const services_1 = require("@application/services");
const _configuration_1 = require("@configuration");
const ajv_1 = require("ajv");
const asistenteGet = async (req, reply) => {
    const asistenteService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.AsistenteAppService);
    const identificacion = req.params.identificacion;
    const response = await asistenteService.getAsistente(identificacion);
    return reply.send(Object.assign(Object.assign({}, response), { id: req.id }));
};
exports.asistenteGet = asistenteGet;
const asistentePost = async (req, reply) => {
    try {
        const asistenteService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.AsistenteAppService);
        const response = await asistenteService.postAsistente(req.body);
        return reply.send(Object.assign(Object.assign({}, response), { id: req.id }));
    }
    catch (error) {
        if (error instanceof ajv_1.ValidationError) {
            return reply.status(400).send({
                statusCode: 400,
                error: 'Bad Request',
                message: error.message,
                details: error.validation
            });
        }
    }
};
exports.asistentePost = asistentePost;
const asistentePatch = async (req, reply) => {
    const asistenteService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.AsistenteAppService);
    const response = await asistenteService.patchAsistente(req.body);
    return reply.send(Object.assign(Object.assign({}, response), { id: req.id }));
};
exports.asistentePatch = asistentePatch;
const asistenteDelete = async (req, reply) => {
    const asistenteService = _configuration_1.DEPENDENCY_CONTAINER.get(services_1.AsistenteAppService);
    const response = asistenteService.deleteAsistente(req.params.identificacion);
    return reply.send(Object.assign(Object.assign({}, response), { id: req.id }));
};
exports.asistenteDelete = asistenteDelete;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNpc3RlbnRlUm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL2FwaS9yb3V0ZXJzL0FzaXN0ZW50ZVJvdXRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvREFBNEQ7QUFDNUQsbURBQXNEO0FBR3RELDZCQUFzQztBQUUvQixNQUFNLFlBQVksR0FBRyxLQUFLLEVBQUUsR0FBa0QsRUFBRSxLQUFtQixFQUFnQyxFQUFFO0lBQ3hJLE1BQU0sZ0JBQWdCLEdBQUcscUNBQW9CLENBQUMsR0FBRyxDQUFDLDhCQUFtQixDQUFDLENBQUM7SUFDdkUsTUFBTSxjQUFjLEdBQUcsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUM7SUFDakQsTUFBTSxRQUFRLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUM7SUFDckUsT0FBTyxLQUFLLENBQUMsSUFBSSxpQ0FBTSxRQUFRLEtBQUUsRUFBRSxFQUFFLEdBQUcsQ0FBQyxFQUFFLElBQUcsQ0FBQztBQUNuRCxDQUFDLENBQUM7QUFMVyxRQUFBLFlBQVksZ0JBS3ZCO0FBRUssTUFBTSxhQUFhLEdBQUcsS0FBSyxFQUFFLEdBQWlELEVBQUUsS0FBbUIsRUFBZ0MsRUFBRTtJQUN4SSxJQUFJLENBQUM7UUFDRCxNQUFNLGdCQUFnQixHQUFHLHFDQUFvQixDQUFDLEdBQUcsQ0FBQyw4QkFBbUIsQ0FBQyxDQUFDO1FBQ3ZFLE1BQU0sUUFBUSxHQUFHLE1BQU0sZ0JBQWdCLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRSxPQUFPLEtBQUssQ0FBQyxJQUFJLGlDQUFNLFFBQVEsS0FBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBRyxDQUFDO0lBQ25ELENBQUM7SUFBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxLQUFLLFlBQVkscUJBQWUsRUFBRSxDQUFDO1lBQ25DLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQzFCLFVBQVUsRUFBRSxHQUFHO2dCQUNmLEtBQUssRUFBRSxhQUFhO2dCQUNwQixPQUFPLEVBQUUsS0FBSyxDQUFDLE9BQU87Z0JBQ3RCLE9BQU8sRUFBRSxLQUFLLENBQUMsVUFBVTthQUM1QixDQUFDLENBQUM7UUFDUCxDQUFDO0lBQ0wsQ0FBQztBQUNMLENBQUMsQ0FBQTtBQWZZLFFBQUEsYUFBYSxpQkFlekI7QUFFTSxNQUFNLGNBQWMsR0FBRyxLQUFLLEVBQUUsR0FBa0QsRUFBRSxLQUFtQixFQUFnQyxFQUFFO0lBQzFJLE1BQU0sZ0JBQWdCLEdBQUcscUNBQW9CLENBQUMsR0FBRyxDQUFDLDhCQUFtQixDQUFDLENBQUM7SUFDdkUsTUFBTSxRQUFRLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ2pFLE9BQU8sS0FBSyxDQUFDLElBQUksaUNBQU0sUUFBUSxLQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBRSxJQUFHLENBQUM7QUFDbkQsQ0FBQyxDQUFBO0FBSlksUUFBQSxjQUFjLGtCQUkxQjtBQUVNLE1BQU0sZUFBZSxHQUFHLEtBQUssRUFBRSxHQUFrRCxFQUFFLEtBQW1CLEVBQWdDLEVBQUU7SUFDM0ksTUFBTSxnQkFBZ0IsR0FBRyxxQ0FBb0IsQ0FBQyxHQUFHLENBQUMsOEJBQW1CLENBQUMsQ0FBQztJQUN2RSxNQUFNLFFBQVEsR0FBRyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUM3RSxPQUFPLEtBQUssQ0FBQyxJQUFJLGlDQUFNLFFBQVEsS0FBRSxFQUFFLEVBQUUsR0FBRyxDQUFDLEVBQUUsSUFBRyxDQUFDO0FBQ25ELENBQUMsQ0FBQTtBQUpZLFFBQUEsZUFBZSxtQkFJM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBc2lzdGVudGVBcHBTZXJ2aWNlIH0gZnJvbSAnQGFwcGxpY2F0aW9uL3NlcnZpY2VzJztcbmltcG9ydCB7IERFUEVOREVOQ1lfQ09OVEFJTkVSIH0gZnJvbSAnQGNvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHsgRmFzdGlmeVJlcXVlc3QsIEZhc3RpZnlSZXBseSB9IGZyb20gJ2Zhc3RpZnknO1xuaW1wb3J0IHsgQXNpc3RlbnRlR2V0UGFyYW0sIEFzaXN0ZW50ZVBhdGNoUGFyYW0sIEFzaXN0ZW50ZVBvc3RQYXJhbSB9IGZyb20gXCJAZG9tYWluL2VudGl0aWVzXCI7XG5pbXBvcnQgeyBWYWxpZGF0aW9uRXJyb3IgfSBmcm9tICdhanYnO1xuXG5leHBvcnQgY29uc3QgYXNpc3RlbnRlR2V0ID0gYXN5bmMgKHJlcTogRmFzdGlmeVJlcXVlc3Q8eyBQYXJhbXM6IEFzaXN0ZW50ZUdldFBhcmFtIH0+LCByZXBseTogRmFzdGlmeVJlcGx5KTogUHJvbWlzZTxGYXN0aWZ5UmVwbHkgfCB2b2lkPiA9PiB7XG4gICAgY29uc3QgYXNpc3RlbnRlU2VydmljZSA9IERFUEVOREVOQ1lfQ09OVEFJTkVSLmdldChBc2lzdGVudGVBcHBTZXJ2aWNlKTtcbiAgICBjb25zdCBpZGVudGlmaWNhY2lvbiA9IHJlcS5wYXJhbXMuaWRlbnRpZmljYWNpb247XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhc2lzdGVudGVTZXJ2aWNlLmdldEFzaXN0ZW50ZShpZGVudGlmaWNhY2lvbik7XG4gICAgcmV0dXJuIHJlcGx5LnNlbmQoeyAuLi5yZXNwb25zZSwgaWQ6IHJlcS5pZCB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBhc2lzdGVudGVQb3N0ID0gYXN5bmMgKHJlcTogRmFzdGlmeVJlcXVlc3Q8eyBCb2R5OiBBc2lzdGVudGVQb3N0UGFyYW0gfT4sIHJlcGx5OiBGYXN0aWZ5UmVwbHkpOiBQcm9taXNlPEZhc3RpZnlSZXBseSB8IHZvaWQ+ID0+IHtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBhc2lzdGVudGVTZXJ2aWNlID0gREVQRU5ERU5DWV9DT05UQUlORVIuZ2V0KEFzaXN0ZW50ZUFwcFNlcnZpY2UpO1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGFzaXN0ZW50ZVNlcnZpY2UucG9zdEFzaXN0ZW50ZShyZXEuYm9keSk7XG4gICAgICAgIHJldHVybiByZXBseS5zZW5kKHsgLi4ucmVzcG9uc2UsIGlkOiByZXEuaWQgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgVmFsaWRhdGlvbkVycm9yKSB7IC8vIEltcG9ydGFyIFZhbGlkYXRpb25FcnJvciBkZXNkZSAnYWp2J1xuICAgICAgICAgICAgcmV0dXJuIHJlcGx5LnN0YXR1cyg0MDApLnNlbmQoe1xuICAgICAgICAgICAgICAgIHN0YXR1c0NvZGU6IDQwMCxcbiAgICAgICAgICAgICAgICBlcnJvcjogJ0JhZCBSZXF1ZXN0JyxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiBlcnJvci5tZXNzYWdlLCAvLyAgTWVuc2FqZSBkZSBlcnJvciBkZSBsYSB2YWxpZGFjacOzblxuICAgICAgICAgICAgICAgIGRldGFpbHM6IGVycm9yLnZhbGlkYXRpb24gLy8gRGV0YWxsZXMgZGUgbGEgdmFsaWRhY2nDs24gKG9wY2lvbmFsKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBhc2lzdGVudGVQYXRjaCA9IGFzeW5jIChyZXE6IEZhc3RpZnlSZXF1ZXN0PHsgQm9keTogQXNpc3RlbnRlUGF0Y2hQYXJhbSB9PiwgcmVwbHk6IEZhc3RpZnlSZXBseSk6IFByb21pc2U8RmFzdGlmeVJlcGx5IHwgdm9pZD4gPT4ge1xuICAgIGNvbnN0IGFzaXN0ZW50ZVNlcnZpY2UgPSBERVBFTkRFTkNZX0NPTlRBSU5FUi5nZXQoQXNpc3RlbnRlQXBwU2VydmljZSk7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBhc2lzdGVudGVTZXJ2aWNlLnBhdGNoQXNpc3RlbnRlKHJlcS5ib2R5KTtcbiAgICByZXR1cm4gcmVwbHkuc2VuZCh7IC4uLnJlc3BvbnNlLCBpZDogcmVxLmlkIH0pO1xufVxuXG5leHBvcnQgY29uc3QgYXNpc3RlbnRlRGVsZXRlID0gYXN5bmMgKHJlcTogRmFzdGlmeVJlcXVlc3Q8eyBQYXJhbXM6IEFzaXN0ZW50ZUdldFBhcmFtIH0+LCByZXBseTogRmFzdGlmeVJlcGx5KTogUHJvbWlzZTxGYXN0aWZ5UmVwbHkgfCB2b2lkPiA9PiB7XG4gICAgY29uc3QgYXNpc3RlbnRlU2VydmljZSA9IERFUEVOREVOQ1lfQ09OVEFJTkVSLmdldChBc2lzdGVudGVBcHBTZXJ2aWNlKTtcbiAgICBjb25zdCByZXNwb25zZSA9IGFzaXN0ZW50ZVNlcnZpY2UuZGVsZXRlQXNpc3RlbnRlKHJlcS5wYXJhbXMuaWRlbnRpZmljYWNpb24pO1xuICAgIHJldHVybiByZXBseS5zZW5kKHsgLi4ucmVzcG9uc2UsIGlkOiByZXEuaWQgfSk7XG59XG4iXX0=