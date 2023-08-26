import { knex as SetupKnex } from 'knex'

export const knex = SetupKnex({
  client: 'sqlite',
  connection: {
    filename: './tmp/app.db',
  },
})
