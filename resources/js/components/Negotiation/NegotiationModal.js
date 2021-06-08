import React, { useState } from "react";
import EmptyList from "../Navigation/EmptyList";

const NegotiationModal = ({ negotiation }) => {
    const [currentTab, setCurrentTab] = useState("task");

    const { compra, tarea, proveedor } = negotiation;

    const handleClickTab = (e, name) => {
        e.preventDefault();
        setCurrentTab(name);
    };

    const isProductListEmpty =
        negotiation.total_cbm == 0 &&
        negotiation.total_n_w == 0 &&
        negotiation.total_g_w == 0 &&
        negotiation.total_ctn == 0;

    return (
        <React.Fragment>
            <ul
                className="nav nav-pills nav-pills-success nav-pills-icons mb-4"
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
                        <i className="material-icons">list</i>
                        Tarea
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
                        <i className="material-icons">fact_check</i>
                        Compra
                    </a>
                </li>
            </ul>

            <div className="tab-content tab-space">
                <div
                    className={`tab-pane ${
                        currentTab === "task" ? "active" : ""
                    }`}
                ></div>
                <div
                    className={`tab-pane ${
                        currentTab === "products" ? "active" : ""
                    }`}
                >
                    {isProductListEmpty ? (
                        <EmptyList message="No hay productos registrados" />
                    ) : (
                        <React.Fragment>
                            <p>
                                <strong>Total CBM : </strong>
                                {negotiation.total_cbm}
                            </p>
                            <p>
                                <strong>Total Peso Neto (kg) : </strong>
                                {negotiation.total_n_w}
                            </p>
                            <p>
                                <strong>Total Peso Bruto (kg): </strong>
                                {negotiation.total_g_w}
                            </p>
                            <p>
                                <strong>Total CTN : </strong>
                                {negotiation.total_ctn}
                            </p>
                        </React.Fragment>
                    )}
                </div>

                <div
                    className={`tab-pane ${
                        currentTab === "purchase" ? "active" : ""
                    }`}
                >
                    {compra ? (
                        <React.Fragment>
                            <p>
                                <strong>Orden de Compra : </strong>
                                {compra.orden_compra}
                            </p>
                            <p>
                                <strong>Item : </strong>
                                {compra.item}
                            </p>
                            <p>
                                <strong>Registro Salud : </strong>
                                {compra.registro_salud}
                            </p>
                            <p>
                                <strong>Cantidad PCS : </strong>
                                {compra.cantidad_pcs}
                            </p>
                            <p>
                                <strong>Descripción : </strong>
                                {compra.descripcion}
                            </p>
                            <p>
                                <strong>Total: </strong>
                                {compra.total}
                            </p>
                        </React.Fragment>
                    ) : (
                        <EmptyList message="No se ha añadido una orden de compra" />
                    )}
                </div>
            </div>
        </React.Fragment>
    );
};

export default NegotiationModal;
