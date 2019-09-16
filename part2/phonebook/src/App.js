import React, { useState, useEffect } from "react";
import Persons from "./components/Persons";
import NewPerson from "./components/NewPerson";
import Search from "./components/Search";
import axios from "axios";

const App = () => {
    const [persons, setPersons] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/persons").then(response => {
            setPersons(response.data);
        });
    }, []);

    const [search, setSearch] = useState("");

    const handleSearch = event => {
        setSearch(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <Search search={search} handleSearch={handleSearch} />
            <h2>add a new</h2>
            <NewPerson persons={persons} setPersons={setPersons} />
            <h2>Numbers</h2>
            <Persons persons={persons} search={search} />
        </div>
    );
};

export default App;
