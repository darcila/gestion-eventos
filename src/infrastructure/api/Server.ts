import dotenv from 'dotenv';
import 'module-alias/register';
dotenv.config();
import { application } from './Application';
import { createDependencyContainer } from '@configuration';
import {FastifyListenOptions} from "fastify";

const start = async () => {
    const port = process.env.PORT || 8080;
    try {
        const options: FastifyListenOptions = {
            host: '0.0.0.0',
            port: Number(port),
        };
        const server = await application.listen(options);
        application.swagger();
        createDependencyContainer();
        console.log(`Application running on ${server}`);
    } catch (error) {
        console.error(error);
        await application.close();
    }
};
start();
