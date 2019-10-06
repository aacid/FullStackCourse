import React from "react";
import PropTypes from "prop-types";

const Notification = ({ notification }) => {
    if (notification === null) {
        return null;
    }

    return (
        <div className={notification.error ? "error" : "success"}>
            {notification.message}
        </div>
    );
};

Notification.propTypes = {
    notification: PropTypes.object.isRequired
};

export default Notification;
