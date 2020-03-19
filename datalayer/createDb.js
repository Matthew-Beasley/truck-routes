const { client } = require('./client');

const createDb = async () => {
  const sql = `
  CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
  DROP TABLE IF EXISTS users;

  CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "firstName" VARCHAR(100) NOT NULL CHECK(char_length("firstName") > 0),
    "lastName" VARCHAR(100) NOT NULL CHECK(char_length("lastName") > 0),
    address VARCHAR(255),
    department VARCHAR(50),
    role VARCHAR(50) DEFAULT user NOT NULL CHECK(char_length(role) > 0),
    password VARCHAR(50) NOT NULL CHECK(char_length(password) > 0) 
  );`;
  await client.query(sql);
}

createDb();

module.exports = { createDb };
