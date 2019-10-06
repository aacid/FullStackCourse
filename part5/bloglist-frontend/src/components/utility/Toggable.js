import React, { useState } from "react";
import Button from "./Button";

const Toggable = props => {
    const [visible, setVisible] = useState(false);

    return (
        <div>
            <div className={visible ? "hidden" : ""}>
                <Button
                    handleClick={() => setVisible(!visible)}
                    text={props.buttonLabel}
                />
            </div>
            <div className={visible ? "" : "hidden"}>
                {props.children}
                <button onClick={() => setVisible(!visible)}>cancel</button>
            </div>
        </div>
    );
};

export default Toggable;
