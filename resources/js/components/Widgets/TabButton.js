import React, { useContext } from "react";
import { TabContext } from "./Tabs";

const TabButton = props => {
    const { name } = props;

    const { currentTab, setCurrentTab, className = "" } = useContext(
        TabContext
    );

    const handleClick = e => {
        e.preventDefault();
        setCurrentTab(name);
    };

    return (
        <li className={`nav-item ${className} mr-lg-1`}>
            <a
                className={`nav-link ${currentTab === name ? "active" : ""}`}
                href="#"
                role="tab"
                onClick={handleClick}
            >
                {props.children}
            </a>
        </li>
    );
};

export default TabButton;
