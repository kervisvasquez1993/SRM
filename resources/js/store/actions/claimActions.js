import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../../components/App";
import { closeModal } from "./modalActions";

export function getClaims() {
    return async dispatch => {
        dispatch({ type: "GET_CLAIMS_REQUEST" });

        try {
            const response = await axios.get(`${apiURL}/reclamos_devoluciones`);

            dispatch({
                type: "GET_CLAIMS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_CLAIMS_FAILURE"
            });
        }
    };
}

export function getClaim(id) {
    return async dispatch => {
        dispatch({ type: "GET_CLAIM_REQUEST" });

        try {
            const response = await axios.get(
                `${apiURL}/reclamos_devoluciones/${id}`
            );

            dispatch({
                type: "GET_CLAIM_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_CLAIM_FAILURE"
            });
        }
    };
}

export function updateClaim(data) {
    return async dispatch => {
        dispatch({ type: "UPDATE_CLAIM_REQUEST" });

        try {
            const response = await axios.put(
                `${apiURL}/reclamos_devoluciones/${data.id}`,
                data
            );

            dispatch({
                type: "UPDATE_CLAIM_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "UPDATE_CLAIM_FAILURE"
            });
        }
    };
}

export function importExcel(id, file) {
    return async dispatch => {
        dispatch({
            type: "UPLOADING_CLAIMS_REQUEST"
        });

        try {
            let formData = new FormData();
            formData.append("import", file);

            await axios.post(
                `${apiURL}/reclamos_devoluciones/${id}/importar`,
                formData
            );

            dispatch({
                type: "UPLOADING_CLAIMS_SUCCESS"
            });

            dispatch(getReceptionItems(id));

            toast.success("✔️ Excel importado");
        } catch (e) {
            console.log(e);
            console.log(e.response);

            dispatch({
                type: "UPLOADING_CLAIMS_FAILURE"
            });
        }
    };
}

export function getReceptionItems(claimId) {
    return async dispatch => {
        dispatch({
            type: "GET_RECEPTION_ITEMS_REQUEST"
        });

        try {
            const response = await axios.get(
                `${apiURL}/reclamos_devoluciones/${claimId}/recepcion`
            );

            dispatch({
                type: "GET_RECEPTION_ITEMS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            console.log(e);
            console.log(e.response);

            dispatch({
                type: "GET_RECEPTION_ITEMS_FAILURE"
            });
        }
    };
}
