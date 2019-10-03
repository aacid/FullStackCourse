const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const User = require("../models/user");
const helper = require("./test_helper");
const demoUsers = require("./test_data").demoUsers;

const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
    const user = new User({
        username: "root",
        passwordHash: "sekret",
        name: "administrator"
    });
    await user.save();
});

describe("add user to database", () => {
    test("ends with success", async () => {
        const usersAtStart = await helper.usersInDb();
        await api
            .post("/api/users")
            .send(demoUsers[0])
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const usersAtEnd = await helper.usersInDb();

        const usernames = usersAtEnd.map(r => r.username);

        expect(usersAtEnd.length).toBe(usersAtStart.length + 1);
        expect(usernames).toContain(demoUsers[0].username);
    });
});
