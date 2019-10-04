const logger = require("../utils/logger");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", "-blogs");
    response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
    try {
        const user = await User.findOne();

        if (user._id === undefined) {
            response.status(500).json({ error: "user not found" });
        }
        const blog = new Blog({
            title: request.body.title,
            likes: request.body.likes,
            url: request.body.url,
            user: user._id
        });
        const result = await blog.save();
        user.blogs = user.blogs.concat(result.id);
        await user.save();
        response.status(201).json(result);
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.delete("/:id", async (request, response, next) => {
    try {
        await Blog.findByIdAndRemove(request.params.id);
        response.status(204).end();
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.put("/:id", async (request, response, next) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(
            request.params.id,
            request.body,
            { new: true }
        );
        response.json(updatedBlog);
    } catch (exception) {
        next(exception);
    }
});

module.exports = blogsRouter;
