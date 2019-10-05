import React, { useState } from "react";
import loginService from "../services/login";
import blogService from "../services/blogs";

const Login = ({ setUser, displayNotification }) => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async event => {
        event.preventDefault();
        try {
            const user = await loginService.login({ username, password });
            window.localStorage.setItem("user", JSON.stringify(user));
            blogService.setToken(user.token);
            setUsername("");
            setPassword("");
            setUser(user);
        } catch (error) {
            displayNotification({
                message: error.response.data.error,
                error: true
            });
        }
    };
    return (
        <div>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    );
};

export default Login;
