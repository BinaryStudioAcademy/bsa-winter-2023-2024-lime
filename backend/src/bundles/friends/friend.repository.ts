import { MAX_NUMBER_OF_USERS } from '~/bundles/friends/constants/constants.js';
import {
    ErrorMessage,
    HttpCode,
    HttpError,
} from '~/bundles/friends/enums/enums.js';
import { FriendEntity } from '~/bundles/friends/friend.entity.js';
import { FriendModel } from '~/bundles/friends/friend.model.js';
import { type FriendResponseDto } from '~/bundles/friends/types/types.js';
import { type UserModel } from '~/bundles/users/user.model.js';
import { DatabaseTableName } from '~/common/database/database.js';
import { type Repository } from '~/common/types/types.js';

const USER_DETAILS_GRAPH = '[userDetails]';

class FriendRepository implements Repository {
    private friendModel: typeof FriendModel;
    private userModel: typeof UserModel;

    public constructor(
        friendModel: typeof FriendModel,
        userModel: typeof UserModel,
    ) {
        this.friendModel = friendModel;
        this.userModel = userModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<FriendEntity | null> {
        const friend = await this.friendModel.query().findOne(query).execute();

        if (!friend) {
            return null;
        }

        return FriendEntity.initialize({
            ...friend,
        });
    }

    public create(): ReturnType<Repository['create']> {
        return Promise.resolve(true);
    }

    public async findAll(): Promise<FriendEntity[]> {
        const friends = await this.friendModel.query().execute();

        return friends.map((friend) => {
            return FriendEntity.initialize({
                ...friend,
            });
        });
    }

    public async findAllPotentialFollowings(
        userId: number,
        offset: string,
        limit: string,
    ): Promise<FriendResponseDto[] | null> {
        const allUsers = await this.userModel
            .query()
            .whereNot('id', userId)
            .withGraphFetched(USER_DETAILS_GRAPH);

        const friends = await this.getFollowings(
            userId,
            '0',
            MAX_NUMBER_OF_USERS,
        );
        const followingIds = friends?.map((friend) => friend.userId) || [];

        const nonFriendUsers = allUsers.filter(
            (user) => !followingIds.includes(user.id) && user.id !== userId,
        );

        const paginatedUsers = nonFriendUsers
            .slice(Number(offset), Number(offset) + Number(limit))
            .map((user) => {
                const { userDetails, id, email } = user;
                return {
                    id,
                    userId: userDetails.userId,
                    email,
                    avatarUrl: userDetails.avatarUrl,
                    username: userDetails.username,
                    fullName: userDetails.fullName,
                    dateOfBirth: userDetails.dateOfBirth,
                    weight: userDetails.weight,
                    height: userDetails.height,
                    location: userDetails.location,
                    gender: userDetails.gender,
                };
            });

        return paginatedUsers as FriendResponseDto[];
    }

    public async getFollowings(
        userId: number,
        offset: string,
        limit: string,
    ): Promise<FriendResponseDto[] | null> {
        const followings = await FriendModel.query()
            .select(`${DatabaseTableName.USERS}.email`, 'followingId')
            .where(`${DatabaseTableName.FRIENDS}.userId`, userId)
            .withGraphFetched('userDetails')
            .join(
                DatabaseTableName.USERS,
                `${DatabaseTableName.USERS}.id`,
                `${DatabaseTableName.FRIENDS}.followingId`,
            )
            .orderBy(`${DatabaseTableName.FRIENDS}.id`)
            .offset(Number(offset))
            .limit(Number(limit));

        return followings.map(({ id, userDetails, email }) => ({
            id,
            userId: userDetails.userId,
            email,
            avatarUrl: userDetails.avatarUrl,
            username: userDetails.username,
            fullName: userDetails.fullName,
            dateOfBirth: userDetails.dateOfBirth,
            weight: userDetails.weight,
            height: userDetails.height,
            location: userDetails.location,
            gender: userDetails.gender,
        })) as FriendResponseDto[];
    }

    public async addFollowing(
        id: number,
        followingId: number,
        offset: string,
    ): Promise<FriendResponseDto | null> {
        const trx = await this.userModel.startTransaction();

        const user = await this.userModel.query(trx).findById(id);
        if (!user) {
            throw new HttpError({
                message: ErrorMessage.FRIEND_NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        await user
            .$relatedQuery('friends', trx)
            .insert({ followingId })
            .returning('*')
            .first();

        const result = await this.findAllPotentialFollowings(id, offset, '1');

        await trx.commit();
        return result as unknown as FriendResponseDto;
    }

    public async removeFollowing(
        id: number,
        followingId: number,
        offset: string,
    ): Promise<FriendResponseDto | null> {
        const trx = await this.userModel.startTransaction();

        const user = await this.userModel.query(trx).findById(id);

        if (!user) {
            throw new HttpError({
                message: ErrorMessage.FRIEND_NOT_FOUND,
                status: HttpCode.NOT_FOUND,
            });
        }

        await user
            .$relatedQuery('friends', trx)
            .delete()
            .where('following_id', followingId);

        const result = await this.getFollowings(id, offset, '1');

        await trx.commit();
        return result as unknown as FriendResponseDto;
    }

    public async update(
        query: Record<string, unknown>,
        payload: Record<string, unknown>,
    ): ReturnType<Repository['update']> {
        return this.friendModel
            .query()
            .patch(payload)
            .where(query)
            .returning('*')
            .first()
            .execute();
    }

    public delete(): ReturnType<Repository['delete']> {
        return Promise.resolve(true);
    }
}

export { FriendRepository };
