import axios from "axios";

export const toggleSidebar = (options) => {
    return {
        type: "TOGGLE_SIDEBAR"
    }
}

export const closeSidebar = (options) => {
    return {
        type: "CLOSE_SIDEBAR"
    }
}