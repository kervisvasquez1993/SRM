import React from "react";
import { CgClose } from "react-icons/cg";
import { GiCheckMark } from "react-icons/gi";

const StatusIcon = ({index, state, description = ""}) => {
    return (
        <div
            className={`progress-status progress-warning ${state > index &&
                "completed"} ${state === index ? "current" : ""}`}
        >
            <GiCheckMark className="icon-done" />
            <CgClose className="icon-not-done" />
            <p>{description}</p>
        </div>
    );
};

export default StatusIcon;
