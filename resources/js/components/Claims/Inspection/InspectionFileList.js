import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BsUpload } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
    deleteFile,
    getFiles,
    uploadFile
} from "../../../store/actions/claimActions";
import {
    isRepeatedValidator,
    maxUploadSize,
    maxUploadSizeText
} from "../../../utils";
import FileCard from "../../Files/FileCard";
import NegotiationFileCard from "../../Negotiation/Files/NegotiationFileCard";

const InspectionFileList = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const user = useSelector(state => state.auth.user);
    // @ts-ignore
    const claim = useSelector(state => state.claim.current);
    // @ts-ignore
    const files = useSelector(state => state.claim.inspectionFiles);

    const uploadingFiles = useSelector(
        // @ts-ignore
        state => state.claim.uploadingFiles
    );

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive,
        fileRejections
    } = useDropzone({
        maxSize: maxUploadSize,
        validator: file =>
            isRepeatedValidator(file, state => state.claim.inspectionFiles)
    });

    useEffect(() => {
        dispatch(getFiles(claim.id));
    }, []);

    const handleImport = e => {
        e.preventDefault();

        acceptedFiles.forEach(file => dispatch(uploadFile(claim.id, file)));

        acceptedFiles.length = 0;
    };

    return (
        <React.Fragment>
            <div className="mr-auto text-center py-5">
                <h2>Archivos</h2>
            </div>

            {(files.length > 0 || uploadingFiles.length > 0) && (
                <div className="d-flex flex-wrap justify-content-center mb-4">
                    {files.map(item => {
                        return (
                            <FileCard
                                key={item.id}
                                data={item}
                                stateName="claim"
                                deleteAction={() => deleteFile(item.id)}
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
                    className="btn btn-lg btn-success btn-round mb-5"
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

export default InspectionFileList;
