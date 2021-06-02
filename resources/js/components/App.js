import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect } from "react-router-dom";
import { getMyUser } from "../store/actions/authActions";
import Login from "./Auth/Login";
import Example from "./Example";
import Modal from "./Modal/Modal";
import Error from "./Navigation/Error";
import LoadingScreen from "./Navigation/LoadingScreen";
import Navbar from "./Navigation/Navbar";
import Sidebar from "./Navigation/Sidebar";
import TaskList from "./Tasks/TaskList";

axios.interceptors.request.use(config => {
    const token = localStorage.getItem("auth");

    if (token != null) {
        config.headers.Authorization = "Bearer " + token;
    }

    return config;
});

const App = () => {
    const dispatch = useDispatch();
    const isSidebarOpen = useSelector(state => state.sidebar.isOpen);
    const user = useSelector(state => state.auth.user);
    const isLoadingUser = useSelector(state => state.auth.isLoadingUser);

    useEffect(() => {
        dispatch(getMyUser());
    }, []);

    if (isLoadingUser) {
        return (
            <LoadingScreen></LoadingScreen>
        );
    }

    if (!user) {
        return (
            <Switch>
                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/">
                    <Redirect to="/login" />
                </Route>
            </Switch>
        );
    }

    return (
        <React.Fragment>
            <div id="app">
                <div className={"menu-wrapper " + (isSidebarOpen && "mostrar")}>
                    <Sidebar />

                    <div className="wrapper">
                        <Navbar />

                        <div className="content" id="eventInit">
                            <Switch>
                                <Route exact path="/">
                                    <Redirect to="/home" />
                                </Route>
                                <Route path="/home">
                                    <Example />
                                </Route>
                                <Route exact path="/tasks">
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
            <Modal />
        </React.Fragment>
    );
};

export default App;
