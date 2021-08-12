import { toast } from "react-toastify";
import { closeModal } from "./modalActions";

const isNameValid = (getState, name, originalName = null) => {
    const state = getState();

    const found = state.comparator.comparisions.find(
        item => item.productName === name
    );

    if (found && (!originalName || originalName != found.productName)) {
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

export function editComparision(data, originalName) {
    return async (dispatch, _getState) => {
        if (isNameValid(_getState, data.productName, originalName)) {
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

export function setNegotiations(negotiations) {
    return async (dispatch, _getState) => {
        const products = negotiations.map(item => item.productos).flat();

        dispatch({
            type: "SET_SELECTED_NEGOTIATIONS_FOR_COMPARISON",
            payload: { negotiations, products }
        });
    };
}
