import { type Repository } from '~/common/types/types.js';

import { MINIMUM_DELETED_ROWS } from './constants/constants.js';
import { OAuthStateEntity } from './oauth-state.entity.js';
import { type OAuthStateModel } from './oauth-state.model.js';

class OAuthStateRepository implements Repository {
    private oAuthStateModel: typeof OAuthStateModel;

    public constructor(oAuthModel: typeof OAuthStateModel) {
        this.oAuthStateModel = oAuthModel;
    }

    public async find(
        query: Record<string, unknown>,
    ): Promise<OAuthStateEntity | null> {
        const oAuthState = await this.oAuthStateModel
            .query()
            .findOne(query)
            .execute();

        return oAuthState ? OAuthStateEntity.initialize(oAuthState) : null;
    }

    public async findAll(): Promise<OAuthStateEntity[]> {
        const oAuthStates = await this.oAuthStateModel.query().execute();

        return oAuthStates.map((state) => {
            return OAuthStateEntity.initialize(state);
        });
    }

    public async create(payload: OAuthStateEntity): Promise<OAuthStateEntity> {
        const oAuthState = payload.toNewObject();

        const oAuthStateEntity = await this.oAuthStateModel
            .query()
            .insert(oAuthState)
            .returning('*')
            .execute();

        return OAuthStateEntity.initialize(oAuthStateEntity);
    }

    public update(): Promise<unknown> {
        return Promise.resolve(null);
    }

    public async delete(query: Record<string, unknown>): Promise<boolean> {
        const deletedRows = await this.oAuthStateModel
            .query()
            .where(query)
            .delete();

        return deletedRows > MINIMUM_DELETED_ROWS;
    }
}

export { OAuthStateRepository };
