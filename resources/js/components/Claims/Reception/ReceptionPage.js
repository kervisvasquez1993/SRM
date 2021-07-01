import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { getClaim } from "../../../store/actions/claimActions";
import { useUser } from "../../../utils";
import LoadingScreen from "../../Navigation/LoadingScreen";

const ReceptionPage = () => {
    const dispatch = useDispatch();
    const { id: claimId } = useParams();

    const user = useUser();
    const claim = useSelector(state => state.claim.current);
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

    return (
        <React.Fragment>
            <h1 className="text-center my-5">Recepción</h1>
        </React.Fragment>
    );
};

export default ReceptionPage;
