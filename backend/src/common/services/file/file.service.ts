import crypto from 'node:crypto';

import S3 from 'aws-sdk/clients/s3.js';
import { FileValidationMessage } from 'shared';

import { HttpCode, HttpError } from '~/common/http/http.js';

import { type File,type FileServiceOptions } from './types/types.js';

class FileService {
    private s3: S3;
    private bucketName: string;

    public constructor({
        accessKeyId,
        secretAccessKey,
        region,
        bucketName,
    }: FileServiceOptions) {
        this.s3 = new S3({
            accessKeyId,
            secretAccessKey,
            region,
        });
        this.bucketName = bucketName;
    }

    public uploadFile(file: File): Promise<S3.ManagedUpload.SendData> {
        if (!file.buffer) {
            throw new HttpError({
                status: HttpCode.BAD_REQUEST,
                message: FileValidationMessage.BUFFER_INCORRECT,
            });
        }

        const parameters = {
            Bucket: this.bucketName,
            Key: crypto.randomUUID(),
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        return this.s3.upload(parameters).promise();
    }

    public getFileStream(fileName: string): NodeJS.ReadableStream {
        const parameters = {
            Bucket: this.bucketName,
            Key: fileName,
        };
        return this.s3.getObject(parameters).createReadStream();
    }
}

export { FileService };
