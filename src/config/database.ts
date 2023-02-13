import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  POSTGRES_TEST_PORT,
  APP_ENV,
} = process.env;

let client;

if (APP_ENV === "test") {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    port: POSTGRES_TEST_PORT as unknown as number,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

if (APP_ENV === "dev") {
  client = new Pool({
    host: POSTGRES_HOST,
    port: POSTGRES_PORT as unknown as number,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
  });
}

export default client;
