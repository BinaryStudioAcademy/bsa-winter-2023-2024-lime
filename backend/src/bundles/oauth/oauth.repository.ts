import { MINIMUM_DELETED_ROWS } from '~/common/constants/constants.js';
import { type Repository } from '~/common/types/types.js';

import { OAuthEntity } from './oauth.entity.js';
import { type OAuthModel } from './oauth.model.js';

class OAuthRepository implements Repository {
    private oAuthModel: typeof OAuthModel;

    public constructor(oAuthModel: typeof OAuthModel) {
        this.oAuthModel = oAuthModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<OAuthEntity | null> {
        const oAuthInfo = await this.oAuthModel
            .query()
            .findOne(query)
            .execute();

        return oAuthInfo ? OAuthEntity.initialize(oAuthInfo) : null;
    }

    public async findMany(
        query: Record<string, unknown>,
    ): Promise<OAuthEntity[]> {
        const oAuthConnections = await this.oAuthModel
            .query()
            .select('*')
            .where(query)
            .execute();

        return oAuthConnections.map((connection) => {
            return OAuthEntity.initialize(connection);
        });
    }

    public async findAll(): Promise<OAuthEntity[]> {
        const oAuthConnections = await this.oAuthModel.query().execute();

        return oAuthConnections.map((connection) => {
            return OAuthEntity.initialize(connection);
        });
    }

    public async create(payload: OAuthEntity): Promise<OAuthEntity> {
        const oAuthInfo = payload.toNewObject();

        const oAuthInfoEntity = await this.oAuthModel
            .query()
            .insert(oAuthInfo)
            .returning('*')
            .execute();

        return OAuthEntity.initialize(oAuthInfoEntity);
    }

    public async update(
        query: Record<string, unknown>,
        payload: Record<string, unknown>,
    ): Promise<OAuthEntity | null> {
        const updatedOAuthInfo = await this.oAuthModel
            .query()
            .patch(payload)
            .where(query)
            .returning('*')
            .first()
            .execute();

        return updatedOAuthInfo
            ? OAuthEntity.initialize(updatedOAuthInfo)
            : null;
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        const deletedRows = await this.oAuthModel.query().where(query).delete();

        return deletedRows > MINIMUM_DELETED_ROWS;
    }
}

export { OAuthRepository };
