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
