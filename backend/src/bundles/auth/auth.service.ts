import {
    type UserSignInRequestDto,
    type UserSignInResponseDto,
    HttpCode,
    HttpError,
    UserValidationMessage,
} from 'shared';

import {
    type UserModel,
    type UserService,
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/users.js';
import { cryptService, jwtService } from '~/common/services/services.js';

class AuthService {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    private async verifyLoginCredentials(
        userRequestDto: UserSignInRequestDto,
    ): Promise<UserModel> {
        const user = await this.userService.findByEmail(userRequestDto.email);
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
        userRequestDto: UserSignInRequestDto,
    ): Promise<UserSignInResponseDto> {
        const { email, id } = await this.verifyLoginCredentials(userRequestDto);
        const token = jwtService.createToken({ userId: id });
        return { id, email, token };
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        const userByEmail = await this.userService.findByEmail(
            userRequestDto.email,
        );

        if (userByEmail) {
            throw new HttpError({
                message: UserValidationMessage.EMAIL_ALREADY_TAKEN,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const user = await this.userService.create(userRequestDto);
        const token = jwtService.createToken({ userId: user.id });

        return { ...user, token };
    }
}

export { AuthService };
