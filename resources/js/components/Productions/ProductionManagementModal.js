import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProduction } from "../../store/actions/productionActions";
import IncidentsTab from "../Incidents/IncidentsTab";
import LoadingScreen from "../Navigation/LoadingScreen";
import TabButton from "../Widgets/TabButton";
import TabContent from "../Widgets/TabContent";
import Tabs from "../Widgets/Tabs";
import PaymentsTab from "./Payments/PaymentsTab";

const ProductionManagementModal = ({ productionId }) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const production = useSelector(state => state.production.current);
    // @ts-ignore
    const tabToUse = useSelector(state => state.modal.defaultTab) || "payments";

    useEffect(() => {
        dispatch(getProduction(productionId));
    }, []);

    if (!production) {
        return <LoadingScreen />;
    }

    return (
        <React.Fragment>
            <div className="modal-body">
                <React.Fragment>
                    <Tabs defaultTab={tabToUse}>
                        <ul
                            className="nav nav-pills d-flex flex-column mb-4"
                            role="tablist"
                        >
                            <TabButton name="payments">
                                <i className="material-icons">receipt_long</i>
                                Pagos
                            </TabButton>

                            <TabButton name="inicio_produccion">
                                <i className="material-icons">receipt_long</i>
                                Incidencias con Inicio de Producción
                            </TabButton>

                            <TabButton name="fin_produccion">
                                <i className="material-icons">receipt_long</i>
                                Incidencias con Fin de Producción
                            </TabButton>

                            <TabButton name="incidencias_transito">
                                <i className="material-icons">receipt_long</i>
                                Incidencias con Transito Nacionalización
                            </TabButton>
                        </ul>

                        <div className="tab-content tab-space p-2">
                            <TabContent name="payments">
                                <PaymentsTab production={production} />
                            </TabContent>
                            <TabContent name="inicio_produccion">
                                <IncidentsTab
                                    stateName="production"
                                    url1="produccion_transito"
                                    url2="inicio_produccion"
                                    title="Incidencias con Inicio de Producción"
                                ></IncidentsTab>
                            </TabContent>
                            <TabContent name="fin_produccion">
                                <IncidentsTab
                                    stateName="production"
                                    url1="produccion_transito"
                                    url2="fin_produccion"
                                    title="Incidencias con Fin de Producción"
                                ></IncidentsTab>
                            </TabContent>
                            <TabContent name="incidencias_transito">
                                <IncidentsTab
                                    stateName="production"
                                    url1="produccion_transito"
                                    url2="incidencias_transito"
                                    title="Incidencias con Transito Nacionalización"
                                ></IncidentsTab>
                            </TabContent>
                        </div>
                    </Tabs>
                </React.Fragment>
            </div>
        </React.Fragment>
    );
};

export default ProductionManagementModal;
