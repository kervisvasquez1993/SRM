import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    startArtWithNegotiation,
    startProductionWithNegotiation
} from "../../store/actions/negotiationActions";
import { dateToString, hasNoProducts } from "../../utils";
import EmptyList from "../Navigation/EmptyList";
import ProductsTab from "../Products/ProductsTab";
import ProviderTab from "../Providers/ProviderTab";
import PurchaseTab from "../Purchases/PurchaseTab";
import TaskTab from "../Tasks/TaskTab";

const NegotiationModal = ({ negotiation }) => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    const isStarting = useSelector(state => state.negotiation.isStarting);

    const [currentTab, setCurrentTab] = useState("task");
    const {
        id,
        iniciar_produccion,
        iniciar_arte,
        compras_total: totalPurchase,
        compra_po: poCode,
        tarea: task,
        proveedor: provider,
        usuario
    } = negotiation;

    const handleClickTab = (e, name) => {
        e.preventDefault();
        setCurrentTab(name);
    };

    const isProductListEmpty =
        negotiation.total_cbm == 0 &&
        negotiation.total_n_w == 0 &&
        negotiation.total_g_w == 0 &&
        negotiation.total_ctn == 0;

    const handleStartProduction = () => {
        dispatch(startProductionWithNegotiation(id));
    };

    const handleStartArt = () => {
        dispatch(startArtWithNegotiation(id));
    };

    const handleStartBoth = () => {
        handleStartArt();
        handleStartProduction();
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

            {(iniciar_arte === 1 || iniciar_produccion === 1) && (
                <div className="modal-footer bg-success flex-column align-items-start pl-4">
                    {iniciar_produccion === 1 && (
                        <p className="d-flex text-white align-items-center h6 pl-4">
                            <span className="material-icons mr-2">
                                check_circle
                            </span>
                            Producción iniciada
                        </p>
                    )}
                    {iniciar_arte === 1 && (
                        <p className="d-flex text-white align-items-center h6 pl-4">
                            <span className="material-icons mr-2">
                                check_circle
                            </span>
                            Arte iniciada
                        </p>
                    )}
                </div>
            )}

            {poCode ? (
                user.rol === "coordinador" &&
                (iniciar_arte === 0 || iniciar_produccion === 0) && (
                    <div className="modal-footer">
                        {iniciar_arte === 0 && (
                            <button
                                type="button"
                                className="btn btn-primary flex-grow-1"
                                onClick={handleStartArt}
                                disabled={isStarting || iniciar_arte === 1}
                            >
                                <span className="material-icons mr-2">
                                    brush
                                </span>
                                Iniciar Arte
                            </button>
                        )}

                        {iniciar_produccion === 0 && (
                            <button
                                type="button"
                                className="btn btn-info flex-grow-1"
                                onClick={handleStartProduction}
                                disabled={isStarting}
                            >
                                <span className="material-icons mr-2">
                                    precision_manufacturing
                                </span>
                                Iniciar Producción
                            </button>
                        )}
                        {!(iniciar_arte === 1 || iniciar_produccion === 1) && (
                            <button
                                type="button"
                                className="btn btn-success flex-grow-1"
                                onClick={handleStartBoth}
                                disabled={isStarting}
                            >
                                <span className="material-icons mr-2">
                                    task_alt
                                </span>
                                Iniciar Arte y Producción
                            </button>
                        )}
                    </div>
                )
            ) : (
                <div className="modal-footer bg-danger">
                    <p className="d-flex text-white align-items-center h6">
                        <span className="material-icons mr-2">warning</span>
                        Esta negociación no puede iniciar arte o producción sin
                        ordenes de compra y un codigo PO
                    </p>
                </div>
            )}
        </React.Fragment>
    );
};

export default NegotiationModal;
