const { client } = require('./client');

const createUsers = async ({firstName, lastName, address, department, role, password}) => {
  const sql = `
  INSERT INTO users(
    "firstName",
    "lastName",
    address,
    department,
    role,
    password
    )
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING *;`;
  return (await client.query(sql,
    [firstName, lastName, address, department, role, password])).rows[0];
}


const readUsers = async () => {
  return (await client.query('SELECT * FROM users')).rows;
}


const updateUsers = async (parameterObj) => {
  // parameterObj = {firstName, lastName, address, department, role, password, id}
  const keys = Object.keys(parameterObj);
  const set = keys.reduce((acc, key, idx) => {
    if (key !== 'id') {
      acc += ` ${key} = $${idx + 1}`;
      return acc;
    }
  }, '');

  const values = [];
  // eslint-disable-next-line guard-for-in
  for (let key in parameterObj) {
    values.push(parameterObj[key]);
  }

  const sql = `
    UPDATE users
    SET ${set}
    WHERE id = $${keys.length + 1}
    RETURNING *;`;
  return (await client.query(sql, [...values])).rows[0];
}


const deleteUsers = async (id) => {
  const sql = `
  DELETE FROM users
  WHERE id = $1
  RETURNING *`;
  return (await client.query(sql, [id])).rows[0];
}


module.exports = {
  createUsers,
  readUsers,
  updateUsers,
  deleteUsers
}