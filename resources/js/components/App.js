import React from "react";
import { Route, Switch } from "react-router-dom";
import Example from "./Example";
import Modal from "./Modal/Modal";
import Error from "./Navigation/Error";
import Navbar from "./Navigation/Navbar";
import Sidebar from "./Navigation/Sidebar";
import TaskList from "./Tasks/TaskList";

const App = () => {
    return (
        <div>
            <div id="app">
                <div className="wrapper">
                    <Sidebar />

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
                                    <Error/>
                                </Route>
                            </Switch>

                            
                        </div>
                    </div>
                </div>
            </div>
            <Modal/>
        </div>
    );
};

export default App;
