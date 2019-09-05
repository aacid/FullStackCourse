import React, { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
    const [newName, setNewName] = useState("");

    const handleSubmit = event => {
        event.preventDefault();
        const newPerson = { name: newName };
        const newList = persons.concat(newPerson);
        setPersons(newList);
        setNewName("");
    };

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    name:{" "}
                    <input
                        value={newName}
                        onChange={event => setNewName(event.target.value)}
                    />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            {persons.map(person => (
                <Person name={person.name} key={person.name} />
            ))}
        </div>
    );
};

const Person = ({ name }) => {
    return <p>{name}</p>;
};

export default App;
