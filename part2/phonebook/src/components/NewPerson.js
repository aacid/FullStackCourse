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

    const handleUpdate = person => {
        if (
            window.confirm(
                `${person.name} is already in phonebook, update old number with ${newPhone}?`
            )
        ) {
            phonebookService
                .update({ ...person, number: newPhone })
                .then(updated => {
                    setPersons(
                        persons.map(p => (p.id === updated.id ? updated : p))
                    );
                });
        }
    };

    const handleSubmit = event => {
        event.preventDefault();
        const person = persons.find(p => p.name === newName);
        if (person !== undefined) {
            handleUpdate(person);
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
