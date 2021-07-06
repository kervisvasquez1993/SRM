import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Helmet } from "react-helmet-async";
import { BsUpload } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import {
    getClaim,
    importExcel,
    updateClaim
} from "../../../store/actions/claimActions";
import { useUser } from "../../../utils";
import IncidentsTab from "../../Incidents/IncidentsTab";
import Error from "../../Navigation/Error";
import LoadingScreen from "../../Navigation/LoadingScreen";
import ReceptionTable from "./ReceptionTable";

const ReceptionPage = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const { id: claimId } = useParams();

    const user = useUser();
    // @ts-ignore
    const claim = useSelector(state => state.claim.current);
    // @ts-ignore
    const isLoadingCurrent = useSelector(state => state.claim.isLoadingCurrent);
    // @ts-ignore
    const isUploadingFile = useSelector(state => state.claim.isUploadingFile);

    const {
        acceptedFiles,
        getRootProps,
        getInputProps,
        isDragActive
    } = useDropzone({
        maxFiles: 1,
        accept: ".xlsx"
    });

    if (!(user.rol === "coordinador" || user.rol === "comprador")) {
        return <Redirect to="/home" />;
    }

    useEffect(() => {
        dispatch(getClaim(claimId));
    }, []);

    const helmet = (
        <Helmet>
            <title>{`Recepción - ${process.env.MIX_APP_NAME}`}</title>
        </Helmet>
    );

    if (isLoadingCurrent) {
        return <LoadingScreen>{helmet}</LoadingScreen>;
    }

    if (!claim) {
        return <Error />;
    }

    const {
        recepcion_mercancia,
        inspeccion_carga,
        reclamos_devoluciones
    } = claim;

    const handleUpload = e => {
        e.preventDefault();
        dispatch(importExcel(claimId, acceptedFiles[0]));
        acceptedFiles.length = 0;
    };

    const handleCheck = e => {
        const data = {
            ...claim,
            [e.target.id]: !Boolean(claim[e.target.id])
        };

        dispatch(updateClaim(data));
    };

    return (
        <React.Fragment>
            <div className="d-flex align-items-center mt-5 justify-content-between">
                <h1 className="text-left h2">Recepción</h1>
                <div className="form-check form-check p-1 ml-5">
                    <label className="form-check-label">
                        ¿Completado?
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="recepcion_mercancia"
                            onChange={handleCheck}
                            checked={recepcion_mercancia}
                            disabled={inspeccion_carga || reclamos_devoluciones}
                        />
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </label>
                </div>
            </div>

            <hr className="mb-5" />

            <div className="d-flex justify-content-center">
                <div
                    {...getRootProps({
                        className: `dropzone rounded mx-5 mb-2 ${
                            isDragActive ? "drag-active" : ""
                        }`
                    })}
                >
                    <input name="import" {...getInputProps()} />
                    {acceptedFiles.length > 0 ? (
                        <div>
                            {acceptedFiles[0].name} - {acceptedFiles[0].size}{" "}
                            bytes
                        </div>
                    ) : (
                        <span>Arrastre un archivo excel o haga clic aquí</span>
                    )}
                </div>
            </div>

            <div className="text-center">
                <button
                    className="btn btn-lg btn-success btn-round mb-4"
                    onClick={handleUpload}
                    disabled={acceptedFiles.length == 0 || isUploadingFile}
                >
                    Importar Excel
                    <BsUpload className="ml-3 icon-normal" />
                </button>
            </div>

            <ReceptionTable />

            <IncidentsTab
                stateName="claim"
                url1="reclamos_devoluciones"
                url2="incidencia_recepcion"
                title="Comentarios"
            ></IncidentsTab>
        </React.Fragment>
    );
};

export default ReceptionPage;
