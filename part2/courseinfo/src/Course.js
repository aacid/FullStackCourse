import React from "react";

const Course = ({ name, parts }) => {
    return (
        <div>
            <Header course={name} />
            <Content parts={parts} />
            <Total parts={parts} />
        </div>
    );
};

const Header = ({ course }) => {
    return (
        <>
            <h2>{course}</h2>
        </>
    );
};

const Content = ({ parts }) => {
    const content = parts.map(part => (
        <Part name={part.name} exercises={part.exercises} key={part.id} />
    ));
    return content;
};

const Part = ({ name, exercises }) => {
    return (
        <p>
            {name} {exercises}
        </p>
    );
};

const Total = ({ parts }) => {
    return (
        <>
            <p>
                <b>
                    {"total number of " +
                        parts
                            .map(part => part.exercises)
                            .reduce((sum, val) => sum + val) +
                        " exercises"}
                </b>
            </p>
        </>
    );
};

export default Course;
