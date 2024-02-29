import { config } from '~/common/config/config.js';
import { JwtService } from '~/common/services/jwt/jwt.service.js';

import { CryptService } from './crypt/crypt.service.js';
import { EmailService } from './email/email.service.js';
import { FileService } from './file/file.service.js';
import { OpenAIService } from './open-ai/open-ai.service.js';
import { StripeService } from './stripe/stripe.service.js';

const { API_KEY, FROM } = config.ENV.EMAIL;
const { JWT_SECRET, OPEN_AI_API_KEY, OPEN_AI_MODEL, TOKEN_EXPIRATION_TIME } =
    config.ENV.APP;
const { S3_REGION, S3_ACCESS_KEY, S3_SECRET_KEY, S3_BUCKET_NAME } =
    config.ENV.AWS;

const cryptService = new CryptService();
const jwtService = new JwtService(JWT_SECRET, TOKEN_EXPIRATION_TIME);
const emailService = new EmailService(API_KEY, FROM);
const stripeService = new StripeService(
    config.ENV.STRIPE.SECRET_KEY,
    config.ENV.STRIPE.WEBHOOK_SECRET,
);

const openAIService = new OpenAIService(OPEN_AI_API_KEY, OPEN_AI_MODEL);
const fileService = new FileService({
    accessKeyId: S3_ACCESS_KEY,
    secretAccessKey: S3_SECRET_KEY,
    region: S3_REGION,
    bucketName: S3_BUCKET_NAME,
});

export {
    cryptService,
    emailService,
    fileService,
    jwtService,
    openAIService,
    stripeService,
};
