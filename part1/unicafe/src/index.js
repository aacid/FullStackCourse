import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = () => {
    // save clicks of each button to own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h2>give feedback</h2>
            <Button handleClick={() => setGood(good + 1)} text={"good"} />
            <Button
                handleClick={() => setNeutral(neutral + 1)}
                text={"neutral"}
            />
            <Button handleClick={() => setBad(bad + 1)} text={"bad"} />
            <h2>statistics</h2>
            <Feedback text={"good"} value={good} />
            <Feedback text={"neutral"} value={neutral} />
            <Feedback text={"bad"} value={bad} />
        </div>
    );
};

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const Feedback = ({ text, value }) => (
    <p>
        {text} {value}
    </p>
);

ReactDOM.render(<App />, document.getElementById("root"));
