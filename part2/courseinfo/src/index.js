import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    const courses = [
        {
            name: "Half Stack application development",
            id: 1,
            parts: [
                {
                    name: "Fundamentals of React",
                    exercises: 10,
                    id: 1
                },
                {
                    name: "Using props to pass data",
                    exercises: 7,
                    id: 2
                },
                {
                    name: "State of a component",
                    exercises: 14,
                    id: 3
                },
                {
                    name: "Redux",
                    exercises: 11,
                    id: 4
                }
            ]
        },
        {
            name: "Node.js",
            id: 2,
            parts: [
                {
                    name: "Routing",
                    exercises: 3,
                    id: 1
                },
                {
                    name: "Middlewares",
                    exercises: 7,
                    id: 2
                }
            ]
        }
    ];

    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => (
                <Course name={course.name} parts={course.parts} />
            ))}
        </div>
    );
};

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

ReactDOM.render(<App />, document.getElementById("root"));
