import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
import { getProductsFromNegotiation } from "../../store/actions/productActions";
import LoadingScreen from "../Navigation/LoadingScreen";
import Error from "../Navigation/Error";
import PurchaseOrderList from "../Purchases/PurchaseOrderList";
import {
    getNegotiation,
    startNegotiation
} from "../../store/actions/negotiationActions";
import ProductsList from "../Products/ProductList";
import { Helmet } from "react-helmet-async";
import GenericFileList from "../Files/GenericFileList";
import { apiURL } from "../App";

const ProviderPurchase = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { id } = useParams();
    const user = useSelector(state => state.auth.user);
    const negotiation = useSelector(state => state.negotiation.negotiation);
    const negotiationError = useSelector(
        state => state.negotiation.negotiationError
    );
    

    if (
        !(
            user.rol === "coordinador" ||
            user.rol === "observador" ||
            user.rol === "comprador"
        )
    ) {
        return <Redirect to="/home" />;
    }

    useEffect(() => {
        document.querySelector("#wrapper").scrollTo(0, 0);

        dispatch(getNegotiation(id));
        dispatch(getProductsFromNegotiation(id));
    }, []);

    if (negotiationError) {
        return <Error />;
    }

    if (!negotiation) {
        return <LoadingScreen />;
    }

    const isMine = user.id == negotiation.usuario.id;

    if (user.rol === "comprador" && !isMine) {
        return <Redirect to="/home" />;
    }

    const handleGoBack = () => {
        history.goBack();
    };

    const handleNegotiate = e => {
        e.preventDefault();

        dispatch(startNegotiation(negotiation));
    };

    return (
        <div className="container-fluid fade-in">
            <Helmet>
                <title>{`${negotiation.proveedor.nombre} - ${process.env.MIX_APP_NAME}`}</title>
            </Helmet>

            <div className="d-flex justify-content-end align-items-center">
                <button
                    className="btn btn-lg btn-success btn-round my-5"
                    onClick={handleNegotiate}
                    disabled={negotiation.iniciar_negociacion}
                >
                    Iniciar Negociación
                </button>
            </div>

            <GenericFileList
                id="negotiation"
                getUrl={`${apiURL}/negociacion/${negotiation.id}/file`}
                uploadUrl={`${apiURL}/negociacion/${negotiation.id}/file`}
                deleteUrl={`${apiURL}/file`}
                hideDropzone={!isMine}
                allowEditing={isMine}
            />

            <ProductsList />
            <PurchaseOrderList />
        </div>
    );
};

export default ProviderPurchase;
