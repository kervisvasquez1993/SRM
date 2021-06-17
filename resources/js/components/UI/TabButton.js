import React, { useContext } from "react";
import { TabContext } from "./Tabs";

const TabButton = props => {
    const { name } = props;

    const { currentTab, setCurrentTab } = useContext(TabContext);

    return (
        <li className="nav-item">
            <a
                className={`nav-link ${currentTab === name ? "active" : ""}`}
                href="#"
                role="tab"
                onClick={e => setCurrentTab(name)}
            >
                {props.children}
            </a>
        </li>
    );
};

export default TabButton;
