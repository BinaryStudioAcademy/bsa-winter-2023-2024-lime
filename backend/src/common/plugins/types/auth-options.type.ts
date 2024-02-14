import { type ServerAppApi } from '~/common/server-application/types/types.js';
import { type JwtService } from '~/common/services/jwt/jwt.service.js';

type AuthOptions = {
    jwtService: JwtService;
    apis: ServerAppApi[];
};

export { type AuthOptions };
