const listHelper = require("../utils/list_helper");
const data = require("./test_data");

test("dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe("total likes", () => {
    test("single blog should return likes of that blog", () => {
        const result = listHelper.totalLikes(data.singleBlogInList);
        expect(result).toBe(5);
    });

    test("multiple blogs should return sum of likes", () => {
        const result = listHelper.totalLikes(data.multipleBlogsInList);
        expect(result).toBe(36);
    });
});

describe("favorite blog", () => {
    test("single blog should return itself", () => {
        const result = listHelper.favoriteBlog(data.singleBlogInList);
        expect(result).toEqual(data.singleBlogInList[0]);
    });

    test("multiple blogs should return one with most likes", () => {
        const result = listHelper.favoriteBlog(data.multipleBlogsInList);
        expect(result).toEqual(data.multipleBlogsInList[2]);
    });
});

describe("author with most blogs", () => {
    test("single blog should return its author with one blog", () => {
        const result = listHelper.mostBlogs(data.singleBlogInList);
        expect(result).toEqual({
            author: data.singleBlogInList[0].author,
            blogs: 1
        });
    });

    test("multiple blogs should return author with most blogs", () => {
        const result = listHelper.mostBlogs(data.multipleBlogsInList);
        expect(result).toEqual({
            author: "Robert C. Martin",
            blogs: 3
        });
    });
});

describe("author with most likes", () => {
    test("single blog should return its author with blog likes", () => {
        const result = listHelper.mostLikes(data.singleBlogInList);
        expect(result).toEqual({
            author: data.singleBlogInList[0].author,
            likes: data.singleBlogInList[0].likes
        });
    });

    test("multiple blogs should return author with most likes", () => {
        const result = listHelper.mostLikes(data.multipleBlogsInList);
        expect(result).toEqual({
            author: "Edsger W. Dijkstra",
            likes: 17
        });
    });
});
