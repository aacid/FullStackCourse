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

const Header = props => {
    return (
        <>
            <h1>{props.course}</h1>
        </>
    );
};

const Content = props => {
    const content = props.parts.map(part => (
        <Part name={part.name} exercises={part.exercises} key={part.id} />
    ));
    return content;
};

const Part = props => {
    return (
        <p>
            {props.name} {props.exercises}
        </p>
    );
};

const Total = props => {
    return (
        <>
            <p>
                Number of exercises{" "}
                {props.parts
                    .map(part => part.exercises)
                    .reduce((sum, val) => sum + val)}
            </p>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
