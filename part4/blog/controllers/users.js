const logger = require("../utils/logger");
const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
    const users = await User.find({}).populate("blogs", "-user");
    response.json(users);
});

usersRouter.post("/", async (request, response, next) => {
    try {
        const body = request.body;

        if (body.password.length < 3) {
            return response.status(400).json({
                error: "password should be at least 3 characters long."
            });
        }
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(body.password, saltRounds);

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash
        });
        const result = await user.save();
        return response.status(201).json(result);
    } catch (exception) {
        next(exception);
    }
});
module.exports = usersRouter;
