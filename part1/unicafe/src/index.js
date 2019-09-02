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
            <Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const Statistic = ({ text, value }) => (
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
);

const Statistics = ({ good, neutral, bad }) => {
    const sum = good + neutral + bad;
    if (sum === 0) return <p>No feedback given.</p>;
    return (
        <>
            <h2>statistics</h2>
            <table>
                <tbody>
                    <Statistic text={"good"} value={good} />
                    <Statistic text={"neutral"} value={neutral} />
                    <Statistic text={"bad"} value={bad} />
                    <Statistic text={"all"} value={sum} />
                    <Statistic text={"average"} value={(good - bad) / sum} />
                    <Statistic
                        text={"positive"}
                        value={(good / sum) * 100 + " %"}
                    />
                </tbody>
            </table>
        </>
    );
};

ReactDOM.render(<App />, document.getElementById("root"));
