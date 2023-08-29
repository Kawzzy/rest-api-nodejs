import request from 'supertest'

import { app } from '../src/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready() // waits all the plugins to get registers
  })

  afterAll(async () => {
    await app.close() // drop the server connection
  })

  // to create a test, we can either use test() or it()
  it('should create a new transaction', async () => {
    await request(app.server)
      .post('/transactions')
      .send({
        title: 'Transaction test',
        amount: 270,
        type: 'credit',
      })
      .expect(201)
  })

  it('should list all the transactions', async () => {
    const createTransactionResponse = await request(app.server)
      .post('/transactions')
      .send({
        title: 'Transaction test',
        amount: 270,
        type: 'credit',
      })

    const cookie = createTransactionResponse.get('Set-Cookie')

    const listTransactionsResponse = await request(app.server)
      .get('/transactions')
      .set('Cookie', cookie)
      .expect(200)

    expect(listTransactionsResponse.body.transactions).toEqual([
      expect.objectContaining({
        title: 'Transaction test',
        amount: 270,
      }),
    ])
  })
})
