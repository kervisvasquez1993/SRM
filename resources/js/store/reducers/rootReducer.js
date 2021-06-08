import {combineReducers} from "redux";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";
import productReducer from "./productReducer";
import providerReducer from "./providerReducer";
import purchaseOrderReducer from "./purchaseOrderReducer";
import sidebarReducer from "./sidebarReducer";
import taskReducer from "./taskReducer";

const rootReducer = combineReducers({
    modal: modalReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    task: taskReducer,
    provider: providerReducer,
    product: productReducer,
    purchaseOrder: purchaseOrderReducer
});

export default rootReducer;