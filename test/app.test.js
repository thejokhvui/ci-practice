const test = require('node:test');
const assert = require('node:assert');
const app = require('../app');

let server;
let baseUrl;

test.before(async () => {
  await new Promise((resolve) => {
    server = app.listen(0, resolve);
  });
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(() => {
  server.close();
});

test('GET / returns message', async () => {
  const res = await fetch(`${baseUrl}/`);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { message: 'Hello from CI/CD!' });
});

test('GET /health returns ok', async () => {
  const res = await fetch(`${baseUrl}/health`);
  assert.strictEqual(res.status, 200);
  assert.deepStrictEqual(await res.json(), { status: 'ok' });
});

test('GET /db returns 503 without database', async () => {
  const res = await fetch(`${baseUrl}/db`);
  assert.strictEqual(res.status, 503);
  assert.deepStrictEqual(await res.json(), { database: 'not connected' });
});

test('unknown route returns 404', async () => {
  const res = await fetch(`${baseUrl}/nope`);
  assert.strictEqual(res.status, 404);
});
