import React from "react";
const Blog = ({ blog }) => {
    return (
        <div>
            <h3>{blog.title}</h3>
            <p>
                <a href={blog.url}>link</a>
            </p>
            <p>Autor: {blog.author}</p>
        </div>
    );
};

export default Blog;
