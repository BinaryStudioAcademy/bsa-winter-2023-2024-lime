import { type JWTPayload } from 'jose';
import { jwtVerify, SignJWT } from 'jose';

import { type JwtPayloadOptions } from '~/common/types/jwt.type.js';

class JwtService {
    private readonly secretKey: string;

    public constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    public async createToken(
        payload: JwtPayloadOptions,
        time: string = '7d',
        additional: string = '',
    ): Promise<string> {
        return await new SignJWT(payload)
            .setProtectedHeader({ alg: 'HS256' })
            .setExpirationTime(time)
            .sign(new TextEncoder().encode(this.secretKey + additional));
    }

    public async verifyToken(
        token: string,
        additional: string = '',
    ): Promise<JWTPayload> {
        const { payload } = await jwtVerify(
            token,
            new TextEncoder().encode(this.secretKey + additional),
        );
        return payload;
    }
}

export { JwtService };
