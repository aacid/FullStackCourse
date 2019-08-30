import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    const course = "Half Stack application development";
    const parts = [
        {
            name: "Fundamentals of React",
            exercises: 10
        },
        {
            name: "Using props to pass data",
            exercises: 7
        },
        {
            name: "State of a component",
            exercises: 14
        }
    ];

    return (
        <div>
            <Header course={course} />
            <Content parts={parts} />
            <Total parts={parts} />
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
    const content = props.parts.map((part, key) => (
        <Part name={part.name} exercises={part.exercises} key={key} />
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
