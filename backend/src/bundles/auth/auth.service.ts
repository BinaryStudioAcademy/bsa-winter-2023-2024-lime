import { UserValidationMessage } from 'shared';

import { type UserModel } from '~/bundles/users/user.model.js';
import { type UserService } from '~/bundles/users/user.service.js';
import {
    type UserAuthRequestDto,
    type UserAuthResponseDto,
} from '~/bundles/users/users.js';
import { HttpCode, HttpError } from '~/common/http/http.js';
import { cryptService, jwtService } from '~/common/services/services.js';

class AuthService {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    private async verifyLoginCredentials(
        userRequestDto: UserAuthRequestDto,
    ): Promise<UserModel> {
        const user = (await this.userService.find({
            email: userRequestDto.email,
        })) as UserModel;
        if (!user) {
            throw new HttpError({
                message: UserValidationMessage.LOGIN_CREDENTIALS_DO_NOT_MATCH,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const isEqualPassword = cryptService.compareSyncPassword(
            userRequestDto.password,
            user.passwordHash,
        );

        if (!isEqualPassword) {
            throw new HttpError({
                message: UserValidationMessage.LOGIN_CREDENTIALS_DO_NOT_MATCH,
                status: HttpCode.BAD_REQUEST,
            });
        }

        return user;
    }

    public async signIn(
        userRequestDto: UserAuthRequestDto,
    ): Promise<UserAuthResponseDto> {
        const { email, id } = await this.verifyLoginCredentials(userRequestDto);
        const token = await jwtService.createToken({ userId: id });
        return { id, email, token };
    }

    public async signUp(
        userRequestDto: UserAuthRequestDto,
    ): Promise<UserAuthResponseDto> {
        const userByEmail = (await this.userService.find({
            email: userRequestDto.email,
        })) as UserModel;

        if (userByEmail) {
            throw new HttpError({
                message: UserValidationMessage.EMAIL_ALREADY_TAKEN,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const user = await this.userService.create(userRequestDto);
        const token = await jwtService.createToken({ userId: user.id });

        return { ...user, token };
    }
}

export { AuthService };
