import React, { useState } from "react";

const App = () => {
    const [persons, setPersons] = useState([
        { name: "Arto Hellas", phone: "00000" }
    ]);
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");

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

    return (
        <div>
            <h2>Phonebook</h2>
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
            {persons.map(person => (
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
