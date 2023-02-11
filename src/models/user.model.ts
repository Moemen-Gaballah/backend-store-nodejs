import bcrypt from "bcrypt";
// @ts-ignore
import client from "../config/database";
import jwt, { Secret } from "jsonwebtoken";

const { BCRYPT_PASSWORD, SALT_ROUNDS } = process.env;
const SECRET = process.env.JWT_SECRET as Secret;

export interface BaseAuthUser {
  username: string;
  email: string;
  password: string;
}

export interface User extends BaseAuthUser {
  id: number;
}

export class UserModel {
  async register(user: BaseAuthUser): Promise<User> {
    const { username, email, password } = user;

    try {
      const query =
        "INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *";
      const hash = bcrypt.hashSync(
        password + BCRYPT_PASSWORD,
        parseInt(SALT_ROUNDS as string, 10)
      );
      // @ts-ignore
      const connection = await client.connect();
      const { rows } = await connection.query(query, [username, email, hash]);

      connection.release();

      return rows[0];
    } catch (err) {
      throw new Error(`Email Already Exist ${email}`);
    }
  } // end method register

  async login(email: string, password: string): Promise<User | null> {
    try {
      const query = "SELECT * FROM users WHERE email=($1)";
      // @ts-ignore
      const connection = await client.connect();
      const { rows } = await connection.query(query, [email]);

      if (rows.length > 0) {
        const user = rows[0];

        if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
          return user;
        }
      }

      connection.release();

      return null;
    } catch (err) {
      throw new Error(`User not found`);
    }
  } // end fun login

  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const connection = await client.connect()
      const query = "SELECT * FROM users"

      const {rows} = await connection.query(query)

      connection.release()

      return rows
    } catch (err) {
      throw new Error(`some thing wrong happened`);
    }
  } // end method get all


  async show (id: number): Promise<User> {
    try {
      const query = "SELECT * FROM users WHERE id=($1)"
      // @ts-ignore
      const connection = await client.connect()
      const {rows} = await connection.query(query, [id])

      connection.release()

      return rows[0]
    } catch (err) {
      throw new Error(`User not found`)
    }
  }

  async update (id: number, username: string): Promise<User> {
    try {
      const query = "UPDATE users SET username = $1 WHERE id = $3 RETURNING *"
      // @ts-ignore
      const connection = await client.connect()
      const {rows} = await connection.query(query, [username, id])

      connection.release()

      return rows[0]
    } catch (err) {
      throw new Error(`user not found`)
    }
  } // end method update


  async destroy (id: number): Promise<boolean> {
    try {
      const query = "DELETE FROM users WHERE id=($1)"
      // @ts-ignore
      const connection = await client.connect()

      await connection.query(query, [id])

      connection.release()

      return true
    } catch (err) {
      throw new Error(`user not found or something happened`);
    }
  } // end method destroy



} // end model UserModel



export function getTokenByUser(user: User) {
  return jwt.sign({ user }, SECRET);
}
