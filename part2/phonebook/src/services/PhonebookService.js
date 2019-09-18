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
    axios
        .delete(`${baseUrl}/${id}`)
        .catch(error => console.log("Can't delete.", error));
};

const update = person => {
    return axios
        .put(`${baseUrl}/${person.id}`, person)
        .then(response => response.data)
        .catch(error => console.log(`Can't update ${person.name}.`, error));
};

export default { getAll, create, deletePerson, update };
