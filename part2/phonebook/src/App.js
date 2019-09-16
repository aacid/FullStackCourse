import React, { useState } from "react";
import Persons from "./components/Persons";
import NewPerson from "./components/NewPerson";
import Search from "./components/Search";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" }
    ]);

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
