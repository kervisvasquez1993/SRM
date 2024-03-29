import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// @ts-ignore
import { Redirect, useParams } from "react-router-dom";
// @ts-ignore
import LoadingScreen from "../../Navigation/LoadingScreen";
import Error from "../../Navigation/Error";
import NegotiationPurchaseTab from "./NegotiationPurchaseTab";
import { getNegotiation } from "../../../store/actions/negotiationActions";
import NegotiationProductsTab from "./NegotiationProductsTab";
import { Helmet } from "react-helmet-async";
import GenericFileList from "../../Files/GenericFileList";
import { apiURL } from "../../App";
import Tabs from "../../Widgets/Tabs";
import TabContent from "../../Widgets/TabContent";
import TabsRow from "../../Widgets/Tabs/TabsRow";
import Tab from "../../Widgets/Tabs/Tab";
import CheckIcon from "../../Widgets/CheckIcon";
import ProductsConfirmationTab from "./ProductsConfirmationTab";
import SupplierSelectionTab from "./SupplierSelectionTab";
import BarCodeTab from "./BarCodeTab";
import BaseGraficoTab from "./BaseGraficoTab";
import { useUser } from "../../../utils";

const ProviderPurchase = () => {
    const user = useUser();
    const dispatch = useDispatch();
    // @ts-ignore
    const { id } = useParams();
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

    let defaultTab =
        (negotiation.orden_compra_directa && "5") ||
        (negotiation.base_grafico_finalizado && "5") ||
        (negotiation.codigo_barra_finalizado && "4") ||
        (negotiation.seleccionado &&
            negotiation.productos_confirmados &&
            "3") ||
        (negotiation.seleccionado &&
            !negotiation.productos_confirmados &&
            "1") ||
        (negotiation.productos_confirmados && "2") ||
        (negotiation.productos_cargados && "1") ||
        (!negotiation.productos_cargados && "0");

    return (
        <React.Fragment>
            <Helmet>
                <title>{`${negotiation.proveedor.nombre} - ${process.env.MIX_APP_NAME}`}</title>
            </Helmet>

            <div className="d-flex flex-column align-items-center">
                <h2 className="h2 py-4">Proceso</h2>

                <div className="w-100 mb-5">
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
                                        checked={
                                            negotiation.productos_confirmados
                                        }
                                        className="icon-medium"
                                    />
                                    Confirmar Productos
                                </div>
                            </Tab>

                            <Tab name="2">
                                <div className="d-flex align-items-center">
                                    <CheckIcon
                                        checked={negotiation.seleccionado}
                                        className="icon-medium"
                                    />
                                    Selección de proveedor
                                </div>
                            </Tab>

                            <Tab name="3">
                                <div className="d-flex align-items-center">
                                    <CheckIcon
                                        checked={
                                            negotiation.codigo_barra_finalizado
                                        }
                                        className="icon-medium"
                                    />
                                    Codigos de barra
                                </div>
                            </Tab>

                            <Tab name="4">
                                <div className="d-flex align-items-center">
                                    <CheckIcon
                                        checked={
                                            negotiation.base_grafico_finalizado
                                        }
                                        className="icon-medium"
                                    />
                                    Base gráfico
                                </div>
                            </Tab>

                            <Tab name="5">
                                <div className="d-flex align-items-center">
                                    <CheckIcon
                                        checked={negotiation.orden_compra}
                                        className="icon-medium"
                                    />
                                    <span>Orden de compra</span>
                                </div>
                            </Tab>
                        </TabsRow>

                        <TabContent name="0">
                            <NegotiationProductsTab />
                        </TabContent>
                        <TabContent name="1">
                            <ProductsConfirmationTab />
                        </TabContent>
                        <TabContent name="2">
                            <SupplierSelectionTab />
                        </TabContent>
                        <TabContent name="3">
                            <BarCodeTab />
                        </TabContent>
                        <TabContent name="4">
                            <BaseGraficoTab />
                        </TabContent>
                        <TabContent name="5">
                            <NegotiationPurchaseTab />
                        </TabContent>
                    </Tabs>
                </div>

                {user.rol !== "logistica" && (
                    <React.Fragment>
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
                    </React.Fragment>
                )}
            </div>
        </React.Fragment>
    );
};

export default ProviderPurchase;
