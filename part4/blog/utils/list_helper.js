const dummy = blogs => {
    return 1;
};

const totalLikes = blogs => {
    return blogs
        .map(blog => blog.likes)
        .reduce((accumulator, currentValue) => accumulator + currentValue);
};

const favoriteBlog = blogs => {
    let favorite = blogs[0];
    blogs.forEach(blog => {
        if (blog.likes > favorite.likes) {
            favorite = blog;
        }
    });
    return favorite;
};

const mostBlogs = blogs => {
    let map = {};
    blogs.forEach(blog => {
        map[blog.author] = map[blog.author] + 1 || 1;
    });

    let most = { author: "dummy", blogs: 0 };

    for (let key in map) {
        if (map[key] > most.blogs) {
            most = { author: key, blogs: map[key] };
        }
    }
    return most;
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
};
