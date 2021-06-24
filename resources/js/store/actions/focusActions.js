export function focusOnElementWithId(id) {
    return {
        type: "FOCUS_ON_ID",
        payload: id
    }
}