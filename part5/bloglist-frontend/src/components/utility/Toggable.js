import React, { useState } from "react";
import PropTypes from "prop-types";
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

Toggable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
};

export default Toggable;
