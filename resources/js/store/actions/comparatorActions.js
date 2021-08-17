import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../../components/App";
import { closeModal } from "./modalActions";

const isNameValid = (getState, name, originalName = null) => {
    // const state = getState();

    // const found = state.comparator.comparisions.find(
    //     item => item.productName === name
    // );

    // if (found && (!originalName || originalName != found.productName)) {
    //     return false;
    // }

    // return true;
    return true;
};

const showInvalidNameToast = () => {
    toast.error("El nombre del producto está repetido");
};

export function getTask(id) {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_TASK_FOR_COMPARISION_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/tarea/${id}`, {
                params: { negociaciones: true, productos: true }
            });

            // // Filtrar las negociaciones que solo tengan productos cargados
            // response.data.data.negociaciones = response.data.data.negociaciones.filter(
            //     item => item.productos_cargados
            // );

            // // Obtener un arreglo de todos los productos de las negociaciones filtradas
            // const products = response.data.data.negociaciones
            //     .map(item => item.productos)
            //     .flat();

            // response.data.data.comparaciones = JSON.parse(
            //     response.data.data.comparaciones
            // );

            // dispatch({
            //     type: "SET_SELECTED_NEGOTIATIONS_FOR_COMPARISON",
            //     payload: { products }
            // });

            dispatch({
                type: "GET_TASK_FOR_COMPARISION_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            console.log(e);
            dispatch({
                type: "GET_TASK_FOR_COMPARISION_FAILURE"
            });
        }
    };
}

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

export function updateComparisionRows(id, rows) {
    return async (dispatch, _getState) => {
        dispatch({
            type: "UPDATE_COMPARISION_ROWS",
            payload: { id, rows }
        });
    };
}

export function deleteComparision(id) {
    return async (dispatch, _getState) => {
        dispatch({
            type: "DELETE_NEGOTIATION_COMPARATOR",
            payload: id
        });

        dispatch(closeModal());
    };
}

export function editComparision(data) {
    return async (dispatch, _getState) => {
        dispatch({
            type: "EDIT_NEGOTIATION_COMPARATOR",
            payload: data
        });

        dispatch(closeModal());
    };
}

export function updateCell(data, comparisonIndex, rowIndex, columnIndex, cellIndex) {
    return async (dispatch, _getState) => {
        dispatch({
            type: "UPDATE_COMPARATOR_CELL",
            payload: { data, comparisonIndex, rowIndex, columnIndex, cellIndex }
        });
    };
}

// export function updateTask(task) {
//     return async (dispatch, _getState) => {
//         try {
//             const response = await axios.put(`${apiURL}/tarea/${id}`, task);

//             dispatch({
//                 type: "EDIT_TASK_SUCCESS",
//                 payload: response.data.data
//             });

//         } catch (error) {}
//     };
// }

// export function setNegotiations(negotiations) {
//     return async (dispatch, _getState) => {
//         const products = negotiations.map(item => item.productos).flat();

//         dispatch({
//             type: "SET_SELECTED_NEGOTIATIONS_FOR_COMPARISON",
//             payload: { negotiations, products }
//         });
//     };
// }
