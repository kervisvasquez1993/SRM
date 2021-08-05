import React, { useContext } from "react";
import { TabContext } from "./Tabs";

const TabContent = props => {
    const { name } = props;
    const { currentTab } = useContext(TabContext);

    return (
        <React.Fragment>
            {currentTab === name && (
                // <div className="tab-pane active">{props.children}</div>
                <div className="tab-content p-4 py-5">{props.children}</div>
            )}
        </React.Fragment>
    );
};

export default TabContent;
