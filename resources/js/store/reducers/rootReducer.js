import {combineReducers} from "redux";
import authReducer from "./authReducer";
import modalReducer from "./modalReducer";
import negotiationReducer from "./negotiationReducer";
import productionReducer from "./productionReducer";
import productReducer from "./productReducer";
import providerReducer from "./providerReducer";
import purchaseOrderReducer from "./purchaseOrderReducer";
import sidebarReducer from "./sidebarReducer";
import taskReducer from "./taskReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
    modal: modalReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    task: taskReducer,
    provider: providerReducer,
    product: productReducer,
    purchaseOrder: purchaseOrderReducer,
    negotiation: negotiationReducer,
    user: userReducer,
    production: productionReducer
});

export default rootReducer;