import { type JwtService } from '~/common/services/jwt/jwt.service.js';

type AuthPluginOptions = {
    jwtService: JwtService;
    whitelistedRoutes: string[];
};

export { type AuthPluginOptions };
