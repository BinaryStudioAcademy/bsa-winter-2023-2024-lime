import { type JwtService } from '~/common/services/jwt/jwt.service.js';

type AuthPluginOptions = {
    jwtService: JwtService;
    protectedRoutes: string[];
};

export { type AuthPluginOptions };
