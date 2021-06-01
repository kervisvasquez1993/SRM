import {combineReducers} from "redux";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";
import sidebarReducer from "./sidebarReducer";
import taskReducer from "./taskReducer";

const rootReducer = combineReducers({
    modal: modalReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    task: taskReducer
});

export default rootReducer;