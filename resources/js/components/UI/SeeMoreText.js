import React, { useState } from "react";

const SeeMoreText = props => {
    const { maxLength = 100 } = props;
    const [isExtended, setIsExtended] = useState(false);

    const handleClick = e => {
        e.preventDefault();

        setIsExtended(!isExtended);
    };

    return (
        <React.Fragment>
            {isExtended
                ? props.children
                : props.children.substring(0, maxLength)}
            {props.children.length > maxLength && (
                <a href="#" className="link-primary" onClick={handleClick}>
                    ...{isExtended ? "Esconder" : "Ver más"}
                </a>
            )}
        </React.Fragment>
    );
};

export default SeeMoreText;
