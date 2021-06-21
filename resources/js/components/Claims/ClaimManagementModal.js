import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClaim } from "../../store/actions/claimActions";
import IncidentsTab from "../Incidents/IncidentsTab";
import LoadingScreen from "../Navigation/LoadingScreen";
import TabButton from "../Widgets/TabButton";
import TabContent from "../Widgets/TabContent";
import Tabs from "../Widgets/Tabs";

const ClaimManagementModal = ({ claimId }) => {
    const dispatch = useDispatch();
    const claim = useSelector(state => state.claim.current);
    const tabToUse = useSelector(state => state.modal.defaultTab) || "incidencia_recepcion";

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
                            <TabButton name="incidencia_recepcion">
                                <i className="material-icons">receipt_long</i>
                                Incidencias con Recepción de Mercancía
                            </TabButton>

                            <TabButton name="inspeccion_carga">
                                <i className="material-icons">receipt_long</i>
                                Incidencias con Inspección de Carga
                            </TabButton>

                            <TabButton name="reclamos_devolucion">
                                <i className="material-icons">receipt_long</i>
                                Incidencias con Reclamos y Devoluciones
                            </TabButton>
                        </ul>

                        <div className="tab-content tab-space p-2">
                            <TabContent name="incidencia_recepcion">
                                <IncidentsTab
                                    stateName="claim"
                                    url1="reclamos_devoluciones"
                                    url2="incidencia_recepcion"
                                    title="Incidencias con Recepción de Mercancía"
                                ></IncidentsTab>
                            </TabContent>
                            <TabContent name="inspeccion_carga">
                                <IncidentsTab
                                    stateName="claim"
                                    url1="reclamos_devoluciones"
                                    url2="inspeccion_carga"
                                    title="Incidencias con Inspección de Carga"
                                ></IncidentsTab>
                            </TabContent>
                            <TabContent name="reclamos_devolucion">
                                <IncidentsTab
                                    stateName="claim"
                                    url1="reclamos_devoluciones"
                                    url2="reclamos_devolucion"
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
