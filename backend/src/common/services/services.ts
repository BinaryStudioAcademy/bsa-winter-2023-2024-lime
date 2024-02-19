import { config } from '~/common/config/config.js';
import { JwtService } from '~/common/services/jwt/jwt.service.js';

import { CryptService } from './crypt/crypt.service.js';
import { EmailService } from './email/email.service.js';
import { StipeService } from './stripe/stripe.service.js';

const { API_KEY, FROM } = config.ENV.EMAIL;

const cryptService = new CryptService();
const jwtService = new JwtService(config.ENV.APP.JWT_SECRET);
const emailService = new EmailService(API_KEY, FROM);
const stripeService = new StipeService(config.ENV.STRIPE.SECRET_KEY);

export { cryptService, emailService, jwtService, stripeService };
