import bcrypt from "bcrypt"
import client from "../config/database";
import jwt, {Secret} from "jsonwebtoken"

const {BCRYPT_PASSWORD, SALT_ROUNDS} = process.env
const SECRET = process.env.JWT_SECRET as Secret

export interface BaseAuthUser{
    username: string;
    email: string
    password: string;
}


export interface User extends BaseAuthUser {
    id: number;
}

export class UserModel {

    async register (user: BaseAuthUser): Promise<User> {
        const {username, email, password} = user

        try {
            const sql = "INSERT INTO users (username, email, password) VALUES($1, $2, $3) RETURNING *"
            const hash = bcrypt.hashSync(password + BCRYPT_PASSWORD, parseInt(SALT_ROUNDS as string, 10))
            const connection = await client.connect()
            const {rows} = await connection.query(sql, [username, email, hash])

            connection.release()

            return rows[0]
        } catch (err) {
            throw new Error(`Email Already Exist ${username}. ${err}`)
        }
    } // end method register

    async login (email: string, password:string): Promise<User | null> {
        try {
            const sql = "SELECT * FROM users WHERE email=($1)"
            const connection = await client.connect()
            const {rows} = await connection.query(sql, [email])

            if (rows.length > 0) {
                const user = rows[0]

                if (bcrypt.compareSync(password + BCRYPT_PASSWORD, user.password)) {
                    return user
                }
            }

            connection.release()

            return null;
        } catch (err) {
            throw new Error(`User not found ${email}. ${err}`)
        }
    } // end fun login
}


export function getTokenByUser (user: User) {
    return jwt.sign({user}, SECRET)
}