import { config } from '../config/config.js';
import { CryptService } from './crypt/crypt.service.js';
import { EmailService } from './email/email.service.js';

const { API_KEY, FROM } = config.ENV.EMAIL;

const cryptService = new CryptService();
const emailService = new EmailService(API_KEY, FROM);

export { cryptService, emailService };
