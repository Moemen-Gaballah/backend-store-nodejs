CREATE TABLE products (
                          id    SERIAL PRIMARY KEY,
                          name  VARCHAR(250) NOT NULL,
                          price INTEGER      NOT NULL
--                       ,
--                           user_id INTEGER NOT NULL REFERENCES users (id)

);