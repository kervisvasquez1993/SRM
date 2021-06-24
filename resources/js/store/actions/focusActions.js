export function focusOnElementWithId(id) {
    console.log("focus on", id);
    
    return {
        type: "FOCUS_ON_ID",
        payload: id
    }
}