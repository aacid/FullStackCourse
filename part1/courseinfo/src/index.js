import React from "react";
import ReactDOM from "react-dom";

const App = () => {
    const course = "Half Stack application development";
    const part1 = {
        name: "Fundamentals of React",
        exercises: 10
    };
    const part2 = {
        name: "Using props to pass data",
        exercises: 7
    };
    const part3 = {
        name: "State of a component",
        exercises: 14
    };

    return (
        <div>
            <Header course={course} />
            <Content parts={[part1, part2, part3]} />
            <Total
                number={part1.exercises + part2.exercises + part3.exercises}
            />
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
            <p>Number of exercises {props.number}</p>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
