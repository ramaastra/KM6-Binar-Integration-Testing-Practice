const userTest = require('./users');
const authTest = require('./auth');

describe('test createUser()', userTest.createUser);
describe('test getUserById()', userTest.getUserById);
describe('test login()', authTest.login);
