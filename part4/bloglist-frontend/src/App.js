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

    if (user === null) {
        return <Login setCredentials={setUser} />;
    }
    return (
        <div>
            <h3>Blogs</h3>
            <p>{user.name} logged in.</p>
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
export default App;
