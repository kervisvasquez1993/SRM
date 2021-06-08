import React, { useContext, useEffect, useState } from "react";
import { FilterContext } from "./Filter";
import { FilterGroupContext } from "./FilterGroup";

const CheckboxFilter = ({ id, text, defaultValue = true }) => {
    const { state, setState } = useContext(FilterContext);
    const { name } = useContext(FilterGroupContext);

    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        setState(state => {
            const newState = { ...state };

            if (!(name in newState)) {
                newState[name] = {};
            }

            newState[name][id] = value;
            return newState;
        });

    }, [value])

    return (
        <div className="form-check form-check-inline p-1">
            <label className="form-check-label" htmlFor={id}>
                <input
                    className="form-check-input"
                    type="checkbox"
                    name={id}
                    id={id}
                    checked={value}
                    onChange={() => setValue(!value)}
                />

                {text}
                <span className="form-check-sign">
                    <span className="check"></span>
                </span>
            </label>
        </div>
    );
};

export default CheckboxFilter;
