import { config } from '~/common/config/config.js';
import { JwtService } from '~/common/services/jwt/jwt.service.js';

import { CryptService } from './crypt/crypt.service.js';
import { EmailService } from './email/email.service.js';
import { OpenAIService } from './open-ai/open-ai.service.js';

const { API_KEY, FROM } = config.ENV.EMAIL;

const cryptService = new CryptService();
const jwtService = new JwtService(config.ENV.APP.JWT_SECRET);
const emailService = new EmailService(API_KEY, FROM);
const openAIService = new OpenAIService(config.ENV.APP.OPEN_AI_API_KEY);

export { cryptService, emailService, jwtService, openAIService };
