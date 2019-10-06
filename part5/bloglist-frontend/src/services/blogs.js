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

const deleteBlog = async blogId => {
    try {
        await axios.delete(`${baseUrl}\\${blogId}`, {
            headers: { Authorization: token }
        });
        return true;
    } catch {
        return false;
    }
};

const increaseLikes = async blogPost => {
    const updatedBlog = {
        ...blogPost,
        user: blogPost.user.id,
        likes: blogPost.likes + 1
    };

    const response = await axios.put(
        `${baseUrl}\\${blogPost.id}`,
        updatedBlog,
        { headers: { Authorization: token } }
    );
    return response.data;
};

export default { getAll, postNew, deleteBlog, setToken, increaseLikes };
