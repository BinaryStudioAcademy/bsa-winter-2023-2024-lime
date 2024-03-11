import {
    type UserAuthRequestDto,
    type UserAuthResponseDto,
    type UserService,
} from '~/bundles/users/users.js';
import { cryptService, jwtService } from '~/common/services/services.js';

import { HttpCode, HttpError, UserValidationMessage } from './enums/enums.js';
import {
    type AuthResponseDto,
    type AuthTokenRequestDto,
} from './types/types.js';

class AuthService {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    private async verifyLoginCredentials(
        userRequestDto: UserAuthRequestDto,
    ): Promise<UserAuthResponseDto> {
        const user = await this.userService.find({
            email: userRequestDto.email,
        });

        if (!user) {
            throw new HttpError({
                message: UserValidationMessage.LOGIN_CREDENTIALS_DO_NOT_MATCH,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const userPasswordHash = user.getPasswordHash();

        if (!userPasswordHash) {
            throw new HttpError({
                message: UserValidationMessage.USER_OAUTH,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const isEqualPassword = cryptService.compareSyncPassword(
            userRequestDto.password,
            userPasswordHash,
        );

        if (!isEqualPassword) {
            throw new HttpError({
                message: UserValidationMessage.LOGIN_CREDENTIALS_DO_NOT_MATCH,
                status: HttpCode.BAD_REQUEST,
            });
        }

        return user.toObject();
    }

    public async signIn(
        userRequestDto: UserAuthRequestDto,
    ): Promise<AuthResponseDto> {
        const user = await this.verifyLoginCredentials(userRequestDto);
        const token = await jwtService.createToken({ userId: user.id });

        return { user, token };
    }

    public async signUp(
        userRequestDto: UserAuthRequestDto,
    ): Promise<AuthResponseDto> {
        const userByEmail = await this.userService.find({
            email: userRequestDto.email,
        });

        if (userByEmail) {
            throw new HttpError({
                message: UserValidationMessage.EMAIL_ALREADY_TAKEN,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const user = await this.userService.create(userRequestDto);
        const token = await jwtService.createToken({ userId: user.id });

        return { user, token };
    }

    public async authOAuthUser(
        tokenRequestDto: AuthTokenRequestDto,
    ): Promise<AuthResponseDto> {
        try {
            const { userId } = await jwtService.verifyToken(
                tokenRequestDto.token,
            );

            const userById = await this.userService.find({ id: userId });

            if (!userById) {
                throw new HttpError({
                    message: UserValidationMessage.USER_NOT_FOUND,
                    status: HttpCode.NOT_FOUND,
                });
            }
            const user = userById.toObject();
            const newToken = await jwtService.createToken({ userId: user.id });
            return { user, token: newToken };
        } catch {
            throw new HttpError({
                message: UserValidationMessage.TOKEN_INVALID,
                status: HttpCode.FORBIDDEN,
            });
        }
    }
}

export { AuthService };
