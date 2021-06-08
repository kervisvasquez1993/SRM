import React, { createContext, useState } from "react";

export const FilterGroupContext = createContext();

const FilterGroup = props => {
    const [value] = useState({
        ...props
    });

    return (
        <FilterGroupContext.Provider value={value}>
            <div className={props.className || "col"}>
                <div className="h3">{props.text}</div>
                <div>{props.children}</div>
            </div>
        </FilterGroupContext.Provider>
    );
};

export default FilterGroup;
