const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const Blog = require("../models/blog");
const initialBlogs = require("./test_data").multipleBlogsInList;
const helper = require("./test_helper");

const api = supertest(app);

beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = initialBlogs.map(blog => new Blog(blog));
    const promiseArray = blogObjects.map(blog => blog.save());
    await Promise.all(promiseArray);
});

describe("blogs stored in database", () => {
    test("are returned as json", async () => {
        const response = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(response.body.length).toBe(initialBlogs.length);
    });

    test("have id field", async () => {
        const respone = await api
            .get("/api/blogs")
            .expect(200)
            .expect("Content-Type", /application\/json/);
        expect(respone.body[0].id).toBeDefined();
    });
});
describe("new blog is added", () => {
    test("success with 201", async () => {
        const newBlog = {
            title: "test blog",
            author: "tester",
            url: "dummy_url",
            likes: 0
        };
        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        const response = await api.get("/api/blogs");

        const titles = response.body.map(r => r.title);

        expect(response.body.length).toBe(initialBlogs.length + 1);
        expect(titles).toContain("test blog");
    });

    test("default likes is 0", async () => {
        const newBlog = {
            title: "test blog",
            author: "tester",
            url: "dummy_url"
        };
        const response = await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/);

        expect(response.body.likes).toBe(0);
    });

    test("return 400 if title or url missing", async () => {
        const newBlog = {
            author: "tester"
        };
        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(400)
            .expect("Content-Type", /application\/json/);
    });
});

describe("deletion of a blog", () => {
    test("succeeds with status code 204 if id is valid", async () => {
        const blogsAtStart = await helper.blogsInDb();
        const blogToDelete = blogsAtStart[0];

        await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

        const blogsAtEnd = await helper.blogsInDb();

        expect(blogsAtEnd.length).toBe(blogsAtStart.length - 1);

        const titles = blogsAtEnd.map(r => r.title);

        expect(titles).not.toContain(blogToDelete.title);
    });
});

afterAll(() => {
    mongoose.connection.close();
});
