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
import { apiURL } from "../../App";
import GenericFileList from "../../Files/GenericFileList";
import IncidentsTab from "../../Incidents/IncidentsTab";
import Error from "../../Navigation/Error";
import LoadingScreen from "../../Navigation/LoadingScreen";

const ReceptionPage = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const { id: claimId } = useParams();

    const user = useUser();
    // @ts-ignore
    const claim = useSelector(state => state.claim.current);
    // @ts-ignore
    const isLoadingCurrent = useSelector(state => state.claim.isLoadingCurrent);

    if (
        !(
            user.rol === "coordinador" ||
            user.rol === "comprador" ||
            user.rol === "almacen"
        )
    ) {
        return <Redirect to="/home" />;
    }

    useEffect(() => {
        dispatch(getClaim(claimId));
    }, []);

    const helmet = (
        <Helmet>
            <title>{`Inspección - ${process.env.MIX_APP_NAME}`}</title>
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

    const handleCheck = e => {
        const data = {
            ...claim,
            [e.target.id]: !Boolean(claim[e.target.id])
        };

        dispatch(updateClaim(data));
    };

    return (
        <React.Fragment>
            {helmet}

            <div className="d-flex flex-wrap align-items-center mt-5 justify-content-between">
                <h1 className="text-left h2 text-center">Inspección</h1>
                <div className="form-check form-check p-1 ml-5">
                    <label className="form-check-label">
                        ¿Completado?
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="inspeccion_carga"
                            onChange={handleCheck}
                            checked={inspeccion_carga}
                            disabled={
                                reclamos_devoluciones ||
                                !recepcion_mercancia ||
                                user.rol != "almacen"
                            }
                        />
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </label>
                </div>
            </div>

            <hr />

            <GenericFileList
                id="inspection"
                getUrl={`${apiURL}/reclamos_devoluciones/${claimId}/imagen_inspeccion`}
                uploadUrl={`${apiURL}/reclamos_devoluciones/${claimId}/imagen_inspeccion`}
                deleteUrl={`${apiURL}/imagen_inspeccion`}
                hideDropzone={user.rol != "almacen"}
                allowEditing={user.rol === "almacen"}
            />

            <hr className="mt-5" />

            <IncidentsTab
                stateName="claim"
                url1="reclamos_devoluciones"
                url2="inspeccion_carga"
                title="Comentarios"
                useEmptyListMessage={false}
            ></IncidentsTab>
        </React.Fragment>
    );
};

export default ReceptionPage;
