import jwt from 'jsonwebtoken';

import { type JwtPayload } from '~/common/types/jwt.type.js';

class JwtService {
    private readonly secretKey: string;

    public constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    public createToken(payload: JwtPayload): string {
        return jwt.sign(payload, this.secretKey, {
            expiresIn: '7d',
        });
    }

    public verifyToken(token: string): string | object {
        return jwt.verify(token, this.secretKey);
    }
}

export { JwtService };
