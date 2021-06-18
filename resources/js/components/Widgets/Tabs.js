import React, { createContext, useState } from "react";

export const TabContext = createContext(null);

const Tabs = props => {
    const { defaultTab } = props;

    const [currentTab, setCurrentTab] = useState(defaultTab);

    const handleClickTab = (e, name) => {
        e.preventDefault();
        setCurrentTab(name);
    };

    return (
        <TabContext.Provider value={{ ...props, currentTab, setCurrentTab }}>
            {props.children}
        </TabContext.Provider>
    );
};

export default Tabs;
