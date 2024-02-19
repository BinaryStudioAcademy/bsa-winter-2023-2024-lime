import { type Knex } from 'knex';

async function seed(knex: Knex): Promise<void> {
    await knex('table_name').del();

    await knex('table_name').insert([
        { id: 1, colName: 'rowValue1' },
        { id: 2, colName: 'rowValue2' },
        { id: 3, colName: 'rowValue3' },
    ]);
}

export { seed };
