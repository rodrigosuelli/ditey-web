CREATE DATABASE diteyApi;

CREATE TABLE users(
  id uuid DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  PRIMARY KEY(id)
);

CREATE TABLE texts(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255),
  content TEXT,
  user_id UUID,
  FOREIGN KEY (user_id) REFERENCES users(id)
);
