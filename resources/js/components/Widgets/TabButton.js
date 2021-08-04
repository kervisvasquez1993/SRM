import React, { useContext } from "react";
import { TabContext } from "./Tabs";

const TabButton = props => {
    const { name, children, disabled = false, className = "" } = props;

    const { currentTab, setCurrentTab, childrenClassName = "" } = useContext(
        TabContext
    );

    const handleClick = e => {
        e.preventDefault();
        console.log(disabled);
        if (!disabled) {
            setCurrentTab(name);
        }
    };

    return (
        <li className={`nav-item ${childrenClassName} ${className} mr-lg-1`}>
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
