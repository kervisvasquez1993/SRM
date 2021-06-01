import React from "react";
import { useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Example from "./Example";
import Modal from "./Modal/Modal";
import Error from "./Navigation/Error";
import Navbar from "./Navigation/Navbar";
import Sidebar from "./Navigation/Sidebar";
import TaskList from "./Tasks/TaskList";

const App = () => {
    const isSidebarOpen = useSelector(state => state.sidebar.isOpen);

    return (
        <React.Fragment>
            <div id="app">
                <div className={"menu-wrapper " + (isSidebarOpen && "mostrar")}>
                    <Sidebar />

                    <div className="wrapper">
                        <div className="main-panel">
                            <Navbar />

                            <div className="content" id="eventInit">
                                <Switch>
                                    <Route path="/home">
                                        <Example />
                                    </Route>
                                    <Route path="/tasks">
                                        <TaskList />
                                    </Route>
                                    <Route path="*">
                                        <Error />
                                    </Route>
                                </Switch>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal />
        </React.Fragment>
    );
};

export default App;
