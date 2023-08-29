import request from 'supertest'

import { app } from '../src/app'
import { afterAll, beforeAll, describe, test } from 'vitest'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready() // waits all the plugins to get registers
  })

  afterAll(async () => {
    await app.close() // drop the server connection
  })

  // to create a test, we can either use test() or it()
  test('User can create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'Transaction test',
        amount: 270,
        type: 'credit',
      })
      .expect(201)
  })
})
