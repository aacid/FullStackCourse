import React, { useState } from "react";
import blogService from "../services/blogs";

const NewBlog = ({ displayNotification }) => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [url, setUrl] = useState("");

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await blogService.postNew({ title, author, url });
            displayNotification({
                message: `new blog ${title} by ${author} added.`
            });
        } catch (error) {
            displayNotification({
                message: error.response.data.error,
                error: true
            });
        }
    };
    return (
        <div>
            <h3>create new</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="Password"
                        onChange={({ target }) => setUrl(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default NewBlog;
