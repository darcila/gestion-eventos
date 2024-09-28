"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
require("module-alias/register");
dotenv_1.default.config();
const Application_1 = require("./Application");
const _configuration_1 = require("@configuration");
const start = async () => {
    const port = process.env.PORT || 8080;
    try {
        const options = {
            host: '0.0.0.0',
            port: Number(port),
        };
        const server = await Application_1.application.listen(options);
        Application_1.application.swagger();
        (0, _configuration_1.createDependencyContainer)();
        console.log(`Application running on ${server}`);
    }
    catch (error) {
        console.error(error);
        await Application_1.application.close();
    }
};
start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL2FwaS9TZXJ2ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsaUNBQStCO0FBQy9CLGdCQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7QUFDaEIsK0NBQTRDO0FBQzVDLG1EQUEyRDtBQUczRCxNQUFNLEtBQUssR0FBRyxLQUFLLElBQUksRUFBRTtJQUNyQixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUM7SUFDdEMsSUFBSSxDQUFDO1FBQ0QsTUFBTSxPQUFPLEdBQXlCO1lBQ2xDLElBQUksRUFBRSxTQUFTO1lBQ2YsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDckIsQ0FBQztRQUNGLE1BQU0sTUFBTSxHQUFHLE1BQU0seUJBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakQseUJBQVcsQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUN0QixJQUFBLDBDQUF5QixHQUFFLENBQUM7UUFDNUIsT0FBTyxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsTUFBTSxFQUFFLENBQUMsQ0FBQztJQUNwRCxDQUFDO0lBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNiLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDckIsTUFBTSx5QkFBVyxDQUFDLEtBQUssRUFBRSxDQUFDO0lBQzlCLENBQUM7QUFDTCxDQUFDLENBQUM7QUFDRixLQUFLLEVBQUUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBkb3RlbnYgZnJvbSAnZG90ZW52JztcbmltcG9ydCAnbW9kdWxlLWFsaWFzL3JlZ2lzdGVyJztcbmRvdGVudi5jb25maWcoKTtcbmltcG9ydCB7IGFwcGxpY2F0aW9uIH0gZnJvbSAnLi9BcHBsaWNhdGlvbic7XG5pbXBvcnQgeyBjcmVhdGVEZXBlbmRlbmN5Q29udGFpbmVyIH0gZnJvbSAnQGNvbmZpZ3VyYXRpb24nO1xuaW1wb3J0IHtGYXN0aWZ5TGlzdGVuT3B0aW9uc30gZnJvbSBcImZhc3RpZnlcIjtcblxuY29uc3Qgc3RhcnQgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcG9ydCA9IHByb2Nlc3MuZW52LlBPUlQgfHwgODA4MDtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBvcHRpb25zOiBGYXN0aWZ5TGlzdGVuT3B0aW9ucyA9IHtcbiAgICAgICAgICAgIGhvc3Q6ICcwLjAuMC4wJyxcbiAgICAgICAgICAgIHBvcnQ6IE51bWJlcihwb3J0KSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc2VydmVyID0gYXdhaXQgYXBwbGljYXRpb24ubGlzdGVuKG9wdGlvbnMpO1xuICAgICAgICBhcHBsaWNhdGlvbi5zd2FnZ2VyKCk7XG4gICAgICAgIGNyZWF0ZURlcGVuZGVuY3lDb250YWluZXIoKTtcbiAgICAgICAgY29uc29sZS5sb2coYEFwcGxpY2F0aW9uIHJ1bm5pbmcgb24gJHtzZXJ2ZXJ9YCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc29sZS5lcnJvcihlcnJvcik7XG4gICAgICAgIGF3YWl0IGFwcGxpY2F0aW9uLmNsb3NlKCk7XG4gICAgfVxufTtcbnN0YXJ0KCk7XG4iXX0=