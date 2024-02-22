import { type Service } from '~/common/types/service.type.js';

import { type OAuthEntity } from './oauth.entity.js';
import { type OAuthRepository } from './oauth.repository.js';
import { type ConnectionsOAuthResponseDto } from './types/types.js';

abstract class OAuthService implements Service {
    protected oAuthRepository: OAuthRepository;

    public constructor(oAuthRepository: OAuthRepository) {
        this.oAuthRepository = oAuthRepository;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<ConnectionsOAuthResponseDto | null> {
        const oAuthInfo = await this.oAuthRepository.find(query);

        return oAuthInfo ? oAuthInfo.toObject() : null;
    }

    public async findMany(
        query: Record<string, unknown>,
    ): Promise<{ items: ConnectionsOAuthResponseDto[] }> {
        const items = await this.oAuthRepository.findMany(query);

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public async findAll(): Promise<{ items: ConnectionsOAuthResponseDto[] }> {
        const items = await this.oAuthRepository.findAll();

        return {
            items: items.map((it) => it.toObject()),
        };
    }

    public abstract create(payload: unknown): Promise<unknown>;

    public update(): Promise<unknown> {
        return Promise.resolve(null);
    }

    public async delete(OAuthEntity: OAuthEntity): Promise<boolean> {
        const { id } = OAuthEntity.toObject();

        return await this.oAuthRepository.delete(id);
    }

    public tokenHasExpired(OAuthEntity: OAuthEntity): boolean {
        const oAuthObject = OAuthEntity.toObject();
        const secondsSinceEpoch = Math.round(Date.now() / 1000);

        return oAuthObject.expiresAt <= secondsSinceEpoch;
    }
}

export { OAuthService };
