import { type JwtService } from '~/common/services/jwt/jwt.service.js';

type AuthPluginOptions = {
    jwtService: JwtService;
    excludedRoutes?: string[];
};

export { type AuthPluginOptions };
