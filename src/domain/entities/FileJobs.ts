import {FastifyRequest} from "fastify";

export interface FileJobData {
    filePath: string;
}

export interface FileUploadRequest extends FastifyRequest {
    body: {
        excelFile: {
            name: string;
            data: Buffer;
            mv: (filePath: string) => Promise<void>;
        };
    };
}
