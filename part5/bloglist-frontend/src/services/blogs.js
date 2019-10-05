import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = newToken => {
    token = `bearer ${newToken}`;
};

const getAll = async () => {
    const response = await axios.get(baseUrl);
    return response.data;
};

const postNew = async blogPost => {
    const response = await axios.post(baseUrl, blogPost, {
        headers: { Authorization: token }
    });
    return response.data;
};

export default { getAll, postNew, setToken };
