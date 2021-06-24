export function focusOnElementWithId(id) {
    return {
        type: "FOCUS_ON_ID",
        payload: id
    };
}

export function clearFocus() {
    return {
        type: "FOCUS_CLEAR"
    };
}
