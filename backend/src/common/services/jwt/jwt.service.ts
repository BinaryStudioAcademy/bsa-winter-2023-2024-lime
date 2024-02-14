import { type JWTPayload } from 'jose';
import { jwtVerify, SignJWT } from 'jose';

import { type JwtPayloadOptions } from '~/common/types/jwt.type.js';

class JwtService {
    private readonly secretKey: string;

    public constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    public async createToken(payload: JwtPayloadOptions): Promise<string> {
        return await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime('7d')
            .sign(new TextEncoder().encode(this.secretKey));
    }

    public async verifyToken(token: string): Promise<JWTPayload> {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(this.secretKey),
        );
        return payload;
    }
}

export { JwtService };
