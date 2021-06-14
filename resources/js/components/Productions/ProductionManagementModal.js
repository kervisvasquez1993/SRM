import React, { useState } from "react";
import { dateToString } from "../../utils";
import ProductsTab from "../Products/ProductsTab";
import ProviderTab from "../Providers/ProviderTab";
import PurchaseTab from "../Purchases/PurchaseTab";
import TaskTab from "../Tasks/TaskTab";
import TabButton from "../UI/TabButton";
import TabContent from "../UI/TabContent";
import Tabs from "../UI/Tabs";
import PaymentsTab from "./PaymentsTab";

const ProductionManagementModal = ({ production }) => {
    const [currentTab, setCurrentTab] = useState("task");

    const {
        pivot: {
            tarea: task,
            proveedor: provider,
            compras_total: totalPurchase,
            compra_po: poCode,
            usuario
        }
    } = production;

    const { pivot: negotiation } = production;

    const handleClickTab = (e, name) => {
        e.preventDefault();
        setCurrentTab(name);
    };

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
                                <PaymentsTab />
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
