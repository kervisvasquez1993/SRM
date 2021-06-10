import React from "react";
import ReactDOM from "react-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider as ReduxProvider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "../store/reducers/rootReducer";
import App from "./App";

export const store = createStore(rootReducer, applyMiddleware(thunk));

const Index = () => {
    return (
        <React.StrictMode>
        <BrowserRouter>
            <ReduxProvider store={store}>
                <HelmetProvider>
                    <App />
                </HelmetProvider>
            </ReduxProvider>
        </BrowserRouter>
        </React.StrictMode>
    );
};

if (document.getElementById("root")) {
    ReactDOM.render(<Index />, document.getElementById("root"));
}
