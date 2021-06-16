import React from "react";
import TabButton from "../UI/TabButton";
import TabContent from "../UI/TabContent";
import Tabs from "../UI/Tabs";

const ArtModal = ({ artId, defaultTab = "ficha" }) => {
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
                                Creación de Fichas
                            </TabButton>
                            <TabButton name="validacion_ficha">
                                <i className="material-icons">receipt_long</i>
                                Validación de Fichas
                            </TabButton>
                            <TabButton name="boceto">
                                <i className="material-icons">receipt_long</i>
                                Bocetos
                            </TabButton>
                            <TabButton name="validacion_boceto">
                                <i className="material-icons">receipt_long</i>
                                Validación de Bocetos
                            </TabButton>
                            <TabButton name="confirmacion_proveedor">
                                <i className="material-icons">receipt_long</i>
                                Confirmación de Proveedor
                            </TabButton>
                        </ul>

                        <div className="tab-content tab-space p-2">
                            <TabContent name="ficha">
                                Hello World 1
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
