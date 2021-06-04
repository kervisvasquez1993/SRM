import React, { createContext, useEffect, useState } from "react";

export const FilterContext = createContext();

const Filter = props => {
    const [state, setState] = useState({});

    useEffect(() => {
        if (props.useRef) {
            props.useRef.current = state;
        }
        
        props.onUpdate(state);
    }, [state]);

    return (
        <FilterContext.Provider value={{ state, setState }}>
            {props.children}
        </FilterContext.Provider>
    );
};

export default Filter;
