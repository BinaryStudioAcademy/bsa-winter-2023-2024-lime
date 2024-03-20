import { type Entity } from '~/common/types/types.js';

class FriendEntity implements Entity {
    private 'followingId': number | null;

    private 'userId': number | null;

    private constructor({
        followingId,
        userId,
    }: {
        followingId: number | null;
        userId: number | null;
    }) {
        this.followingId = followingId;
        this.userId = userId;
    }

    public static initialize({
        followingId,
        userId,
    }: {
        followingId: number;
        userId: number;
    }): FriendEntity {
        return new FriendEntity({
            followingId,
            userId,
        });
    }

    public static initializeNew({
        userId,
        followingId,
    }: {
        userId?: number;
        followingId: number;
    }): FriendEntity {
        return new FriendEntity({
            followingId: followingId ?? null,
            userId: userId ?? null,
        });
    }

    public toObject(): {
        followingId: number;
        userId: number;
    } {
        return {
            followingId: this.followingId as number,
            userId: this.userId as number,
        };
    }

    public toNewObject(): {
        userId: number | null;
        followingId: number | null;
    } {
        return {
            userId: this.userId,
            followingId: this.followingId,
        };
    }
}

export { FriendEntity };
