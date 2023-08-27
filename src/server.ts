import fastify from 'fastify'

import { env } from './env'
import { knex } from './database'

// creates the application
const app = fastify()

// creates a GET route
app.get('/hello', async () => {
  const tables = knex('sqlite_schema').select('*')

  return tables
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server running!`)
  })
