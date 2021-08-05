import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { Redirect, useHistory, useParams } from "react-router-dom";
// @ts-ignore
import LoadingScreen from "../Navigation/LoadingScreen";
import Error from "../Navigation/Error";
import NegotiationPurchaseTab from "../Purchases/NegotiationPurchaseTab";
import { getNegotiation } from "../../store/actions/negotiationActions";
import NegotiationProductsTab from "../Products/NegotiationProductsTab";
import { Helmet } from "react-helmet-async";
import GenericFileList from "../Files/GenericFileList";
import { apiURL } from "../App";
import Tabs from "../Widgets/Tabs";
import TabContent from "../Widgets/TabContent";
import TabsRow from "../Widgets/Tabs/TabsRow";
import Tab from "../Widgets/Tabs/Tab";
import CheckIcon from "../Widgets/CheckIcon";

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

    if (
        !(
            user.rol === "coordinador" ||
            user.rol === "observador" ||
            user.rol === "comprador" ||
            user.rol === "logistica"
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

    const state = 0;
    const defaultTab =
        (!negotiation.productos_cargados && "0") ||
        (negotiation.productos_cargados && "1");
    const percentageCompleted = 100;

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

                {/* <StatusBar>
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

                <div className="py-5"></div> */}

                <div className="w-100">
                    <Tabs defaultTab={defaultTab} className="flex-grow-1">
                        <TabsRow>
                            <Tab name="0">
                                <div className="d-flex align-items-center">
                                    <CheckIcon
                                        checked={negotiation.productos_cargados}
                                        className="icon-medium"
                                    />
                                    Cargar Productos
                                </div>
                            </Tab>

                            <Tab name="1">
                                <div className="d-flex align-items-center">
                                    <CheckIcon
                                        checked={state > 1}
                                        className="icon-medium"
                                    />
                                    Confirmar Productos
                                </div>
                            </Tab>

                            <Tab name="2">
                                <div className="d-flex align-items-center">
                                    <CheckIcon
                                        checked={state > 2}
                                        className="icon-medium"
                                    />
                                    Selección de proveedor
                                </div>
                            </Tab>

                            <Tab name="3">
                                <div className="d-flex align-items-center">
                                    <CheckIcon
                                        checked={state > 3}
                                        className="icon-medium"
                                    />
                                    Codigos de barra
                                </div>
                            </Tab>

                            <Tab name="4">
                                <div className="d-flex align-items-center">
                                    <CheckIcon
                                        checked={state > 4}
                                        className="icon-medium"
                                    />
                                    Base gráfico
                                </div>
                            </Tab>

                            <Tab name="5">
                                <div className="d-flex align-items-center">
                                    <CheckIcon
                                        checked={state > 5}
                                        className="icon-medium"
                                    />
                                    <span>Orden de compra</span>
                                </div>
                            </Tab>
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
