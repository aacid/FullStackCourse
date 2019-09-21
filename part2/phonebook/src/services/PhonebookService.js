import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
};

const create = person => {
    const request = axios.post(baseUrl, person);
    return request.then(response => response.data);
};

const deletePerson = id => {
    return axios.delete(`${baseUrl}/${id}`);
};

const update = person => {
    return axios
        .put(`${baseUrl}/${person.id}`, person)
        .then(response => response.data);
};

export default { getAll, create, deletePerson, update };
