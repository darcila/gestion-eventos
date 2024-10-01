import dotenv from 'dotenv';
dotenv.config();
//import { createClient } from 'redis';
import Redis from 'ioredis';
import { useAdapter } from '@type-cacheable/ioredis-adapter';
import {REDIS_HOST, REDIS_PORT} from "@util";

const client = new Redis({
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT as string)
});
export const clientAdapter = useAdapter(client);
