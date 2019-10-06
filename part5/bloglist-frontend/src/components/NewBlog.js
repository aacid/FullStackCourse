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
                <table>
                    <tbody>
                        <tr>
                            <td>title:</td>
                            <td>
                                <input
                                    type="text"
                                    value={title}
                                    name="Title"
                                    onChange={({ target }) =>
                                        setTitle(target.value)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>author:</td>
                            <td>
                                <input
                                    type="text"
                                    value={author}
                                    name="Author"
                                    onChange={({ target }) =>
                                        setAuthor(target.value)
                                    }
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>url:</td>
                            <td>
                                <input
                                    type="text"
                                    value={url}
                                    name="Password"
                                    onChange={({ target }) =>
                                        setUrl(target.value)
                                    }
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button type="submit">create</button>
            </form>
        </div>
    );
};

export default NewBlog;
