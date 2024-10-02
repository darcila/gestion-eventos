import Bull, { Job } from 'bull';
import * as xlsx from 'xlsx';
import {EventoEntity, FileJobData} from "@domain/entities";
import {REDIS_HOST, REDIS_PORT} from "@util";
import {DEPENDENCY_CONTAINER} from "@configuration";
import {EventoInfraService} from "@infrastructure/services";

export const fileQueue = new Bull<FileJobData>('file processing', `redis://${REDIS_HOST}:${REDIS_PORT}`);

fileQueue.process(async (job: Job<FileJobData>) => {
    const eventoService = DEPENDENCY_CONTAINER.get(EventoInfraService);
    const { filePath } = job.data;
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);
    console.log(data);
    const eventos:EventoEntity[] = data.map((evento: any) => {
        return EventoEntity.fromJson(evento);
    });
    for (const evento of eventos) {
        try {
            await eventoService.guardar(evento);
        } catch (e) {
            console.error(e);
        }
    }
    return data;
});
