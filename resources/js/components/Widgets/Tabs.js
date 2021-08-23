import React, { createContext, useEffect, useState } from "react";

export const TabContext = createContext(null);

const Tabs = props => {
    const { defaultTab, onChangeTab } = props;

    const [currentTab, setCurrentTab] = useState(defaultTab);

    useEffect(() => {
        if (onChangeTab) {
            onChangeTab(currentTab);
        }
    }, [currentTab]);

    return (
        <TabContext.Provider value={{ ...props, currentTab, setCurrentTab }}>
            {props.children}
        </TabContext.Provider>
    );
};

export default Tabs;
