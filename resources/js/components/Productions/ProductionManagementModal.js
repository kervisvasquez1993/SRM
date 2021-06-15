import React from "react";
import TabButton from "../UI/TabButton";
import TabContent from "../UI/TabContent";
import Tabs from "../UI/Tabs";
import PaymentsTab from "./Payments/PaymentsTab";

const ProductionManagementModal = ({ production }) => {
    return (
        <React.Fragment>
            <div className="modal-body">
                <React.Fragment>
                    <Tabs defaultTab="payments">
                        <ul
                            className="nav nav-pills nav-pills-success nav-pills-icons justify-content-center flex-column"
                            role="tablist"
                        >
                            <TabButton name="payments">
                                <i className="material-icons">receipt_long</i>
                                Pagos
                            </TabButton>

                            <TabButton name="inicio_produccion">
                                <i className="material-icons">receipt_long</i>
                                Inicio de Producción
                            </TabButton>

                            <TabButton name="fin_produccion">
                                <i className="material-icons">receipt_long</i>
                                Fin de Producción
                            </TabButton>

                            <TabButton name="transito_nacionalizacion">
                                <i className="material-icons">receipt_long</i>
                                Transito Nacionalización
                            </TabButton>
                        </ul>

                        <div className="tab-content tab-space p-2">
                            <TabContent name="payments">
                                <PaymentsTab production={production} />
                            </TabContent>
                            <TabContent name="inicio_produccion">
                                Contenido
                            </TabContent>
                            <TabContent name="fin_produccion">
                                Contenido
                            </TabContent>
                            <TabContent name="transito_nacionalizacion">
                                Contenido
                            </TabContent>
                        </div>
                    </Tabs>
                </React.Fragment>
            </div>
        </React.Fragment>
    );
};

export default ProductionManagementModal;
