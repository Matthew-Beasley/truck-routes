var assert = require('assert');// ???
var expect = require('chai').expect;
var should = require('chai').should();
const { client } = require('../datalayer/client');

const {
  createUsers,
  readUsers,
  updateUsers,
  deleteUsers
} = require('../datalayer/index');

// move this to a test setup file?
//===== Test Setup Teardown Functions =====
const createTestAdminUser = async () => {
  const sql = `
  INSERT INTO users ("firstName", "lastName", address, department, role, password)
  VALUES ("John", "Doe", 11025 24th NE, "Operations", administrator, conbec)
  RETURNING *;`;
  return (await client.query(sql)).rows[0];
}

const getTestUsers = async () => {
  return (await client.query('SELECT * FROM users')).rows;
}

const deleteTestUsers = async () => {
  const sql = `
  DELETE FROM users
  WHERE "firstName" = 'John'`;
  await client.query(sql);
}

//===== Test Data =====
const createUserData = {
  firstName: 'John',
  lastName: 'Doe',
  address: '11025 24th NE',
  department: 'Operations',
  role: 'administrator',
  password: 'conbec'
};

//===== TESTS =====
describe('users Table Database Function Tests', () => {
  describe('createUsers Tests', () => {
    it('Should return a user object', async () => {
      const userObj = await createUsers(createUserData);
      should.exist(userObj);
      deleteTestUsers();
    });
    it('Should create a user first name', async () => {
      createUsers(createUserData);
      const user = (await getTestUsers())[0];
      user.should.have.property('firstName').equal('John');
      deleteTestUsers();
    });
    it('Should create a user last name', async () => {
      createUsers(createUserData);
      const user = (await getTestUsers())[0];
      user.should.have.property('lastName').equal('Doe');
      deleteTestUsers();
    });
    it('Should create a user address', async () => {
      createUsers(createUserData);
      const user = (await getTestUsers())[0];
      user.should.have.property('address').equal('11025 24th NE');
      deleteTestUsers();
    });
    it('Should create a user department', async () => {
      createUsers(createUserData);
      const user = (await getTestUsers())[0];
      user.should.have.property('department').equal('Operations');
      deleteTestUsers();
    });
    it('Should create a user role', async () => {
      createUsers(createUserData);
      const user = (await getTestUsers())[0];
      user.should.have.property('role').equal('administrator');
      deleteTestUsers();
    });
    it('Should create a user password', async () => {
      createUsers(createUserData);
      const user = (await getTestUsers())[0];
      user.should.have.property('password').equal('conbec');
      deleteTestUsers();
    });
  });
});

