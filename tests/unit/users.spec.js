const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { createUser, getUserById } = require('../../services/users');

const testUser = {
  name: 'John',
  email: 'john@gmail.com',
  password: 'qweasd'
};

describe('test createUser()', () => {
  beforeAll(async () => {
    await prisma.user.deleteMany();
  });

  test('test email belum terdaftar -> sukses', async () => {
    try {
      let result = await createUser(
        testUser.name,
        testUser.email,
        testUser.password
      );
      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('password');
      expect(result.name).toBe(testUser.name);
      expect(result.email).toBe(testUser.email);
      expect(result.password).toBe(testUser.password);
    } catch (err) {
      expect(err).toBe('error');
    }
  });

  test('test email sudah terdaftar -> error', async () => {
    try {
      await createUser(testUser.name, testUser.email, testUser.password);
    } catch (err) {
      expect(err).toBe('email sudah dipakai');
    }
  });
});

describe('test getUserById()', () => {
  test('test cari user dengan id yang sudah terdaftar -> sukses', async () => {
    try {
      const result = await getUserById(1);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('name');
      expect(result).toHaveProperty('email');
      expect(result).toHaveProperty('password');
      expect(result.name).toBe(testUser.name);
      expect(result.email).toBe(testUser.email);
      expect(result.password).toBe(testUser.password);
    } catch (err) {
      expect(err).toBe(err);
    }
  });

  test('test cari user dengan id tidak terdaftar -> error', async () => {
    try {
      await getUserById(-1);
    } catch (err) {
      expect(err).toBe('id tidak terdaftar');
    }
  });
});
