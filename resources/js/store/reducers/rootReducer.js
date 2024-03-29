import { combineReducers } from "redux";
import artReducer from "./artReducer";
import authReducer from "./authReducer";
import claimReducer from "./claimReducer";
import comparatorReducer from "./comparatorReducer";
import fileManagerReducer from "./fileManagerReducer";
import focusReducer from "./focusReducer";
import genericFormReducer from "./genericFormReducer";
import incidentReducer from "./incidentReducer";
import modalReducer from "./modalReducer";
import negotiationReducer from "./negotiationReducer";
import notificationReducer from "./notificationReducer";
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
    production: productionReducer,
    art: artReducer,
    incident: incidentReducer,
    genericForm: genericFormReducer,
    notification: notificationReducer,
    claim: claimReducer,
    focus: focusReducer,
    comparator: comparatorReducer,

    fileManager: fileManagerReducer
});

export default rootReducer;
