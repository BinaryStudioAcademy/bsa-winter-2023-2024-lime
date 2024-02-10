import * as process from 'node:process';

import { JwtService } from '~/common/services/jwt/jwt.service.js';

import { CryptService } from './crypt/crypt.service.js';

const cryptService = new CryptService();
const jwtService = new JwtService(process.env.JWT_SECRET || '');

export { cryptService, jwtService };
