import {combineReducers} from "redux";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";
import sidebarReducer from "./sidebarReducer";

const rootReducer = combineReducers({
    modal: modalReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
});

export default rootReducer;