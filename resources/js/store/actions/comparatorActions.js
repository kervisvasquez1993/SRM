import { toast } from "react-toastify";
import { closeModal } from "./modalActions";

const isNameValid = (getState, name) => {
    const state = getState();

    if (state.comparator.comparisions.find(item => item.productName === name)) {
        return false;
    }

    return true;
};

const showInvalidNameToast = () => {
    toast.error("El nombre del producto está repetido");
};

export function addComparision(data) {
    return async (dispatch, _getState) => {
        if (isNameValid(_getState, data.productName)) {
            dispatch({
                type: "ADD_NEGOTIATION_COMPARATOR",
                payload: data
            });

            dispatch(closeModal());
        } else {
            showInvalidNameToast();
        }
    };
}

export function deleteComparision(productName) {
    return async (dispatch, _getState) => {
        dispatch({
            type: "DELETE_NEGOTIATION_COMPARATOR",
            payload: productName
        });

        dispatch(closeModal());
    };
}

export function editComparision(data) {
    return async (dispatch, _getState) => {
        if (isNameValid(_getState, data.productName)) {
            dispatch({
                type: "EDIT_NEGOTIATION_COMPARATOR",
                payload: data
            });

            dispatch(closeModal());
        } else {
            showInvalidNameToast();
        }
    };
}
