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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};
