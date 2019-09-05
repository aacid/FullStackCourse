import React, { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", number: "040-123456" },
        { name: "Ada Lovelace", number: "39-44-5323523" },
        { name: "Dan Abramov", number: "12-43-234345" },
        { name: "Mary Poppendieck", number: "39-23-6423122" }
    ]);
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [search, setSearch] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        if (persons.some(p => p.name === newName)) {
            alert(`${newName} is already added.`);
        } else {
            const newPerson = { name: newName, phone: newPhone };
            const newList = persons.concat(newPerson);
            setPersons(newList);
            setNewName("");
            setNewPhone("");
        }
    };

    const handleNewName = event => {
        setNewName(event.target.value);
    };
    const handleNewPhone = event => {
        setNewPhone(event.target.value);
    };
    const handleSearch = event => {
        setSearch(event.target.value);
    };

    return (
        <div>
            <h2>Phonebook</h2>
            {"filter with"}
            <input value={search} onChange={handleSearch} />
            <h2>add a new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name: <input value={newName} onChange={handleNewName} />
                </div>
                <div>
                    phone: <input value={newPhone} onChange={handleNewPhone} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons
                .filter(person =>
                    person.name.toLowerCase().includes(search.toLowerCase())
                )
                .map(person => (
                    <Person person={person} key={person.name} />
                ))}
        </div>
    );
};

const Person = ({ person }) => {
    return (
        <p>
            {person.name} {person.phone}
        </p>
    );
};

export default App;
