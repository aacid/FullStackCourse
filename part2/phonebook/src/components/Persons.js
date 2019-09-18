import React from "react";

const Persons = ({ persons, search }) => {
    if (persons.length === 0) {
        return <div>Nothing in phonebook so far.</div>;
    } else
        return persons
            .filter(person =>
                person.name.toLowerCase().includes(search.toLowerCase())
            )
            .map(person => <Person person={person} key={person.name} />);
};

const Person = ({ person }) => {
    return (
        <p>
            {person.name} {person.number}
        </p>
    );
};

export default Persons;
