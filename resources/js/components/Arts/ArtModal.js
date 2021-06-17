import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArt } from "../../store/actions/artActions";
import LoadingScreen from "../Navigation/LoadingScreen";
import TabButton from "../UI/TabButton";
import TabContent from "../UI/TabContent";
import Tabs from "../UI/Tabs";
import FichaTab from "./Ficha/FichaTab";

const ArtModal = ({ id, defaultTab = "ficha" }) => {
    const dispatch = useDispatch();
    const art = useSelector(state => state.art.current);

    useEffect(() => {
        dispatch(getArt(id));
    }, [])

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
                                <FichaTab />
                            </TabContent>
                            <TabContent name="validacion_ficha">
                                Hello World 2
                            </TabContent>
                            <TabContent name="boceto">
                                Hello World 3
                            </TabContent>
                            <TabContent name="validacion_boceto">
                                Hello World 4
                            </TabContent>
                            <TabContent name="confirmacion_proveedor">
                                Hello World 5
                            </TabContent>
                        </div>
                    </Tabs>
                </React.Fragment>
            </div>
        </React.Fragment>
    );
};

export default ArtModal;
