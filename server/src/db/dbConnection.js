const pool = require('./pool');

pool.on('connect', () => {
  console.log('connected to the db');
});

const createUsersTable = () => {
  const userCreateQuery = `
  CREATE TABLE IF NOT EXISTS users
  (id uuid DEFAULT uuid_generate_v4() PRIMARY KEY, 
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL, 
  password VARCHAR(255) NOT NULL)`;

  pool
    .query(userCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const createTextsTable = () => {
  const textCreateQuery = `
  CREATE TABLE IF NOT EXISTS texts
  (id SERIAL PRIMARY KEY, 
  title VARCHAR(255),
  content TEXT,
  user_id UUID,
  FOREIGN KEY (user_id) REFERENCES users(id))`;

  pool
    .query(textCreateQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropUsersTable = () => {
  const usersDropQuery = 'DROP TABLE IF EXISTS users';
  pool
    .query(usersDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const dropTextsTable = () => {
  const textsDropQuery = 'DROP TABLE IF EXISTS texts';
  pool
    .query(textsDropQuery)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

/**
 * Create All Tables
 */
const createAllTables = () => {
  createUsersTable();
  createTextsTable();
};

/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUsersTable();
  dropTextsTable();
};

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

module.exports = { createAllTables, dropAllTables };

require('make-runnable');
