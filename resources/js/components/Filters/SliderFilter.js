import React, { useContext, useEffect } from "react";
import { FilterContext } from "./Filter";
import { FilterGroupContext } from "./FilterGroup";

const SliderFilter = ({ id, text, defaultValue, min, max, step, reversed }) => {
    const { state, setState } = useContext(FilterContext);
    const { name } = useContext(FilterGroupContext);

    useEffect(() => {
        setState(state => {
            const newState = { ...state };

            if (!(name in newState)) {
                newState[name] = {};
            }

            newState[name][id] = defaultValue;

            return newState;
        });
    }, []);

    const handleChange = e => {
        const target = e.target;

        setState(state => {
            const newState = { ...state };
            newState[name][target.id] = target.value;
            return newState;
        });
    };

    return (
        <div className="form-check form-check-inline p-1 d-flex align-items-center">
            <input
                type="range"
                className="form-range w-50"
                id={id}
                name={id}
                value={name in state ? state[name][id] : defaultValue}
                onChange={handleChange}
                min={min || 0}
                max={max || 1}
                step={step || 0.01}
                style={
                    reversed
                        ? {
                              direction: "rtl"
                          }
                        : {}
                }
            ></input>
            <label htmlFor={id} className="form-label ml-2">
                {text}
            </label>
        </div>
    );
};

export default SliderFilter;
