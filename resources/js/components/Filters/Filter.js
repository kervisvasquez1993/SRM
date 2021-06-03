import React, { createContext, useEffect, useState } from "react";

export const FilterContext = createContext();

const Filter = props => {
    const [state, setState] = useState({});

    useEffect(() => {
        props.onUpdate(state);
    }, [state]);

    return (
        <FilterContext.Provider value={{ state, setState }}>
            {props.children}
        </FilterContext.Provider>
    );
};

export default Filter;
