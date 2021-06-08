import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import { getMyUser } from "../store/actions/authActions";
import Login from "./Auth/Login";
import Example from "./Example";
import Modal from "./Modal/Modal";
import Error from "./Navigation/Error";
import LoadingScreen from "./Navigation/LoadingScreen";
import Navbar from "./Navigation/Navbar";
import Sidebar from "./Navigation/Sidebar";
import NegotiationList from "./Negotiation/NegotiationList";
import ProviderPurchase from "./Purchases/ProviderPurchase";
import TaskDetails from "./Tasks/TaskDetails";
import TaskList from "./Tasks/TaskList";

export const apiURL = process.env.REACT_APP_API_URL || "http://localhost:8000/api";

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

    const history = useHistory();

    useEffect(() => {
        dispatch(getMyUser());

        history.listen(location => {
            dispatch({
                type: "CHANGE_HISTORY"
            });
        });
    }, []);

    if (isLoadingUser) {
        return <LoadingScreen></LoadingScreen>;
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
                                <Route path="/login">
                                    <Redirect to="/home" />
                                </Route>
                                <Route path="/home">
                                    <Example />
                                </Route>
                                <Route exact path="/tasks">
                                    <TaskList />
                                </Route>
                                <Route path="/me/tasks">
                                    <TaskList myTasks key={Date.now()} />
                                </Route>
                                
                                <Route path="/tasks/:id">
                                    <TaskDetails />
                                </Route>
                                <Route path="/negotiation/:id">
                                    <ProviderPurchase />
                                </Route>
                                <Route path="/negotiations">
                                    <NegotiationList />
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
