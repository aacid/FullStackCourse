const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const initialBlogs = require("./test_data").multipleBlogsInList;

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
    const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);
    expect(response.body.length).toBe(initialBlogs.length);
});

test("blog has id", async () => {
    const respone = await api.get("/api/blogs").expect(200);
    expect(respone.body[0].id).toBeDefined();
});

afterAll(() => {
    mongoose.connection.close();
});
