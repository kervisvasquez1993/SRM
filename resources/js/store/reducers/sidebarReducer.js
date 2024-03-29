import { sidebarBreakpoint } from "../../components/App";

const defaultState = {
    isOpen: window.innerWidth > sidebarBreakpoint
};

const sidebarReducer = (state = defaultState, action) => {
    const { type } = action;

    switch (type) {
        case "TOGGLE_SIDEBAR":
            return {
                ...state,
                isOpen: !state.isOpen
            };
        case "CLOSE_SIDEBAR":
            return {
                ...state,
                isOpen: false
            };
        case "OPEN_SIDEBAR":
            return {
                ...state,
                isOpen: true
            };
        default:
            return state;
    }
};

export default sidebarReducer;
