import {BaseAuthUser, User, UserModel} from "../../models/user.model"

const userModelInstance = new UserModel()

describe("User Model", () => {
    const user: BaseAuthUser = {
        username: "moemenEssam",
        email: "moemen@gmail.com",
        password: "12345678"
    }

    async function storeUser (user: BaseAuthUser) {
        return userModelInstance.register(user)
    }

    async function destoryUser (id: number) {
        return userModelInstance.destroy(id)
    }

    it("should have an index method", () => {
        expect(userModelInstance.index).toBeDefined()
    })

    it("should have a show method", () => {
        expect(userModelInstance.show).toBeDefined()
    })

    it("should have a register method", () => {
        expect(userModelInstance.register).toBeDefined()
    })

    it("should have a remove method", () => {
        expect(userModelInstance.destroy).toBeDefined()
    })

    it("store method should register user", async () => {
        const storeUserRes: User = await storeUser(user)

        if (storeUserRes) {
            const {username, email} = storeUserRes

            expect(username).toBe(user.username)
            expect(email).toBe(user.email)
        }

        await destoryUser(storeUserRes.id)
    })

    it("index method should return a list of users", async () => {
        const storeUserRes: User = await storeUser(user)
        const userList = await userModelInstance.index()

        expect(userList).toEqual([storeUserRes])

        await destoryUser(storeUserRes.id)
    })

    it("show method should return the correct users information", async () => {
        const storeUserRes: User = await storeUser(user)
        const userFromDb = await userModelInstance.show(storeUserRes.id)

        expect(userFromDb).toEqual(storeUserRes)

        await destoryUser(storeUserRes.id)
    })

    it("delete users return object empty", async () => {
        const storeUserRes: User = await storeUser(user)

        await destoryUser(storeUserRes.id)

        const userList = await userModelInstance.index()

        expect(userList).toEqual([])
    })

    it("update method should update the user", async () => {
        const storeUserRes: User = await storeUser(user)
        const usernameData: string = "storeUser"

        const {username} = await userModelInstance.update(storeUserRes.id, usernameData)

        expect(username).toEqual(usernameData)

        await destoryUser(storeUserRes.id)
    })

    it("login user", async () => {
        const storeUserRes: User = await storeUser(user)

        const userFromDb = await userModelInstance.login(user.email, user.password)

        if (userFromDb) {
            const {username, email} = userFromDb

            expect(username).toBe(user.username)
            expect(email).toBe(user.email)
        }

        await destoryUser(storeUserRes.id)
    })
})
