import { config } from '~/common/config/config.js';
import { JwtService } from '~/common/services/jwt/jwt.service.js';

import { CryptService } from './crypt/crypt.service.js';
import { EmailService } from './email/email.service.js';

const { API_KEY, FROM } = config.ENV.EMAIL;

const cryptService = new CryptService();
const jwtService = new JwtService(config.ENV.APP.JWT_SECRET);
const emailService = new EmailService(API_KEY, FROM);

export { cryptService, emailService, jwtService };
