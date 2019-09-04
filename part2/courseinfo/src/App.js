import React from "react";
import Course from "./Course";

const App = ({ courses }) => {
    return (
        <div>
            <h1>Web development curriculum</h1>
            {courses.map(course => (
                <Course name={course.name} parts={course.parts} />
            ))}
        </div>
    );
};

export default App;
