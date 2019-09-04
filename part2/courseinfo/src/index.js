import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    const course = {
        name: "Half Stack application development",
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
            }
        ]
    };

    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    );
};

const Header = ({ course }) => {
    return (
        <>
            <h1>{course}</h1>
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
