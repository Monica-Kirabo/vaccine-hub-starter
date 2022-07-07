CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    location TEXT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT NOW(),
    email TEXT NOT NULL 

);