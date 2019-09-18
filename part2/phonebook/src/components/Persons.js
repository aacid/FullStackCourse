import React from "react";

const Persons = ({ persons, search, handleDelete }) => {
    if (persons.length === 0) {
        return <div>Nothing in phonebook so far.</div>;
    } else
        return persons
            .filter(person =>
                person.name.toLowerCase().includes(search.toLowerCase())
            )
            .map(person => (
                <Person
                    person={person}
                    handleDelete={() => handleDelete(person)}
                    key={person.name}
                />
            ));
};

const Person = ({ person, handleDelete }) => {
    return (
        <p>
            {person.name} {person.number}{" "}
            <button onClick={handleDelete}>delete</button>
        </p>
    );
};

export default Persons;
