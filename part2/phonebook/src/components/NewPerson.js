import React, { useState } from "react";
import phonebookService from "../services/PhonebookService";

const NewPerson = ({ persons, setPersons }) => {
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");

    const handleNewName = event => {
        setNewName(event.target.value);
    };
    const handleNewPhone = event => {
        setNewPhone(event.target.value);
    };

    const handleSubmit = event => {
        event.preventDefault();
        if (persons.some(p => p.name === newName)) {
            alert(`${newName} is already added.`);
        } else {
            phonebookService
                .create({ name: newName, number: newPhone })
                .then(p => {
                    setPersons(persons.concat(p));
                    setNewName("");
                    setNewPhone("");
                });
        }
    };

    return (
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
    );
};

export default NewPerson;
