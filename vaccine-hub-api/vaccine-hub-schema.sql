CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    location TEXT NOT NULL,
    date TEXT NOT NULL,
    email TEXT NOT NULL 

);