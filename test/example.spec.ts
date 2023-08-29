import request from 'supertest'

import { app } from '../src/app'
import { afterAll, beforeAll, test } from 'vitest'

beforeAll(async () => {
  await app.ready() // waits all the plugins to get registers
})

afterAll(async () => {
  await app.close() // drop the server connection
})

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
