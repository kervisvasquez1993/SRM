import React, { useContext, useEffect } from "react";
import { FilterContext } from "./Filter";
import { FilterGroupContext } from "./FilterGroup";

const CheckboxFilter = ({ id, text, defaultValue }) => {
    const { state, setState } = useContext(FilterContext);
    const { name } = useContext(FilterGroupContext);

    useEffect(() => {
        setState(state => {
            const newState = { ...state };

            if (!(name in newState)) {
                newState[name] = {};
            }

            newState[name][id] = true;

            return newState;
        });
    }, []);

    const handleChange = e => {
        const target = e.target;

        setState(state => {
            const newState = { ...state };
            newState[name][target.id] = target.checked;
            return newState;
        });
    };

    return (
        <div className="form-check form-check-inline p-1">
            <label className="form-check-label" htmlFor={id}>
                <input
                    className="form-check-input"
                    type="checkbox"
                    name={id}
                    id={id}
                    checked={name in state ? state[name][id] : false}
                    onChange={handleChange}
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
