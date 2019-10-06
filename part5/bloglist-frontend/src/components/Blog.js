import React, { useState } from "react";
import Button from "./utility/Button";
import blogService from "../services/blogs";

const Blog = ({ blog, deleteBlog }) => {
    const [visible, setVisible] = useState(false);
    const [likes, setLikes] = useState(blog.likes);
    const increaseLikes = async () => {
        const result = await blogService.increaseLikes({ ...blog, likes });
        setLikes(result.likes);
    };
    return (
        <div className="blog">
            <p className="blog-title" onClick={() => setVisible(!visible)}>
                <b>{blog.title}</b> by {blog.author}
            </p>
            <div className={visible ? "" : "hidden"}>
                <p>
                    <a href={blog.url}>{blog.url}</a>
                </p>
                <p>
                    {likes} likes{" "}
                    <Button handleClick={increaseLikes} text="like" />
                </p>
                <p className="blog-creator">added by {blog.user.name}</p>
                <Button handleClick={() => deleteBlog(blog)} text="delete" />
            </div>
        </div>
    );
};

export default Blog;
