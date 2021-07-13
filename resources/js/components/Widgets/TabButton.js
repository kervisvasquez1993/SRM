import React, { useContext } from "react";
import { TabContext } from "./Tabs";

const TabButton = ({ name, children, disabled = false }) => {
    const { currentTab, setCurrentTab, className = "" } = useContext(
        TabContext
    );

    const handleClick = e => {
        e.preventDefault();
        console.log(disabled)
        if (!disabled) {
            setCurrentTab(name);
        }
    };

    return (
        <li className={`nav-item ${className} mr-lg-1`}>
            <a
                className={`nav-link ${currentTab === name ? "active" : ""} ${
                    disabled ? "disabled" : ""
                }`}
                href="#"
                role="tab"
                onClick={handleClick}
            >
                {children}
            </a>
        </li>
    );
};

export default TabButton;
