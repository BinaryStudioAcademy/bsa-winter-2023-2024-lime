import {
    type FriendEntity,
    type FriendRepository,
} from '~/bundles/friends/friends.js';

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
    ): Promise<FriendResponseDto | null> {
        return await this.friendRepository.addFollowing(
            id,
            followingId,
            offset,
        );
    }

    public async removeFollowing(
        id: number,
        followingId: number,
        offset: string,
    ): Promise<FriendResponseDto | null> {
        return await this.friendRepository.removeFollowing(
            id,
            followingId,
            offset,
        );
    }
}

export { FriendService };
