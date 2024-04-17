const app = require('../../app');
const request = require('supertest');

module.exports = () => {
  const validUser = {
    name: 'John Doe',
    email: 'john@gmail.com',
    password: '123456',
    token: 'qwerty'
  };

  const invalidUser = {
    email: 'user@gmail.com',
    password: 'password'
  };

  test('test email belum terdaftar -> error', async () => {
    try {
      const { statusCode, body } = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: invalidUser.email, password: invalidUser.password });

      expect(statusCode).toBe(400);
    } catch (err) {
      expect(err).toBe('email belum terdaftar');
    }
  });

  test('test password tidak sesuai -> error', async () => {
    try {
      let { statusCode, body } = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: validUser.email, password: invalidUser.password });

      expect(statusCode).toBe(400);
    } catch (err) {
      expect(err).toBe('password tidak sesuai');
    }
  });

  test('test email dan password sesuai -> success', async () => {
    try {
      const { statusCode, body } = await request(app)
        .post('/api/v1/auth/login')
        .send({ email: validUser.email, password: validUser.password });

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('status');
      expect(body).toHaveProperty('message');
      expect(body).toHaveProperty('data');
      expect(body.data).toHaveProperty('id');
      expect(body.data).toHaveProperty('name');
      expect(body.data).toHaveProperty('email');
      expect(body.data).toHaveProperty('token');
      expect(body.data.id).toBe(validUser.id);
      expect(body.data.name).toBe(validUser.name);
      expect(body.data.email).toBe(validUser.email);
      expect(body.data.token).toBe(validUser.token);
    } catch (err) {
      expect(err).toBe(err);
    }
  });
};
