import React, { useContext } from "react";
import { TabContext } from "./Tabs";

const TabContent = props => {
    const { name } = props;
    const { currentTab } = useContext(TabContext);

    return (
        <div className={`tab-pane ${currentTab === name ? "active" : ""}`}>
            {props.children}
        </div>
    );
};

export default TabContent;
