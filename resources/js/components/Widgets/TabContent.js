import React, { useContext } from "react";
import { TabContext } from "./Tabs";

const TabContent = props => {
    const { name } = props;
    const { currentTab } = useContext(TabContext);

    return (
        <React.Fragment>
            {currentTab === name && (
                // <div className="tab-pane active">{props.children}</div>
                <div className="tab-content tab-space p-4">{props.children}</div>
            )}
        </React.Fragment>
    );
};

export default TabContent;
