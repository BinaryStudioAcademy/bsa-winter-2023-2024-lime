import {
    type FriendEntity,
    type FriendRepository,
} from '~/bundles/friends/friends.js';
import { type NotificationService } from '~/bundles/notifications/notification.service.js';
import { type UserService } from '~/bundles/users/user.service.js';

import { type FriendResponseDto } from './types/types.js';

class FriendService {
    private friendRepository: FriendRepository;
    private userService: UserService;
    private notificationService: NotificationService;

    public constructor(
        friendRepository: FriendRepository,
        userService: UserService,
        notificationService: NotificationService,
    ) {
        this.friendRepository = friendRepository;
        this.userService = userService;
        this.notificationService = notificationService;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<FriendEntity | null> {
        return await this.friendRepository.find(query);
    }

    public async findAll(): Promise<FriendEntity[]> {
        return await this.friendRepository.findAll();
    }

    public async findAllPotentialFollowings(
        userId: number,
        offset: string,
        limit: string,
    ): Promise<FriendResponseDto[] | null> {
        return await this.friendRepository.findAllPotentialFollowings(
            userId,
            offset,
            limit,
        );
    }

    public async getFollowings(
        userId: number,
        offset: string,
        limit: string,
    ): Promise<FriendResponseDto[] | null> {
        return await this.friendRepository.getFollowings(userId, offset, limit);
    }

    public async addFollowing(
        id: number,
        followingId: number,
        offset: string,
    ): Promise<FriendResponseDto[] | null> {
        const result = await this.friendRepository.addFollowing(
            id,
            followingId,
            offset,
        );
        if (result) {
            const followingUser = await this.userService.find({
                id: id,
            });
            if (followingUser) {
                const newFollower = followingUser.toObject();
                await this.notificationService.create({
                    userId: followingId,
                    title: 'New Follower',
                    message: `${newFollower.username ?? newFollower.fullName ?? newFollower.email} started following you.`,
                    isRead: false,
                    type: 'default',
                });
            }
        }
        return result;
    }

    public async removeFollowing(
        id: number,
        followingId: number,
        offset: string,
    ): Promise<FriendResponseDto[] | null> {
        return await this.friendRepository.removeFollowing(
            id,
            followingId,
            offset,
        );
    }

    public async getFollowers(
        userId: number,
        offset: string,
        limit: string,
    ): Promise<FriendResponseDto[] | null> {
        return await this.friendRepository.getFollowers(userId, offset, limit);
    }
}

export { FriendService };
