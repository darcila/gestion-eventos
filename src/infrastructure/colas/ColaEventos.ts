import Bull, { Job } from 'bull';
import * as xlsx from 'xlsx';
import {FileJobData} from "@domain/entities";
import {REDIS_HOST, REDIS_PORT} from "@util";
import multer from 'fastify-multer';

export const fileQueue = new Bull<FileJobData>('file processing', `redis://${REDIS_HOST}:${REDIS_PORT}`);
export const upload = multer({ dest: 'uploads/' });

fileQueue.process(async (job: Job<FileJobData>) => {
    const { filePath } = job.data;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(data);
    return data;
});
