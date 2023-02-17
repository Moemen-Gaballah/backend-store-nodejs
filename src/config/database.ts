import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_PORT,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_PORT_TEST,
  APP_ENV,
} = process.env;

let client;

if (APP_ENV === "test") {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    port: POSTGRES_PORT_TEST as unknown as number,
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
