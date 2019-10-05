import React, { useState, useEffect } from "react";
import blogsService from "./services/blogs";
import Blog from "./components/Blog";
import Login from "./components/Login";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState({});

    useEffect(() => {
        blogsService.getAll().then(blogs => setBlogs(blogs));
    }, []);

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("user");
        console.log(loggedUser);
        if (loggedUser !== null) {
            setUser(JSON.parse(loggedUser));
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
