import jwt from 'jsonwebtoken';
import { type JwtPayload } from 'jsonwebtoken';

class JwtService {
    private readonly secretKey: string;

    public constructor(secretKey: string) {
        this.secretKey = secretKey;
    }

    public createToken(payload: unknown): string {
        return jwt.sign(payload as JwtPayload, this.secretKey, {
            expiresIn: '7d',
        });
    }

    public verifyToken(token: string): string | object {
        return jwt.verify(token, this.secretKey);
    }
}

export { JwtService };
