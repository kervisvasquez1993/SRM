import axios from "axios";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Route,
    Switch,
    Redirect,
    useHistory,
    useLocation
} from "react-router-dom";
import { getMyUser, logout } from "../store/actions/authActions";
import Login from "./Auth/Login";
import Home from "./Home/Home";
import Modal from "./Modal/Modal";
import Error from "./Navigation/Error";
import LoadingScreen from "./Navigation/LoadingScreen";
import Navbar from "./Navigation/Navbar";
import Sidebar from "./Navigation/Sidebar";
import NegotiationList from "./Negotiation/NegotiationList";
import ProviderPurchase from "./Negotiation/Details/NegotiationDetails";
import TaskDetails from "./Tasks/TaskDetails";
import TaskList from "./Tasks/TaskList";
import jwt_decode from "jwt-decode";
import { store } from "./Index";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import ProductionList from "./Productions/ProductionList";
import ArtList from "./Arts/ArtList";
import UserList from "./Users/UserList";
import NotificationList from "./Notifications/NotificationList";
import ClaimsList from "./Claims/ClaimList";
import {
    closeSidebar,
    sidebarSwipeLeft,
    sidebarSwipeRight
} from "../store/actions/sidebarActions";
import { useSwipeable } from "react-swipeable";
import { NumberParam, useQueryParam } from "use-query-params";
import { filtersGlobalOptions } from "./Filters/GenericFilter";
import useWindowDimensions, { removeSlash } from "../utils";

import "react-quill/dist/quill.snow.css";
import { Helmet } from "react-helmet-async";
import ReceptionPage from "./Claims/Reception/ReceptionPage";
import InspectionPage from "./Claims/Inspection/InspectionPage";
import ProductClaimPage from "./Claims/Claims/ProductClaimPage";
import NegotiationComparator from "./Comparator/NegotiationComparator";
import SupplierList from "./Suppliers/SupplierList";
import {Echo} from "../utils/Echo";

// const messaging = firebase.messaging();

// messaging.onMessage(payload => {
//     console.log("Message received. ", payload);
//     // ...
// });

axios.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response.status === 401) {
            const token = localStorage.getItem("auth");
            if (token) {
                // Get the expiration date of the token
                const tokenData = jwt_decode(token);
                // @ts-ignore
                const expirationDate = new Date(tokenData.exp * 1000);

                if (new Date() > expirationDate) {
                    store.dispatch(logout());
                }
            }
        }

        return Promise.reject(error);
    }
);

export const apiURL = process.env.MIX_APP_API_URL || "/api";
export const amazonS3Url =
    "https://srmdnamics-laravel-file.s3.us-east-2.amazonaws.com/";

export const sidebarBreakpoint = 1100;

axios.interceptors.request.use(config => {
    const token = localStorage.getItem("auth");

    if (token != null) {
        config.headers.Authorization = "Bearer " + token;
    }

    return config;
});

const App = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const isSidebarOpen = useSelector(state => state.sidebar.isOpen);
    // @ts-ignore
    const user = useSelector(state => state.auth.user);
    // @ts-ignore
    const isLoadingUser = useSelector(state => state.auth.isLoadingUser);

    const { width } = useWindowDimensions();

    const handlers = useSwipeable({
        onSwiped: event => {
            const target = event.event.target;
            // @ts-ignore
            const tagName = target.tagName;

            if (
                tagName === "TD" ||
                tagName === "TH" ||
                tagName === "TABLE" ||
                tagName === "INPUT"
            ) {
                return;
            }

            if (
                // @ts-ignore
                target.classList.contains("ignore-swipe") ||
                // @ts-ignore
                target.closest(".ignore-swipe")
            ) {
                return;
            }

            if (event.dir === "Left") {
                dispatch(sidebarSwipeLeft());
            }

            if (event.dir === "Right") {
                dispatch(sidebarSwipeRight());
            }
        }
    });

    const [id] = useQueryParam("id", NumberParam);

    useEffect(() => {
        filtersGlobalOptions.defaultChekboxValue = id ? true : undefined;
    }, [id]);

    const history = useHistory();
    const location = useLocation();getMyUser
    const previous = useRef(null);

    useEffect(() => {
        if (
            !previous.current ||
            removeSlash(previous.current.pathname) !=
                removeSlash(location.pathname)
        ) {
            dispatch({
                type: "CHANGE_HISTORY"
            });
        }

        previous.current = location;
    }, [location]);

    useEffect(() => {
        dispatch(getMyUser());

        history.block((location, action) => {
            if (action === "PUSH") {
                if (
                    location.pathname + location.search + location.hash ===
                    previous.current.pathname +
                        previous.current.search +
                        previous.current.hash
                ) {
                    return false;
                }
            }
        });
    }, []);

    useEffect(() => {
        if (user) {
            console.log("Escuchando");
            
            Echo.private(`comparacion.${user.id}`).listen("ArchivoComparacionListo", e => {
                console.log("Recibido");
                console.log(e);
            });
        }
    }, [user]);

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

    const handleClick = () => {
        if (isSidebarOpen && width < sidebarBreakpoint) {
            dispatch(closeSidebar());
        }
    };

    return (
        <React.Fragment>
            <Helmet>
                <title>{process.env.MIX_APP_NAME}</title>
            </Helmet>

            <div
                className={"menu-wrapper " + (isSidebarOpen && "mostrar")}
                {...handlers}
                style={{ touchAction: "pan-x" }}
            >
                <Sidebar />
                <Navbar />

                <div
                    className="page-wrapper"
                    id="wrapper"
                    onPointerDown={handleClick}
                >
                    <div className="content" id="eventInit">
                        <Switch>
                            <Route exact path="/">
                                <Redirect to="/home" />
                            </Route>
                            <Route path="/login">
                                <Redirect to="/home" />
                            </Route>
                            <Route path="/home">
                                <Home />
                            </Route>
                            <Route path="/users">
                                <UserList />
                            </Route>
                            <Route path="/suppliers">
                                <SupplierList />
                            </Route>
                            <Route exact path="/tasks">
                                <TaskList />
                            </Route>
                            <Route exact path="/tasks/:id">
                                <TaskDetails />
                            </Route>
                            <Route exact path="/tasks/:id/comparator">
                                <NegotiationComparator />
                            </Route>
                            <Route path="/me/tasks">
                                <TaskList
                                    myTasks
                                    key={history.location.pathname}
                                />
                            </Route>
                            <Route path="/negotiation/:id">
                                <ProviderPurchase />
                            </Route>
                            <Route exact path="/negotiations">
                                <NegotiationList />
                            </Route>
                            <Route path="/productions">
                                <ProductionList />
                            </Route>
                            <Route path="/arts">
                                <ArtList />
                            </Route>
                            <Route exact path="/claims">
                                <ClaimsList />
                            </Route>
                            <Route exact path="/claims/:id/reception">
                                <ReceptionPage />
                            </Route>
                            <Route exact path="/claims/:id/inspection">
                                <InspectionPage />
                            </Route>
                            <Route exact path="/claims/:id/claim">
                                <ProductClaimPage />
                            </Route>
                            <Route path="/notifications">
                                <NotificationList />
                            </Route>
                            <Route path="*">
                                <Error />
                            </Route>
                        </Switch>
                    </div>
                </div>
            </div>
            <Modal />
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </React.Fragment>
    );
};

export default App;
