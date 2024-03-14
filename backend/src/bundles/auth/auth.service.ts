import {
    type UserAuthResponseDto,
    type UserAuthSignInRequestDto,
    type UserAuthSignUpRequestDto,
    type UserService,
} from '~/bundles/users/users.js';
import { cryptService, jwtService } from '~/common/services/services.js';

import {
    BonusAmount,
    UserBonusActionType,
    UserBonusTransactionType,
} from '../user-bonuses/user-bonuses.js';
import { HttpCode, HttpError, UserValidationMessage } from './enums/enums.js';
import { type AuthResponseDto } from './types/types.js';

class AuthService {
    private userService: UserService;

    public constructor(userService: UserService) {
        this.userService = userService;
    }

    private async verifyLoginCredentials(
        userRequestDto: UserAuthSignInRequestDto,
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
        userRequestDto: UserAuthSignInRequestDto,
    ): Promise<AuthResponseDto> {
        const user = await this.verifyLoginCredentials(userRequestDto);
        const token = await jwtService.createToken({ userId: user.id });

        return { user, token };
    }

    public async signUp(
        userRequestDto: UserAuthSignUpRequestDto,
    ): Promise<AuthResponseDto> {
        const { referralCode, ...payload } = userRequestDto;

        const userByEmail = await this.userService.find({
            email: payload.email,
        });

        if (userByEmail) {
            throw new HttpError({
                message: UserValidationMessage.EMAIL_ALREADY_TAKEN,
                status: HttpCode.BAD_REQUEST,
            });
        }

        const inviterUser = await this.userService.findWithUserDetailsJoined({
            referralCode,
        });

        if (referralCode && !inviterUser) {
            throw new HttpError({
                message: UserValidationMessage.USER_WITH_REFERRAL_ID_NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        const user = await this.userService.create(payload);
        const token = await jwtService.createToken({ userId: user.id });

        if (referralCode && inviterUser) {
            const { id: inviterId } = inviterUser.toObject();

            await this.userService.createUserBonusTransaction({
                userId: user.id,
                actionType: UserBonusActionType.REGISTERED,
                transactionType: UserBonusTransactionType.INCOME,
                amount: BonusAmount[UserBonusActionType.REGISTERED],
            });

            await this.userService.createUserBonusTransaction({
                userId: inviterId,
                actionType: UserBonusActionType.INVITED,
                transactionType: UserBonusTransactionType.INCOME,
                amount: BonusAmount[UserBonusActionType.INVITED],
            });

            return {
                user: {
                    ...user,
                    bonusBalance: BonusAmount[UserBonusActionType.REGISTERED],
                },
                token,
            };
        }

        return { user, token };
    }
}

export { AuthService };
