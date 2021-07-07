import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../../components/App";
import { genericFormSubmit } from "./genericFormActions";
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

export function getFiles(id, uploadedFile = null) {
    return async dispatch => {
        dispatch({ type: "GET_INSPECTION_FILES_REQUEST" });

        try {
            let response = await axios.get(
                `${apiURL}/reclamos_devoluciones/${id}/imagen_inspeccion`
            );

            console.log(response);

            if (uploadedFile) {
                dispatch({
                    type: "UPLOAD_INSPECTION_FILE_SUCCESS",
                    payload: uploadedFile
                });
            }

            dispatch({
                type: "GET_INSPECTION_FILES_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_INSPECTION_FILES_FAILURE"
            });
        }
    };
}

export function uploadFile(id, file) {
    return async dispatch => {
        dispatch({
            type: "UPLOAD_INSPECTION_FILE_REQUEST",
            payload: file.name
        });

        try {
            let formData = new FormData();
            formData.append("file", file);

            await axios.post(
                `${apiURL}/reclamos_devoluciones/${id}/imagen_inspeccion`,
                formData
            );

            dispatch(getFiles(id, file.name));

            toast.success("✔️ Archivo cargado");
        } catch (e) {
            toast.error(`🚨 ${e.response.data.error}`);
            console.log(e.response);

            dispatch({
                type: "UPLOAD_INSPECTION_FILE_FAILURE",
                payload: file.name
            });
        }
    };
}

export function deleteFile(id) {
    return async dispatch => {
        dispatch({ type: "DELETE_INSPECTION_FILE_REQUEST", payload: id });

        try {
            await axios.delete(`${apiURL}/imagen_inspeccion/${id}`);

            dispatch({
                type: "DELETE_INSPECTION_FILE_SUCCESS",
                payload: id
            });
        } catch (e) {
            toast.error("🚨 Error");

            dispatch({
                type: "DELETE_INSPECTION_FILE_FAILURE"
            });
        }
    };
}

export function getProductClaims(parentId) {
    return async dispatch => {
        dispatch({ type: "GET_PRODUCT_CLAIMS_REQUEST" });

        try {
            const response = await axios.get(
                `${apiURL}/reclamos_devoluciones/${parentId}/reclamo`
            );

            dispatch({
                type: "GET_PRODUCT_CLAIMS_SUCCESS",
                payload: response.data.data
            });
        } catch (e) {
            dispatch({
                type: "GET_PRODUCT_CLAIMS_FAILURE"
            });
        }
    };
}

export function createProductClaim(parentId, data) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.post(
                `${apiURL}/reclamos_devoluciones/${parentId}/reclamo`,
                data
            )
        ).then(response => {
            dispatch({
                type: "CREATE_PRODUCT_CLAIM_SUCCESS",
                payload: response
            });

            toast.success("✔️ Reclamo creado");
        });
    };
}

export function editProductClaim(data) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.put(`${apiURL}/reclamo/${data.id}`, data)
        ).then(response => {
            dispatch({
                type: "EDIT_PRODUCT_CLAIM_SUCCESS",
                payload: response
            });

            toast.success("✔️ Reclamo editado");
        });
    };
}

export function deleteProductClaim(id) {
    return dispatch => {
        return genericFormSubmit(dispatch, () =>
            axios.delete(`${apiURL}/reclamo/${id}`)
        ).then(response => {
            dispatch({
                type: "DELETE_PRODUCT_CLAIM_SUCCESS",
                payload: response
            });

            toast.success("✔️ Reclamo eliminado");
        });
    };
}
