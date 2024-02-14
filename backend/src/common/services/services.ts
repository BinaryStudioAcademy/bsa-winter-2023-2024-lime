import { config } from '~/common/config/config.js';
import { JwtService } from '~/common/services/jwt/jwt.service.js';

import { CryptService } from './crypt/crypt.service.js';

const cryptService = new CryptService();
const jwtService = new JwtService(config.ENV.APP.JWT_SECRET);

export { cryptService, jwtService };
