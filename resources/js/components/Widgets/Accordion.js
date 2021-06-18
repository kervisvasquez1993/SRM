import React, { useState } from "react";

const Accordion = ({
    children,
    title,
    defaultState = "closed",
    className = "card my-2",
    headerClassName = "card-header p-0",
    bodyClassName = "card-body"
}) => {
    const [isOpen, setIsOpen] = useState(defaultState === "open" && true);

    return (
        <div className={className}>
            <div className={headerClassName}>
                <button
                    className="btn btn-link py-1"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <h3 className="mb-0 card-title h4">
                        {title}
                        {isOpen ? (
                            <span className="material-icons md-36">
                                expand_less
                            </span>
                        ) : (
                            <span className="material-icons md-36">
                                expand_more
                            </span>
                        )}
                    </h3>
                </button>
            </div>

            <div className={`collapse ${isOpen ? "show" : ""}`}>
                <div className={bodyClassName}>{children}</div>
            </div>
        </div>
    );
};

export default Accordion;
