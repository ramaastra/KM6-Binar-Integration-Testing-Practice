const app = require('../../app');
const request = require('supertest');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = () => {
  const name = 'John Doe';
  const email = 'john@gmail.com';
  const password = '123456';

  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  test('test email belum terdaftar -> success', async () => {
    try {
      const { statusCode, body } = await request(app)
        .post('/api/v1/users')
        .send({ name, email, password });

      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('id');
      expect(body.data).toHaveProperty('name');
      expect(body.data).toHaveProperty('email');
      expect(body.data).toHaveProperty('password');
      expect(body.data.name).toBe(name);
      expect(body.data.email).toBe(email);
      expect(body.data.password).toBe(password);
    } catch (err) {
      expect(err).toBe(err);
    }
  });

  test('test email sudah terdaftar -> error', async () => {
    try {
      const { statusCode, body } = await request(app)
        .post('/api/v1/users')
        .send({ name, email, password });

      expect(statusCode).toBe(400);
    } catch (err) {
      expect(err).toBe('email sudah dipakai');
    }
  });
};
