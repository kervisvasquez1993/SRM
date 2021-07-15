import axios from "axios";
import React from "react";
import { apiURL } from "../../components/App";
import ProductionManagementModal from "../../components/Productions/ProductionManagementModal";
import { genericFormSubmit } from "./genericFormActions";
import { closeModal, openModal } from "./modalActions";

export function getProductions() {
    return async (dispatch, _getState) => {
        dispatch({ type: "GET_PRODUCTIONS_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/produccion_transito`);

            dispatch({
                type: "GET_PRODUCTIONS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_PRODUCTIONS_FAILURE"
            });
        }
    };
}

export function getProduction(id) {
    return async (dispatch, _getState) => {
        dispatch({ type: "GET_PRODUCTION_REQUEST" });

        try {
            const response = await axios.get(
                `${apiURL}/produccion_transito/${id}`
            );

            dispatch({
                type: "GET_PRODUCTION_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_PRODUCTION_FAILURE"
            });
        }
    };
}

export function updateProduction(data) {
    return async (dispatch, _getState) => {
        dispatch({ type: "UPDATE_PRODUCTION_REQUEST" });

        try {
            const response = await axios.put(
                `${apiURL}/produccion_transito/${data.id}`,
                data
            );
            dispatch({
                type: "UPDATE_PRODUCTION_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "UPDATE_PRODUCTION_FAILURE"
            });
        }
    };
}

export function getPayments(productionId) {
    return async (dispatch, _getState) => {
        dispatch({ type: "GET_PAYMENTS_REQUEST" });

        try {
            const response = await axios.get(
                `${apiURL}/produccion_transito/${productionId}/pago`
            );

            dispatch({
                type: "GET_PAYMENTS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_PAYMENTS_FAILURE"
            });
        }
    };
}

export function createPayment(production, data) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.post(
                `${apiURL}/produccion_transito/${production.id}/pago`,
                data
            )
        ).then(() => {
            dispatch(getProductions());
            // dispatch(reopenProductionModal(production));
        });
    };
}

export function editPayment(data) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.post(`${apiURL}/pago/${data.get("id")}`, data)
        ).then(() => {
            //dispatch(getProductions());
            // dispatch(reopenProductionModal(production));
        });
    };
}

export function deletePayment(paymentId) {
    return async (dispatch, _getState) => {
        dispatch({ type: "DELETE_PAYMENT_REQUEST" });

        try {
            await axios.delete(`${apiURL}/pago/${paymentId}`);

            dispatch({
                type: "DELETE_PAYMENT_SUCCESS",
                payload: paymentId
            });

            dispatch(getProductions());
        } catch (e) {
            dispatch({
                type: "DELETE_PAYMENT_FAILURE",
                errors: e.response.data
            });
        }
    };
}

// function reopenProductionModal(production) {
//     return async dispatch => {
//         dispatch(closeModal());

//         dispatch(
//             openModal({
//                 title: production.pivot.proveedor.nombre,
//                 body: <ProductionManagementModal productionId={production.id} />
//             })
//         );
//     };
// }
