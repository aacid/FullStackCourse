import React, { useState } from "react";
import Button from "./utility/Button";
const Blog = ({ blog }) => {
    const [visible, setVisible] = useState(false);
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
                    {blog.likes} likes <Button handleClick={null} text="like" />
                </p>
                <p className="blog-creator">added by {blog.user.name}</p>
            </div>
        </div>
    );
};

export default Blog;
