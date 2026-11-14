import assert from 'node:assert/strict'
import { test } from 'node:test'
import { v4, validate, version } from 'uuid'

test('live-image request IDs stay unique UUID v4 strings with global Web Crypto', () => {
  assert.equal(typeof globalThis.crypto.getRandomValues, 'function')
  const ids = Array.from({ length: 1000 }, () => v4())
  assert.equal(new Set(ids).size, ids.length)
  for (const id of ids) {
    assert.equal(validate(id), true)
    assert.equal(version(id), 4)
  }
})
