const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
  login: async (email, password) => {
    try {
      const result = await prisma.user.findUnique({ where: { email } });
      if (!result) throw 'email belum terdaftar';
      if (result.password !== password) throw 'password tidak sesuai';

      return {
        id: result.id,
        name: result.name,
        email: result.email,
        token: 'qwerty'
      };
    } catch (err) {
      throw err;
    }
  }
};
