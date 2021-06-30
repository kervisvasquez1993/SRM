import React, { useContext, useEffect, useState } from "react";
import { FilterContext } from "./Filter";
import { FilterGroupContext } from "./FilterGroup";

const SliderFilter = ({
    id,
    text,
    defaultValue = 0,
    min = 0,
    max = 1,
    step = 0.01,
    reversed = false
}) => {
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
    }, [value]);

    return (
        <div className="form-check form-check-inline p-1 d-flex align-items-center">
            <input
                type="range"
                className="form-range w-50"
                id={id}
                name={id}
                value={value}
                onChange={e => setValue(e.target.value)}
                min={min}
                max={max}
                step={step}
                style={
                    reversed
                        ? {
                              direction: "rtl"
                          }
                        : {}
                }
            ></input>
            <label htmlFor={id} className="form-label ml-2">
                {value}
                {text}
            </label>
        </div>
    );
};

export default SliderFilter;
