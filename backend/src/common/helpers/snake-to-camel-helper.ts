import _ from 'lodash';

type PayloadType = Record<string, unknown> | Record<string, unknown>[];

const snakeToCamel = (payload: PayloadType): PayloadType => {
    let camelCaseObject = _.cloneDeep(payload);

    if (_.isArray(camelCaseObject)) {
        return _.map(camelCaseObject, snakeToCamel) as PayloadType;
    }

    camelCaseObject = _.mapKeys(camelCaseObject, (_value, key) => {
        return _.camelCase(key);
    });

    return _.mapValues(camelCaseObject, (value: PayloadType) => {
        if (_.isPlainObject(value)) {
            return snakeToCamel(value);
        }

        if (_.isArray(value)) {
            return _.map(value, snakeToCamel);
        }

        return value;
    });
};

export { snakeToCamel };
