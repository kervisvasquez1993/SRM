import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { Link, Redirect, useHistory, useParams } from "react-router-dom";
// @ts-ignore
import { getProductsFromNegotiation } from "../../store/actions/productActions";
import LoadingScreen from "../Navigation/LoadingScreen";
import Error from "../Navigation/Error";
import NegotiationPurchaseTab from "../Purchases/NegotiationPurchaseTab";
import {
    getNegotiation,
    startNegotiation
} from "../../store/actions/negotiationActions";
import NegotiationProductsTab from "../Products/NegotiationProductsTab";
import { Helmet } from "react-helmet-async";
import GenericFileList from "../Files/GenericFileList";
import { apiURL } from "../App";
import { GiCheckMark } from "react-icons/gi";
import { CgClose } from "react-icons/cg";
import StatusIcon from "../Widgets/StatusBar/StatusIcon";
import StatusBar from "../Widgets/StatusBar";
import Tabs from "../Widgets/Tabs";
import TabButton from "../Widgets/TabButton";
import TabContent from "../Widgets/TabContent";
import TabsRow from "../Widgets/Tabs/TabsRow";
import Tab from "../Widgets/Tabs/Tab";

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

    const percentageCompleted = 100;
    const state = 0;

    return (
        <React.Fragment>
            <Helmet>
                <title>{`${negotiation.proveedor.nombre} - ${process.env.MIX_APP_NAME}`}</title>
            </Helmet>

            <div className="d-flex flex-column align-items-center">
                <h2 className="h2 pb-4">Archivos</h2>

                <GenericFileList
                    id="negotiation"
                    getUrl={`${apiURL}/negociacion/${negotiation.id}/file`}
                    uploadUrl={`${apiURL}/negociacion/${negotiation.id}/file`}
                    deleteUrl={`${apiURL}/file`}
                    hideDropzone={!isMine}
                    allowEditing={isMine}
                    hideTitle={true}
                />

                <hr className="my-2 w-100" />

                <h2 className="h2 py-4">Proceso</h2>

                <StatusBar>
                    <StatusIcon index={0} state={state} description="Cargar" />

                    <StatusIcon
                        index={1}
                        state={state}
                        description="Confirmar"
                    />

                    <StatusIcon
                        index={2}
                        state={state}
                        description="Selección de proveedor"
                    />

                    <StatusIcon
                        index={3}
                        state={state}
                        description="Codigos de barra"
                    />

                    <StatusIcon
                        index={4}
                        state={state}
                        description="Base gráfico"
                    />

                    <StatusIcon
                        index={5}
                        state={state}
                        description="Orden de compra"
                    />
                </StatusBar>

                <div className="py-5"></div>

                <div className="w-100">
                    <Tabs defaultTab="0" className="flex-grow-1">
                        <TabsRow>
                            <Tab name="0">Cargar Productos</Tab>

                            <Tab name="1">Confirmar Productos</Tab>

                            <Tab name="2">Selección de proveedor</Tab>

                            <Tab name="3">Codigos de barra</Tab>

                            <Tab name="4">Base gráfico</Tab>

                            <Tab name="5">Orden de compra</Tab>
                        </TabsRow>

                        <TabContent name="0">
                            <NegotiationProductsTab />
                        </TabContent>
                        <TabContent name="1">Hola</TabContent>
                        <TabContent name="2">Hola</TabContent>
                        <TabContent name="3">Hola</TabContent>
                        <TabContent name="4">Hola</TabContent>
                        <TabContent name="5">
                            <NegotiationPurchaseTab />
                        </TabContent>
                    </Tabs>
                </div>
            </div>
        </React.Fragment>
    );
};

export default ProviderPurchase;
