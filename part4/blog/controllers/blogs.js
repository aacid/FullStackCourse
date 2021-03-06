const config = require("../utils/config");
const logger = require("../utils/logger");
const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", "-blogs");
    response.json(blogs);
});

blogsRouter.post("/", async (request, response, next) => {
    const body = request.body;

    try {
        const decodedToken = jwt.verify(request.token, config.SECRET);
        if (!request.token || !decodedToken.id) {
            return response
                .status(401)
                .json({ error: "token missing or invalid" });
        }

        const user = await User.findById(decodedToken.id);

        const blog = new Blog({
            title: body.title,
            likes: 0,
            author: body.author,
            url: body.url,
            user: user._id
        });
        const result = await blog.save();
        user.blogs = user.blogs.concat(result.id);
        await user.save();
        const { blogs, ...cleanUser } = user.toJSON();
        return response.status(201).json({
            ...result.toJSON(),
            user: cleanUser
        });
    } catch (exception) {
        next(exception);
    }
});

blogsRouter.delete("/:id", async (request, response, next) => {
    try {
        const decodedToken = jwt.verify(request.token, config.SECRET);
        if (!request.token || !decodedToken.id) {
            return response
                .status(401)
                .json({ error: "token missing or invalid" });
        }
        const blog = await Blog.findById(request.params.id);
        if (blog.user.toString() !== decodedToken.id.toString()) {
            return response.status(401).json({
                error: "user is not owner of the blog, can't delete."
            });
        }

        await Blog.findByIdAndDelete(request.params.id);
        const user = await User.findById(blog.user);
        console.log("before filter", user.blogs);
        user.blogs = user.blogs.filter(
            b => b._id.toString() !== blog._id.toString()
        );
        console.log("after filter", user.blogs);
        await user.save();

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
