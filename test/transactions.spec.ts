import request from 'supertest'

import { app } from '../src/app'
import { execSync } from 'node:child_process'
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest'

describe('Transactions routes', () => {
  beforeAll(async () => {
    await app.ready() // waits all the plugins to get registers
  })

  afterAll(async () => {
    await app.close() // drop the server connection
  })

  beforeEach(async () => {
    // the execSync() allows us to run terminal commands during our tests
    execSync('npm run knex migrate:rollback --all') // we gonna undo all the migrations using the down() method
    execSync('npm run knex migrate:latest') // we gonna execute all the migrations again
    // this process ensures us that every test will have a brand new database
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
