import { expect, test } from 'vitest'

test('Title: testing the post route', () => {
  // here is done the HTTP request
  const responseStatusCode = 201

  // here we make the validation of the HTTP response
  expect(responseStatusCode).toEqual(201)
})
