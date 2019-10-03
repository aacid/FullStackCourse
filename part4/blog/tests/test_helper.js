const Blog = require("../models/blog");
const User = require("../models/user");

const nonExistingId = async () => {
    const blog = new Blog({
        title: "test blog",
        author: "Karol",
        url: "fake_url",
        likes: 0
    });
    await blog.save();
    await blog.remove();

    return blog._id.toString();
};

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const usersInDb = async () => {
    const users = await User.find({});
    return users;
};

module.exports = {
    nonExistingId,
    blogsInDb,
    usersInDb
};
