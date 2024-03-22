import { IDENTITY_TOKEN_ADDITIONAL } from '~/bundles/identity/identity.js';
import {
    type UserAuthResponseDto,
    type UserAuthSignInRequestDto,
    type UserAuthSignUpRequestDto,
    type UserService,
} from '~/bundles/users/users.js';
import { cryptService, jwtService } from '~/common/services/services.js';

import { notificationService } from '../notifications/notifications.js';
import {
    BonusAmount,
    UserBonusActionType,
    UserBonusTransactionType,
} from '../user-bonuses/user-bonuses.js';
import { HttpCode, HttpError, UserValidationMessage } from './enums/enums.js';
import {
    type AuthResponseDto,
    type IdentityAuthTokenDto,
} from './types/types.js';

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

        await notificationService.create({
            isRead: false,
            type: 'default',
            title: 'New achievement! 💪',
            message: 'Joining Lime 🏆',
            userId: user.id,
        });

        return { user, token };
    }

    public async signInIdentity(
        tokenRequestDto: IdentityAuthTokenDto,
    ): Promise<AuthResponseDto> {
        try {
            const { userId } = await jwtService.verifyToken(
                tokenRequestDto.token,
                IDENTITY_TOKEN_ADDITIONAL,
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
