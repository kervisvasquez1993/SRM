import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getClaim, updateClaim } from "../../../store/actions/claimActions";
import { useUser } from "../../../utils";
import IncidentsTab from "../../Incidents/IncidentsTab";
import Error from "../../Navigation/Error";
import LoadingScreen from "../../Navigation/LoadingScreen";
import ProductClaimList from "./ProductClaimList";

const ClaimPage = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const { id: claimId } = useParams();

    const user = useUser();
    // @ts-ignore
    const claim = useSelector(state => state.claim.current);
    // @ts-ignore
    const isLoadingCurrent = useSelector(state => state.claim.isLoadingCurrent);

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
                <h1 className="text-left h2">Reclamos y Devoluciones</h1>
                <div className="form-check form-check p-1 ml-5">
                    <label className="form-check-label">
                        ¿Completado?
                        <input
                            className="form-check-input"
                            type="checkbox"
                            id="reclamos_devoluciones"
                            onChange={handleCheck}
                            checked={claim.reclamos_devoluciones}
                        />
                        <span className="form-check-sign">
                            <span className="check"></span>
                        </span>
                    </label>
                </div>
            </div>

            <hr />

            <ProductClaimList />

            <IncidentsTab
                stateName="claim"
                url1="reclamos_devoluciones"
                url2="reclamos_devolucion"
                title="Comentarios"
            ></IncidentsTab>
        </React.Fragment>
    );
};

export default ClaimPage;
