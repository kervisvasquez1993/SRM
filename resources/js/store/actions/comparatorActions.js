import axios from "axios";
import { holdReady } from "jquery";
import { apiURL } from "../../components/App";
import { extractComparatorCellIndices } from "../../components/Comparator/ComparatorTable";
import { genericFormSubmit } from "./genericFormActions";
import { closeModal } from "./modalActions";

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

// export function addComparision(data) {
//     return async (dispatch, _getState) => {
//         dispatch({
//             type: "ADD_NEGOTIATION_COMPARATOR",
//             payload: data
//         });

//         dispatch(closeModal());
//     };
// }

export function updateComparisionRows(id, rows) {
    return async (dispatch, _getState) => {
        dispatch({
            type: "UPDATE_COMPARISION_ROWS",
            payload: { id, rows }
        });
    };
}

// export function deleteComparision(id) {
//     return async (dispatch, _getState) => {
//         dispatch({
//             type: "DELETE_NEGOTIATION_COMPARATOR",
//             payload: id
//         });

//         dispatch(closeModal());
//     };
// }

// export function editComparision(data) {
//     return async (dispatch, _getState) => {
//         dispatch({
//             type: "EDIT_NEGOTIATION_COMPARATOR",
//             payload: data
//         });

//         dispatch(closeModal());
//     };
// }

export function updateCell(
    data,
    comparisonIndex,
    rowIndex,
    columnIndex,
    cellIndex
) {
    return async (dispatch, _getState) => {
        dispatch({
            type: "UPDATE_COMPARATOR_CELL",
            payload: { data, comparisonIndex, rowIndex, columnIndex, cellIndex }
        });
    };
}

export function deleteCell(comparisonIndex, rowIndex, columnIndex, cellIndex) {
    return async (dispatch, _getState) => {
        dispatch({
            type: "DELETE_COMPARATOR_CELL",
            payload: { comparisonIndex, rowIndex, columnIndex, cellIndex }
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

export function getProducts(taskId) {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_PRODUCT_LIST_REQUEST" });

        try {
            const response = await axios.get(
                `${apiURL}/tarea/${taskId}/producto`
            );

            dispatch({
                type: "GET_PRODUCT_LIST_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            console.log(e);
            console.log(e.response);

            dispatch({
                type: "GET_PRODUCT_LIST_FAILURE"
            });
        }
    };
}

export function getComparisons(taskId) {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_COMPARISION_LIST_REQUEST" });

        try {
            const response = await axios.get(
                `${apiURL}/tarea/${taskId}/comparacion`
            );

            dispatch({
                type: "GET_COMPARISION_LIST_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            console.log(e);
            console.log(e.response);

            dispatch({
                type: "GET_COMPARISION_LIST_FAILURE"
            });
        }
    };
}

export function getSuppliers(taskId) {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_SUPPLIER_LIST_REQUEST" });

        try {
            const response = await axios.get(
                `${apiURL}/tarea/${taskId}/proveedor`
            );

            dispatch({
                type: "GET_SUPPLIER_LIST_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            console.log(e);
            console.log(e.response);
        }
    };
}

export function addComparison(taskId, data) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.post(`${apiURL}/tarea/${taskId}/comparacion`, data)
        ).then(response => {
            dispatch({
                type: "ADD_COMPARATOR_SUCCESS",
                payload: response
            });
            dispatch(
                setCheckedProducts(taskId, {
                    ...response,
                    checkedProducts: data.checkedProducts
                })
            );
            dispatch(closeModal());
        });
    };
}

export function updateComparison(taskId, data) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.put(`${apiURL}/comparacion/${data.id}`, data)
        ).then(response => {
            dispatch({
                type: "UPDATE_COMPARATOR_SUCCESS",
                payload: response
            });
            dispatch(
                setCheckedProducts(taskId, {
                    ...response,
                    checkedProducts: data.checkedProducts
                })
            );
            dispatch(closeModal());
        });
    };
}

export function deleteComparison(comparison) {
    return async (dispatch, getState) => {
        try {
            const response = await axios.delete(
                `${apiURL}/comparacion/${comparison.id}`
            );

            dispatch({
                type: "DELETE_COMPARATOR_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            console.log(e);
            console.log(e.response);
        }
    };
}

export function setCheckedProducts(taskId, { id, checkedProducts }) {
    return async (dispatch, getState) => {
        dispatch({ type: "GET_SUPPLIER_LIST_REQUEST" });

        // Acomodar el estado
        const newState = getState().comparator.state;

        // try {
        //     const response = await axios.get(
        //         `${apiURL}/tarea/${taskId}/proveedor`
        //     );

        //     dispatch({
        //         type: "GET_SUPPLIER_LIST_SUCCESS",
        //         payload: response.data.data
        //     });
        // } catch (e) {
        //     console.log(e);
        //     console.log(e.response);
        // }
    };
}

export function createRow(comparison) {
    return async (dispatch, getState) => {
        try {
            const response = await axios.post(
                `${apiURL}/comparacion/${comparison.id}/comparacion_fila`
            );

            dispatch({
                type: "CREATE_COMPARATOR_ROW_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            console.log(e);
            console.log(e.response);
        }
    };
}

export function deleteRow(row) {
    return async (dispatch, getState) => {
        try {
            const response = await axios.delete(
                `${apiURL}/comparacion_fila/${row.id}`
            );

            dispatch({
                type: "DELETE_COMPARATOR_ROW_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            console.log(e);
            console.log(e.response);
        }
    };
}

export function moveRow(row, result) {
    return async (dispatch, getState) => {
        const newRow = {
            ...row,
            orden: result.destination.index
        };

        try {
            // Informar al server del movimiento que se hizo
            axios.put(`${apiURL}/comparacion_fila/${newRow.id}`, newRow);

            dispatch({
                type: "MOVE_COMPARATOR_ROW",
                payload: { row: newRow, result }
            });
        } catch (e) {
            console.log(e);
            console.log(e.response);
        }
    };
}

export function moveCell(comparison, result) {
    return async (dispatch, getState) => {
        try {
            dispatch({
                type: "MOVE_COMPARATOR_CELL",
                payload: {
                    comparison,
                    result
                }
            });
        } catch (e) {
            console.log(e);
            console.log(e.response);
        }
    };

    // return async (dispatch, getState) => {
    //     const [sourceRowIndex] = extractComparatorCellIndices(
    //         result.source.droppableId
    //     );
    //     const [destinationRowIndex] = extractComparatorCellIndices(
    //         result.destination.droppableId
    //     );

    //     const cell =
    //         comparison.filas[sourceRowIndex].celdas[result.source.index];
    //     console.log("celda", cell);
    //     console.log("filas", comparison.filas[sourceRowIndex]);

    //     const destinationRowId = comparison.filas[destinationRowIndex].id;

    //     const newCell = {
    //         ...cell,
    //         fila_id: destinationRowId,
    //         orden: result.destination.index
    //     };

    //     try {
    //         // Informar al server del movimiento que se hizo
    //         axios.put(`${apiURL}/comparacion_celda/${cell.id}`, newCell);

    //         dispatch({
    //             type: "MOVE_COMPARATOR_CELL",
    //             payload: {
    //                 cell,
    //                 comparison,
    //                 result,
    //                 destinationRowId
    //             }
    //         });
    //     } catch (e) {
    //         console.log(e);
    //         console.log(e.response);
    //     }
    // };
}
