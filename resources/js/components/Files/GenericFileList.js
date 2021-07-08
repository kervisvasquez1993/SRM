import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getFiles, uploadFile } from "../../store/actions/fileManagerActions";
import { maxUploadSize, maxUploadSizeText } from "../../utils";
import { store } from "../Index";
import NegotiationFileCard from "../Negotiation/Files/NegotiationFileCard";
import GenericFileCard from "./GenericFileCard";

export const isRepeatedValidator = (file, managerId) => {
    const state = store.getState();
    const managers = state.fileManager.states;

    if (managerId in managers) {
        if (managers[managerId].files.find(item => item.name === file.name)) {
            return {
                code: "repeated-name",
                message: "Nombre de archivo repetido"
            };
        }
    }

    return null;
};

const ProductClaimFileList = ({ id, getUrl, uploadUrl, deleteUrl }) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const fileStates = useSelector(state => state.fileManager.states);

    useEffect(() => {
        dispatch(getFiles(id, getUrl));
    }, []);

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        fileRejections
    } = useDropzone({
        maxSize: maxUploadSize,
        validator: file => isRepeatedValidator(file, id)
    });

    if (!fileStates || !(id in fileStates)) {
        return null;
    }

    const files = fileStates[id].files;
    const uploadingFiles = fileStates[id].uploadingFiles;

    const handleImport = e => {
        e.preventDefault();
        acceptedFiles.forEach(file =>
            dispatch(uploadFile(id, uploadUrl, getUrl, file))
        );
        acceptedFiles.length = 0;
    };

    return (
        <React.Fragment>
            <div className="mr-auto text-center mb-4">
                <h3>Archivos</h3>
            </div>

            {(files.length > 0 || uploadingFiles.length > 0) && (
                <div className="d-flex flex-wrap justify-content-center mb-4">
                    {files.map(item => {
                        return (
                            <GenericFileCard
                                key={item.id}
                                data={item}
                                deleteUrl={deleteUrl}
                                managerId={id}
                            />
                        );
                    })}
                    {uploadingFiles.map((item, index) => {
                        const fileData = {
                            id: item,
                            name: item,
                            url: "#",
                            dummy: true
                        };

                        return (
                            <NegotiationFileCard
                                key={item + index}
                                data={fileData}
                            />
                        );
                    })}
                </div>
            )}

            <div className="text-center mb-3">
                <div
                    {...getRootProps({
                        className: `dropzone rounded mb-2 ${
                            isDragActive ? "drag-active" : ""
                        }`
                    })}
                >
                    <input name="import" {...getInputProps()} />
                    {acceptedFiles.length > 0 ? (
                        <React.Fragment>
                            <strong className="mb-4">
                                Archivos para subir:
                            </strong>
                            <ul>
                                {acceptedFiles.map((item, index) => (
                                    <li key={index}>{item.name}</li>
                                ))}
                            </ul>
                        </React.Fragment>
                    ) : (
                        fileRejections.length === 0 && (
                            <strong>
                                Arrastres archivos aquí para subirlos{" "}
                                <AiOutlineFileAdd className="mr-2 icon-normal" />
                            </strong>
                        )
                    )}

                    {fileRejections.length > 0 && (
                        <React.Fragment>
                            {acceptedFiles.length === 0 ? (
                                <strong className="mb-3 text-danger">
                                    Ninguno de los siguientes archivos es
                                    valido:
                                </strong>
                            ) : (
                                <strong className="mt-4 mb-3">
                                    Los siguientes archivos no se subirán:
                                </strong>
                            )}

                            <ul>
                                {fileRejections.map((item, index) => {
                                    let error;

                                    switch (item.errors[0].code) {
                                        case "file-too-large":
                                            error = `Supera el maximo de ${maxUploadSizeText}`;
                                            break;
                                        case "repeated-name":
                                            error = item.errors[0].message;
                                            break;
                                        default:
                                            break;
                                    }

                                    return (
                                        <li key={index} className="text-danger">
                                            {item.file.name} ({error})
                                        </li>
                                    );
                                })}
                            </ul>
                        </React.Fragment>
                    )}
                </div>

                <button
                    className="btn btn-lg btn-success btn-round"
                    onClick={handleImport}
                    disabled={acceptedFiles.length == 0}
                >
                    "Subir Archivo"
                    <BsUpload className="ml-2 icon-normal" />
                </button>
            </div>
        </React.Fragment>
    );
};

export default ProductClaimFileList;
