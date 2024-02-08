import bcrypt  from 'bcrypt';

import { USER_PASSWORD_SALT_ROUNDS } from '../../constants/constants.js';

type EncryptSyncReturnType = {
    salt: string;
    hash: string;
};

class CryptService {
    public createSaltSync(): string {
        return bcrypt.genSaltSync(USER_PASSWORD_SALT_ROUNDS);
    }

    public encryptSync(data: string): EncryptSyncReturnType {
        const salt = this.createSaltSync();
        const hash = bcrypt.hashSync(data, salt);
        return { salt, hash };
    }

    public compareSyncPassword(password: string, hash: string): boolean {
        return bcrypt.compareSync(password, hash);
    }
}

export { CryptService };
