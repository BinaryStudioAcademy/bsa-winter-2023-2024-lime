import {
    type UserAuthRequestDto,
    type UserAuthResponseDto,
    type UserService,
} from '~/bundles/users/users.js';
import { cryptService, jwtService } from '~/common/services/services.js';

import { ActionType, BonusAmount } from '../user-bonuses/enums/enums.js';
import { type UserBonusService } from '../user-bonuses/user-bonuses.js';
import { HttpCode, HttpError, UserValidationMessage } from './enums/enums.js';
import { type AuthResponseDto } from './types/types.js';

class AuthService {
    private userService: UserService;
    private userBonusService: UserBonusService;

    public constructor(
        userService: UserService,
        userBonusService: UserBonusService,
    ) {
        this.userService = userService;
        this.userBonusService = userBonusService;
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

        const isEqualPassword = cryptService.compareSyncPassword(
            userRequestDto.password,
            user.getPasswordHash(),
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
        referralCode: string | undefined,
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
        if (referralCode) {
            const { userId: inviterUserId } =
                await this.userService.findByReferralCode(referralCode);

            if (inviterUserId) {
                await this.userBonusService.create({
                    userId: user.id,
                    action: ActionType.REGISTERED,
                    amount: BonusAmount[ActionType.REGISTERED],
                });

                await this.userBonusService.create({
                    userId: inviterUserId,
                    action: ActionType.INVITED,
                    amount: BonusAmount[ActionType.INVITED],
                });
            }
        }

        const token = await jwtService.createToken({ userId: user.id });

        return { user, token };
    }
}

export { AuthService };
