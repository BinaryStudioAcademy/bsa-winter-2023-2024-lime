import { config } from '~/common/config/config.js';
import { JwtService } from '~/common/services/jwt/jwt.service.js';

import { CryptService } from './crypt/crypt.service.js';
import { EmailService } from './email/email.service.js';
import { OpenAIService } from './open-ai/open-ai.service.js';

const { API_KEY, FROM } = config.ENV.EMAIL;
const { JWT_SECRET, OPEN_AI_API_KEY, OPEN_AI_MODEL } = config.ENV.APP;

const cryptService = new CryptService();
const jwtService = new JwtService(JWT_SECRET);
const emailService = new EmailService(API_KEY, FROM);
const openAIService = new OpenAIService(OPEN_AI_API_KEY, OPEN_AI_MODEL);

export { cryptService, emailService, jwtService, openAIService };
