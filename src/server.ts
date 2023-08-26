import fastify from 'fastify'
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
    port: 3333,
  })
  .then(() => {
    console.log(`Server running!`)
  })
