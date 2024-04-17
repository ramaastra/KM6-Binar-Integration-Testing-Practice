const { login } = require('../../services/auth');

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

module.exports = {
  login: () => {
    test('test email belum terdaftar -> error', async () => {
      try {
        await login(invalidUser.email, invalidUser.password);
      } catch (err) {
        expect(err).toBe('email belum terdaftar');
      }
    });

    test('test password tidak sesuai -> error', async () => {
      try {
        await login(validUser.email, invalidUser.password);
      } catch (err) {
        expect(err).toBe('password tidak sesuai');
      }
    });

    test('test email dan password sesuai -> success', async () => {
      try {
        const result = login(validUser.email, validUser.password);

        expect(statusCode).toBe(200);
        expect(result).toHaveProperty('id');
        expect(result).toHaveProperty('name');
        expect(result).toHaveProperty('email');
        expect(result).toHaveProperty('token');
        expect(result.id).toBe(validUser.id);
        expect(result.name).toBe(validUser.name);
        expect(result.email).toBe(validUser.email);
        expect(result.token).toBe(validUser.token);
      } catch (err) {
        expect(err).toBe(err);
      }
    });
  }
};
