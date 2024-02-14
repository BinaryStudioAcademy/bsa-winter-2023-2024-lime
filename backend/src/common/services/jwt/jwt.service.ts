import { type JWTPayload } from 'jose';
import { jwtVerify, SignJWT } from 'jose';

import { HttpCode, HttpError } from '~/common/http/http.js';
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
        try {
            const { payload } = await jwtVerify(
                token,
                new TextEncoder().encode(this.secretKey),
            );
            return payload;
        } catch (error) {
            throw new HttpError({
                status: HttpCode.UNAUTHORIZED,
                message: (error as Error).message,
            });
        }
    }
}

export { JwtService };
