
import { UserValidationMessage } from 'shared/build/bundles/users/users.js';
import { HttpError } from 'shared/build/framework/exceptions/http-error/http-error.exception.js';
import { HttpCode } from 'shared/build/framework/http/enums/http-code.enum.js';

import {
    type UserSignUpRequestDto,
    type UserSignUpResponseDto,
} from '~/bundles/users/types/types.js';
import { type UserService } from '~/bundles/users/user.service.js';
import { type JwtService } from '~/common/services/jwt/jwt.service.js';

class AuthService {
    private userService: UserService;
    private jwtService: JwtService;

    public constructor(userService: UserService, jwtService: JwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    public async signUp(
        userRequestDto: UserSignUpRequestDto,
    ): Promise<UserSignUpResponseDto> {
        const userByEmail = await this.userService.findByEmail(userRequestDto.email);

        if (userByEmail) {
            throw new HttpError({
                message: UserValidationMessage.EMAIL_ALREADY_TAKEN,
                status: HttpCode.BAD_REQUEST
            });
        }

        const user = await this.userService.create(userRequestDto);
        const token = this.jwtService.createToken({ userId: user.id });

        return { ...user, token };
    }
}

export { AuthService };
