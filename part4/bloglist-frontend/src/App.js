import React, { useState, useEffect } from "react";
import blogsService from "./services/blogs";
import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const blogs = await blogsService.getAll();
            setBlogs(blogs);
        };
        fetchData();
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("user");
        if (loggedUserJSON !== null) {
            const loggedUser = JSON.parse(loggedUserJSON);
            setUser(loggedUser);
            blogsService.setToken(loggedUser.token);
        } else {
            setUser(null);
        }
    }, []);

    if (user === null) {
        return <Login setUser={setUser} />;
    }
    return (
        <div>
            <h3>Blogs</h3>
            <p>
                {user.name} logged in.{" "}
                <Button
                    handleClick={() => {
                        window.localStorage.removeItem("user");
                        setUser(null);
                    }}
                    text="logout"
                />
            </p>
            <NewBlog />
            <BlogList blogs={blogs} />
        </div>
    );
};

const BlogList = ({ blogs }) => {
    return (
        <div>
            {blogs.map(blog => (
                <Blog key={blog.id} blog={blog} />
            ))}
        </div>
    );
};

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

export default App;
