const request = require('supertest');
const app = require('./app');

test('convertit 100 EUR en USD', async () => {
  const res = await request(app)
    .get('/convert')
    .query({ amount: 100, from: 'EUR', to: 'USD' });

  expect(res.statusCode).toBe(200);
  expect(res.body.success).toBe(true);
  expect(res.body.converted).toBe(108); // 100 * 1.08
});
