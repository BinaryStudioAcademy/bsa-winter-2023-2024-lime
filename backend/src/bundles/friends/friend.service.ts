import { type FriendEntity } from '~/bundles/friends/friend.entity.js';
import { type FriendRepository } from '~/bundles/friends/friend.repository.js';
import { HttpError } from '~/common/http/http.js';

import { type FriendResponseDto } from './types/types.js';

class FriendService {
    private friendRepository: FriendRepository;

    public constructor(friendRepository: FriendRepository) {
        this.friendRepository = friendRepository;
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
        try {
            return await this.friendRepository.findAllPotentialFollowings(
                userId,
                offset,
                limit,
            );
        } catch (error) {
            throw new Error(`Error fetching all potential friends: ${error}`);
        }
    }

    public async getFollowings(
        userId: number,
        offset: string,
        limit: string,
    ): Promise<FriendResponseDto[] | null> {
        try {
            return await this.friendRepository.getFollowings(
                userId,
                offset,
                limit,
            );
        } catch (error) {
            throw new Error(`Error fetching user's followings: ${error}`);
        }
    }

    public async addFollowing(
        id: number,
        followingId: number,
    ): Promise<FriendResponseDto | null> {
        try {
            const addedFriend = await this.friendRepository.addFollowing(
                id,
                followingId,
            );
            if (!addedFriend) {
                throw new HttpError({
                    message: 'Failed to add following',
                    status: 500,
                });
            }
            return addedFriend;
        } catch (error) {
            throw new Error(`Error occurred while adding following: ${error}`);
        }
    }

    public async removeFollowing(
        id: number,
        followingId: number,
    ): Promise<number> {
        try {
            return await this.friendRepository.removeFollowing(id, followingId);
        } catch (error) {
            throw new Error(
                `Error occurred while removing following: ${error}`,
            );
        }
    }
}

export { FriendService };
