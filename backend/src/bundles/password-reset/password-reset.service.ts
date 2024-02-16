import {
    type PasswordForgotRequestDto,
    type PasswordForgotResponseDto,
    type PasswordResetRequestDto,
    type PasswordResetResponseDto,
} from '~/bundles/password-reset/password-reset.js';
import { type UserModel, type UserService } from '~/bundles/users/users.js';
import { cryptService, jwtService } from '~/common/services/services.js';

import {
    HttpCode,
    HttpError,
    PasswordResetValidationMessage,
} from './enums/enums.js';

class PasswordResetService {
    private userService: UserService;
    public constructor(userService: UserService) {
        this.userService = userService;
    }

    public async forgotPassword(
        passwordForgotRequestDto: PasswordForgotRequestDto,
    ): Promise<PasswordForgotResponseDto> {
        const user = (await this.userService.find({
            email: passwordForgotRequestDto.email,
        })) as UserModel;

        if (!user) {
            throw new HttpError({
                message: PasswordResetValidationMessage.USER_NOT_FOUND,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const token = await jwtService.createToken(
            { userId: user.id },
            '1d',
            user.passwordHash,
        );

        const link = `http://localhost:3000/reset-password/${user.id}/${token}`;

        // await emailService.sendRestorePassword(user.email);

        return { message: link };
    }

    public async resetPassword(
        passwordResetRequestDto: PasswordResetRequestDto,
    ): Promise<PasswordResetResponseDto> {
        const user = (await this.userService.find({
            id: passwordResetRequestDto.id,
        })) as UserModel;

        if (!user) {
            throw new HttpError({
                message: PasswordResetValidationMessage.USER_NOT_FOUND,
                status: HttpCode.BAD_REQUEST,
            });
        }

        try {
            await jwtService.verifyToken(
                passwordResetRequestDto.token,
                user.passwordHash,
            );
        } catch {
            throw new HttpError({
                message: PasswordResetValidationMessage.TOKEN_EXPIRED,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const { hash } = cryptService.encryptSync(
            passwordResetRequestDto.password,
        );

        try {
            await this.userService.update(passwordResetRequestDto.id, {
                passwordHash: hash,
            });
        } catch {
            throw new HttpError({
                message: PasswordResetValidationMessage.USER_NOT_FOUND,
                status: HttpCode.INTERNAL_SERVER_ERROR,
            });
        }

        return {
            message: 'Password updated',
        };
    }
}

export { PasswordResetService };
