import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
// @ts-ignore
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
    // @ts-ignore
    const { id } = useParams();
    // @ts-ignore
    const user = useSelector(state => state.auth.user);
    // @ts-ignore
    const negotiation = useSelector(state => state.negotiation.negotiation);
    const negotiationError = useSelector(
        // @ts-ignore
        state => state.negotiation.negotiationError
    );

    // @ts-ignore
    const areFilesLoading = useSelector(state => state.fileManager.isLoading);
    const areProductsLoading = useSelector(
        // @ts-ignore
        state => state.product.isLoadingList
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

    // @ts-ignore
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

            <div className="mr-auto text-center py-4">
                <h2 className="h2">Archivos</h2>
            </div>

            <GenericFileList
                id="negotiation"
                getUrl={`${apiURL}/negociacion/${negotiation.id}/file`}
                uploadUrl={`${apiURL}/negociacion/${negotiation.id}/file`}
                deleteUrl={`${apiURL}/file`}
                hideDropzone={!isMine}
                allowEditing={isMine}
                hideTitle={true}
            />

            {!areFilesLoading && <ProductsList />}
            {!areProductsLoading && <PurchaseOrderList />}
        </div>
    );
};

export default ProviderPurchase;
