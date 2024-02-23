import { config } from '~/common/config/config.js';
import { JwtService } from '~/common/services/jwt/jwt.service.js';

import { CryptService } from './crypt/crypt.service.js';
import { EmailService } from './email/email.service.js';
import { FileService } from './file/file.service.js';

const { API_KEY, FROM } = config.ENV.EMAIL;
const { S3_REGION, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET_NAME } =
    config.ENV.AWS;

const cryptService = new CryptService();
const jwtService = new JwtService(config.ENV.APP.JWT_SECRET);
const emailService = new EmailService(API_KEY, FROM);
const fileService = new FileService({
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
    region: S3_REGION,
    bucketName: S3_BUCKET_NAME,
});

export { cryptService, emailService, fileService, jwtService };
