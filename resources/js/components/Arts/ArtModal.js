import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArt } from "../../store/actions/artActions";
import IncidentsTab from "../Incidents/IncidentsTab";
import LoadingScreen from "../Navigation/LoadingScreen";
import TabButton from "../Widgets/TabButton";
import TabContent from "../Widgets/TabContent";
import Tabs from "../Widgets/Tabs";

const ArtModal = ({ id }) => {
    const dispatch = useDispatch();
    const art = useSelector(state => state.art.current);
    const defaultTab = useSelector(state => state.modal.defaultTab) || "ficha";

    useEffect(() => {
        dispatch(getArt(id));
    }, []);

    if (!art) {
        return <LoadingScreen />;
    }

    return (
        <React.Fragment>
            <div className="modal-body">
                <React.Fragment>
                    <Tabs defaultTab={defaultTab}>
                        <ul
                            className="nav nav-pills nav-pills-success nav-pills-icons justify-content-center flex-column"
                            role="tablist"
                        >
                            <TabButton name="ficha">
                                <i className="material-icons">receipt_long</i>
                                Incidencias con Creación de Fichas
                            </TabButton>
                            <TabButton name="validacion_ficha">
                                <i className="material-icons">receipt_long</i>
                                Incidencias con Validación de Fichas
                            </TabButton>
                            <TabButton name="boceto">
                                <i className="material-icons">receipt_long</i>
                                Incidencias con Bocetos
                            </TabButton>
                            <TabButton name="validacion_boceto">
                                <i className="material-icons">receipt_long</i>
                                Incidencias con Validación de Bocetos
                            </TabButton>
                            <TabButton name="confirmacion_proveedor">
                                <i className="material-icons">receipt_long</i>
                                Incidencias con Confirmación de Proveedor
                            </TabButton>
                        </ul>

                        <div className="tab-content tab-space p-2">
                            <TabContent name="ficha">
                                {/* <FichaTab /> */}
                                <IncidentsTab
                                    stateName="art"
                                    url1="arte"
                                    url2="ficha"
                                    title="Incidencias con Creación de Fichas"
                                />
                            </TabContent>
                            <TabContent name="validacion_ficha">
                                <IncidentsTab
                                    stateName="art"
                                    url1="arte"
                                    url2="validacion_ficha"
                                    title="Incidencias con Validación de Fichas"
                                />
                            </TabContent>
                            <TabContent name="boceto">
                                <IncidentsTab
                                    stateName="art"
                                    url1="arte"
                                    url2="boceto"
                                    title="Incidencias con Bocetos"
                                />
                            </TabContent>
                            <TabContent name="validacion_boceto">
                                <IncidentsTab
                                    stateName="art"
                                    url1="arte"
                                    url2="validacion_boceto"
                                    title="Incidencias con Validación de Bocetos"
                                />
                            </TabContent>
                            <TabContent name="confirmacion_proveedor">
                                <IncidentsTab
                                    stateName="art"
                                    url1="arte"
                                    url2="confirmacion_proveedor"
                                    title="Incidencias con Confirmación de Proveedor"
                                />
                            </TabContent>
                        </div>
                    </Tabs>
                </React.Fragment>
            </div>
        </React.Fragment>
    );
};

export default ArtModal;
