import { HttpCode, HttpError } from '~/bundles/auth/enums/enums.js';
import {
    type PasswordForgotRequestDto,
    type PasswordForgotResponseDto,
    type PasswordResetRequestDto,
    type PasswordResetResponseDto,
    createPasswordResetLink,
} from '~/bundles/password-reset/password-reset.js';
import { type UserModel, type UserService } from '~/bundles/users/users.js';
import {
    cryptService,
    emailService,
    jwtService,
} from '~/common/services/services.js';

import { PasswordResetValidationMessage } from './enums/enums.js';

class PasswordResetService {
    private userService: UserService;
    public constructor(userService: UserService) {
        this.userService = userService;
    }

    public async forgotPassword(
        passwordForgotRequestDto: PasswordForgotRequestDto,
        origin: string,
    ): Promise<PasswordForgotResponseDto> {
        const user = (await this.userService.find({
            email: passwordForgotRequestDto.email,
        })) as unknown as UserModel;

        if (!user) {
            throw new HttpError({
                message: PasswordResetValidationMessage.USER_NOT_FOUND,
                status: HttpCode.BAD_REQUEST,
            });
        }

        if (user.passwordHash === null) {
            throw new HttpError({
                message: PasswordResetValidationMessage.USER_OAUTH,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const token = await jwtService.createToken(
            { userId: user.id },
            '1d',
            user.passwordHash,
        );

        const link = createPasswordResetLink({ origin, token });

        try {
            await emailService.sendRestorePassword(user.email, link);
        } catch {
            throw new HttpError({
                message: PasswordResetValidationMessage.EMAIL_NOT_SENT,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }

        return { message: 'Link for password reset was sent to your email.' };
    }

    public async resetPassword(
        passwordResetRequestDto: PasswordResetRequestDto,
    ): Promise<PasswordResetResponseDto> {
        const user = await this.userService.find({
            id: passwordResetRequestDto.id,
        });

        if (!user) {
            throw new HttpError({
                message: PasswordResetValidationMessage.USER_NOT_FOUND,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const userPasswordHash = user.getPasswordHash();

        if (!userPasswordHash) {
            throw new HttpError({
                message: PasswordResetValidationMessage.USER_OAUTH,
                status: HttpCode.BAD_REQUEST,
            });
        }

        try {
            await jwtService.verifyToken(
                passwordResetRequestDto.token,
                userPasswordHash,
            );
        } catch {
            throw new HttpError({
                message: PasswordResetValidationMessage.TOKEN_EXPIRED,
                status: HttpCode.BAD_REQUEST,
            });
        }

        if (
            passwordResetRequestDto.password !==
            passwordResetRequestDto.passwordConfirm
        ) {
            throw new HttpError({
                message: PasswordResetValidationMessage.PASSWORDS_NOT_EQUAL,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const existPassword = cryptService.compareSyncPassword(
            passwordResetRequestDto.password,
            userPasswordHash,
        );

        if (existPassword) {
            throw new HttpError({
                message: PasswordResetValidationMessage.SAME_PASSWORD,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const { hash } = cryptService.encryptSync(
            passwordResetRequestDto.password,
        );

        try {
            await this.userService.update(
                { id: passwordResetRequestDto.id },
                {
                    passwordHash: hash,
                },
            );
        } catch {
            throw new HttpError({
                message: PasswordResetValidationMessage.PASSWORD_NOT_CHANGED,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }

        return {
            message: 'Password updated',
        };
    }
}

export { PasswordResetService };
