import axios from "axios";
import { toast } from "react-toastify";
import { apiURL } from "../../components/App";

export function getFiles(managerId, url, uploadedFile = null) {
    return async dispatch => {
        dispatch({ type: "GET_FILES_REQUEST" });

        try {
            let response = await axios.get(url);

            if (uploadedFile) {
                dispatch({
                    type: "UPLOAD_FILE_SUCCESS",
                    payload: uploadedFile,
                    id: managerId
                });
            }

            dispatch({
                type: "GET_FILES_SUCCESS",
                payload: response.data.data,
                id: managerId
            });
        } catch (e) {
            console.log(e);
            dispatch({
                type: "GET_FILES_FAILURE",
                id: managerId
            });
        }
    };
}

export function uploadFile(managerId, uploadUrl, getUrl, file) {
    return async dispatch => {
        dispatch({
            type: "UPLOAD_FILE_REQUEST",
            payload: file.name,
            id: managerId
        });

        try {
            let formData = new FormData();
            formData.append("file", file);

            await axios.post(uploadUrl, formData);

            dispatch(getFiles(managerId, getUrl, file.name));

            toast.success("✔️ Archivo cargado");
        } catch (e) {
            toast.error(`🚨 ${e.response.data.error}`);
            console.log(e.response);

            dispatch({
                type: "UPLOAD_INSPECTION_FILE_FAILURE",
                payload: file.name,
                id: managerId
            });
        }
    };
}

export function deleteFile(managerId, id, deleteUrl) {
    return async dispatch => {
        dispatch({ type: "DELETE_FILE_REQUEST", payload: id, id: managerId });

        try {
            await axios.delete(`${deleteUrl}/${id}`);

            dispatch({
                type: "DELETE_FILE_SUCCESS",
                payload: id,
                id: managerId
            });
        } catch (e) {
            console.log(e);
            toast.error("🚨 Error");

            dispatch({
                type: "DELETE_FILE_FAILURE",
                id: managerId
            });
        }
    };
}
