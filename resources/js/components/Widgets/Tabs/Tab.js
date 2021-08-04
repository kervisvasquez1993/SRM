import React, { useContext } from "react";
import { TabContext } from "../Tabs";

const Tab = ({ name, children, disabled = false }) => {
    const { currentTab, setCurrentTab = "" } = useContext(TabContext);

    const handleClick = e => {
        e.preventDefault();

        if (!disabled) {
            setCurrentTab(name);
        }
    };

    return (
        <button
            className={`tab ${currentTab === name ? "active" : ""} ${
                disabled ? "disabled" : ""
            }`}
            onClick={handleClick}
        >
            {children}
        </button>
    );
};

export default Tab;
