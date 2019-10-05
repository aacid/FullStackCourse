import React, { useState, useEffect } from "react";
import blogsService from "./services/blogs";
import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState({});
    const [notification, setNotification] = useState(null);

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

    const displayNotification = notification => {
        setNotification(notification);
        setTimeout(() => {
            setNotification(null);
        }, 5000);
    };

    const loginForm = () => {
        return (
            <Login
                setUser={setUser}
                displayNotification={displayNotification}
            />
        );
    };

    const mainPage = () => {
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
                <NewBlog displayNotification={displayNotification} />
                <BlogList blogs={blogs} />
            </div>
        );
    };
    return (
        <div>
            <Notification notification={notification} />
            {user === null && loginForm()}
            {user !== null && mainPage()}
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
