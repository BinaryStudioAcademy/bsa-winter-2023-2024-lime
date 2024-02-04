import bcrypt from 'bcrypt';

import { CryptService } from './crypt/crypt.service.js';

const cryptService = new CryptService(bcrypt);

export { cryptService };
