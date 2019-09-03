import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = ({ anecdotes }) => {
    const [selected, setSelected] = useState(0);
    const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <Anecnote text={anecdotes[selected]} votes={votes[selected]} />
            <Button
                handleClick={() => {
                    const updatedVotes = [...votes];
                    updatedVotes[selected] += 1;
                    setVotes(updatedVotes);
                }}
                text="vote"
            />
            <Button
                handleClick={() => {
                    const index = Math.floor(Math.random() * anecdotes.length);
                    console.log("random number:", index);
                    setSelected(index);
                }}
                text={"next anecnote"}
            />
            <h1>Anecdote with most votes</h1>

            <Anecnote
                text={anecdotes[votes.indexOf(Math.max(...votes))]}
                votes={Math.max(...votes)}
            />
        </div>
    );
};

const Button = ({ handleClick, text }) => (
    <button onClick={handleClick}>{text}</button>
);

const Anecnote = ({ text, votes }) => (
    <div>
        <p>{text}</p>
        <p>has {votes} votes</p>
    </div>
);

const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it."
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
