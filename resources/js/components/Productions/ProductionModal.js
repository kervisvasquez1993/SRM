import React, { useState } from "react";
import { dateToString } from "../../utils";
import ProductsTab from "../Products/ProductsTab";
import ProviderTab from "../Providers/ProviderTab";
import PurchaseTab from "../Purchases/PurchaseTab";
import TaskTab from "../Tasks/TaskTab";

const ProductionModal = ({ production }) => {
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
                    <ul
                        className="nav nav-pills nav-pills-success nav-pills-icons mb-4 justify-content-center"
                        role="tablist"
                    >
                        <li className="nav-item">
                            <a
                                className={`nav-link ${
                                    currentTab === "task" ? "active" : ""
                                }`}
                                href="#"
                                role="tab"
                                onClick={e => handleClickTab(e, "task")}
                            >
                                <i className="material-icons">task</i>
                                Tarea
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${
                                    currentTab === "business" ? "active" : ""
                                }`}
                                href="#"
                                role="tab"
                                onClick={e => handleClickTab(e, "business")}
                            >
                                <i className="material-icons">business</i>
                                Proveedor
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${
                                    currentTab === "products" ? "active" : ""
                                }`}
                                href="#"
                                role="tab"
                                onClick={e => handleClickTab(e, "products")}
                            >
                                <i className="material-icons">inventory_2</i>
                                Productos
                            </a>
                        </li>
                        <li className="nav-item">
                            <a
                                className={`nav-link ${
                                    currentTab === "purchase" ? "active" : ""
                                }`}
                                href="#"
                                role="tab"
                                onClick={e => handleClickTab(e, "purchase")}
                            >
                                <i className="material-icons">receipt_long</i>
                                Compras
                            </a>
                        </li>
                    </ul>

                    <div className="tab-content tab-space p-2">
                        <div
                            className={`tab-pane ${
                                currentTab === "task" ? "active" : ""
                            }`}
                        >
                            <TaskTab task={task} user={usuario} />
                        </div>

                        <div
                            className={`tab-pane ${
                                currentTab === "business" ? "active" : ""
                            }`}
                        >
                            <ProviderTab provider={provider} />
                        </div>

                        <div
                            className={`tab-pane ${
                                currentTab === "products" ? "active" : ""
                            }`}
                        >
                            <ProductsTab negotiation={negotiation} />
                        </div>

                        <div
                            className={`tab-pane ${
                                currentTab === "purchase" ? "active" : ""
                            }`}
                        >
                            <PurchaseTab negotiation={negotiation} />
                        </div>
                    </div>
                </React.Fragment>
            </div>
        </React.Fragment>
    );
};

export default ProductionModal;
