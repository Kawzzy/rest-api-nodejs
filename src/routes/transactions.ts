import { knex } from '../database'
import { FastifyInstance } from 'fastify'

export async function transactionsRoutes(app: FastifyInstance) {
  // creates a GET route
  app.get('/hello', async () => {
    const tables = knex('sqlite_schema').select('*')

    return tables
  })
}
