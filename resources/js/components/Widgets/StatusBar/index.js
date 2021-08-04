import React from "react";

const StatusBar = ({ percentage = 0, children, className="" }) => {
    return (
        <div className={`progress-container w-100 ${className}`}>
            <div className="bar">
                <div
                    className="bar-progress"
                    style={{ width: `${percentage}%` }}
                ></div>
            </div>

            {children}
        </div>
    );
};

export default StatusBar;
