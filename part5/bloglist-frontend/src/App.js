import React, { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import Login from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/utility/Notification";
import Button from "./components/utility/Button";
import Toggable from "./components/utility/Toggable";

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [user, setUser] = useState({});
    const [notification, setNotification] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const blogs = await blogService.getAll();
            setBlogs(blogs.sort((a, b) => b.likes - a.likes));
        };
        fetchData();
    }, []);

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem("user");
        if (loggedUserJSON !== null) {
            const loggedUser = JSON.parse(loggedUserJSON);
            setUser(loggedUser);
            blogService.setToken(loggedUser.token);
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
                <Toggable buttonLabel="create blog">
                    <NewBlog
                        blogs={blogs}
                        setBlogs={setBlogs}
                        displayNotification={displayNotification}
                    />
                </Toggable>
                <BlogList
                    blogs={blogs}
                    setBlogs={setBlogs}
                    displayNotification={displayNotification}
                />
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

const BlogList = ({ blogs, setBlogs, displayNotification }) => {
    const deleteBlog = async blog => {
        if (window.confirm(`remove blog ${blog.title} by ${blog.author}?`)) {
            const result = await blogService.deleteBlog(blog.id);
            if (result) {
                setBlogs(blogs.filter(b => b.id !== blog.id));
                displayNotification({
                    message: `blog ${blog.title} by ${blog.author} removed.`,
                    error: false
                });
            }
        }
    };
    return (
        <div>
            {blogs.map(blog => (
                <Blog key={blog.id} blog={blog} deleteBlog={deleteBlog} />
            ))}
        </div>
    );
};

export default App;
