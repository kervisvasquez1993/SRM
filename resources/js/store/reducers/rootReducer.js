import {combineReducers} from "redux";
import modalReducer from "./modalReducer";
import sidebarReducer from "./sidebarReducer";

const rootReducer = combineReducers({
    modal: modalReducer,
    sidebar: sidebarReducer
});

export default rootReducer;