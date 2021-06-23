export const toggleSidebar = () => {
    return {
        type: "TOGGLE_SIDEBAR"
    };
};

export const closeSidebar = () => {
    return {
        type: "CLOSE_SIDEBAR"
    };
};

export const openSidebar = () => {
    return {
        type: "OPEN_SIDEBAR"
    };
};

export function sidebarSwipeRight() {
    return async (dispatch, getState) => {
        const state = getState();

        if (!state.sidebar.isOpen) {
            dispatch(openSidebar());
        }
    };
}

export function sidebarSwipeLeft() {
    return async (dispatch, getState) => {
        const state = getState();

        if (state.sidebar.isOpen) {
            dispatch(closeSidebar());
        }
    };
}
