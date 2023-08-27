import fastify from 'fastify'

import { env } from './env'
import { transactionsRoutes } from './routes/transactions'

// creates the application
const app = fastify()

app.register(transactionsRoutes)

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server running!`)
  })
