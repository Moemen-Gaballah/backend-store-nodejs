
CREATE TABLE users (
                       id              SERIAL PRIMARY KEY,
                       username        VARCHAR(250) NOT NULL,
                       email       VARCHAR(250) NOT NULL,
                       password VARCHAR(250) NOT NULL
);
