const userTest = require('./users');
const authTest = require('./auth');

describe('test POST /api/v1/users endpoint', userTest);
describe('test POST /api/v1/auth/login endpoint', authTest);
