import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClaim } from "../../store/actions/claimActions";
import { getProduction } from "../../store/actions/productionActions";
import IncidentsTab from "../Incidents/IncidentsTab";
import LoadingScreen from "../Navigation/LoadingScreen";
import TabButton from "../Widgets/TabButton";
import TabContent from "../Widgets/TabContent";
import Tabs from "../Widgets/Tabs";

const ClaimManagementModal = ({ claimId }) => {
    const dispatch = useDispatch();
    const claim = useSelector(state => state.claim.current);
    const tabToUse = useSelector(state => state.modal.defaultTab) || "recepcion_mercancia";

    useEffect(() => {
        dispatch(getClaim(claimId));
    }, []);

    if (!claim) {
        return <LoadingScreen />;
    }

    return (
        <React.Fragment>
            <div className="modal-body">
                <React.Fragment>
                    <Tabs defaultTab={tabToUse}>
                        <ul
                            className="nav nav-pills nav-pills-success nav-pills-icons justify-content-center flex-column"
                            role="tablist"
                        >
                            <TabButton name="recepcion_mercancia">
                                <i className="material-icons">receipt_long</i>
                                Incidencias con Recepción de Mercancía
                            </TabButton>

                            <TabButton name="inspeccion_carga">
                                <i className="material-icons">receipt_long</i>
                                Incidencias con Inspección de Carga
                            </TabButton>

                            <TabButton name="reclamos_devoluciones">
                                <i className="material-icons">receipt_long</i>
                                Incidencias con Reclamos y Devoluciones
                            </TabButton>
                        </ul>

                        <div className="tab-content tab-space p-2">
                            <TabContent name="recepcion_mercancia">
                                <IncidentsTab
                                    stateName="claim"
                                    url1="reclamos_devoluciones"
                                    url2="recepcion_mercancia"
                                    title="Incidencias con Recepción de Mercancía"
                                ></IncidentsTab>
                            </TabContent>
                            <TabContent name="inspeccion_carga">
                                <IncidentsTab
                                    stateName="production"
                                    url1="reclamos_devoluciones"
                                    url2="inspeccion_carga"
                                    title="Incidencias con Inspección de Carga"
                                ></IncidentsTab>
                            </TabContent>
                            <TabContent name="reclamos_devoluciones">
                                <IncidentsTab
                                    stateName="production"
                                    url1="reclamos_devoluciones"
                                    url2="reclamos_devoluciones"
                                    title="Incidencias con Reclamos y Devoluciones"
                                ></IncidentsTab>
                            </TabContent>
                        </div>
                    </Tabs>
                </React.Fragment>
            </div>
        </React.Fragment>
    );
};

export default ClaimManagementModal;
