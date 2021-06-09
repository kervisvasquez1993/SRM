import React, { useState } from "react";
import { dateToString, hasNoProducts } from "../../utils";
import EmptyList from "../Navigation/EmptyList";

const NegotiationModal = ({ negotiation }) => {
    const [currentTab, setCurrentTab] = useState("task");
    const {
        compra: purchase,
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
                                Compra
                            </a>
                        </li>
                    </ul>

                    <div className="tab-content tab-space p-2">
                        <div
                            className={`tab-pane ${
                                currentTab === "task" ? "active" : ""
                            }`}
                        >
                            <p>
                                <strong>Nombre : </strong>
                                {task.nombre}
                            </p>

                            <p className="d-flex">
                                <strong>Persona a cargo : </strong>
                                <span className="material-icons">person</span>
                                {usuario.name}
                            </p>

                            <p>
                                <strong>Fecha de Finalizacion : </strong>
                                {dateToString(new Date(task.fecha_fin))}
                            </p>

                            <p className="keep-line-breaks">
                                <strong>Descripción : </strong>
                                {task.descripcion}
                            </p>
                        </div>

                        <div
                            className={`tab-pane ${
                                currentTab === "business" ? "active" : ""
                            }`}
                        >
                            <p>
                                <strong>Nombre : </strong>
                                {provider.nombre}
                            </p>

                            <p className="card-text keep-line-breaks">
                                {provider.descripcion}
                            </p>

                            {(provider.pais ||
                                provider.ciudad ||
                                provider.distrito) && (
                                <React.Fragment>
                                    <h3 className="card-title mb-2">
                                        Ubicación
                                    </h3>

                                    {provider.pais && (
                                        <p className="card-text text-capitalize">
                                            <strong>País : </strong>
                                            {provider.pais.toLowerCase()}
                                        </p>
                                    )}

                                    {provider.ciudad && (
                                        <p className="card-text">
                                            <strong>Ciudad : </strong>
                                            {provider.ciudad}
                                        </p>
                                    )}

                                    {provider.distrito && (
                                        <p className="card-text">
                                            <strong>Distrito : </strong>
                                            {provider.distrito}
                                        </p>
                                    )}
                                </React.Fragment>
                            )}

                            {(provider.address ||
                                provider.telefono ||
                                provider.contacto ||
                                provider.email) && (
                                <React.Fragment>
                                    <h3 className="card-title mb-2">
                                        Contacto
                                    </h3>

                                    {provider.address && (
                                        <p className="card-text">
                                            <strong>Direccion : </strong>
                                            {provider.address}
                                        </p>
                                    )}

                                    {provider.telefono && (
                                        <p className="card-text">
                                            <strong>Teléfono : </strong>
                                            {provider.telefono}
                                        </p>
                                    )}
                                    {provider.contacto && (
                                        <p className="card-text">
                                            <strong>Contacto : </strong>
                                            {provider.contacto}
                                        </p>
                                    )}

                                    {provider.email && (
                                        <p className="card-text">
                                            <strong>Email : </strong>
                                            {provider.email}
                                        </p>
                                    )}

                                    {provider.contacto && (
                                        <p className="card-text">
                                            <strong>Contacto : </strong>
                                            {provider.contacto}
                                        </p>
                                    )}
                                </React.Fragment>
                            )}
                        </div>

                        <div
                            className={`tab-pane ${
                                currentTab === "products" ? "active" : ""
                            }`}
                        >
                            {hasNoProducts(negotiation) ? (
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
                            {purchase ? (
                                <React.Fragment>
                                    <p>
                                        <strong>Orden de Compra : </strong>
                                        {purchase.orden_compra}
                                    </p>
                                    <p>
                                        <strong>Item : </strong>
                                        {purchase.item}
                                    </p>
                                    <p>
                                        <strong>Registro Salud : </strong>
                                        {purchase.registro_salud}
                                    </p>
                                    <p>
                                        <strong>Cantidad PCS : </strong>
                                        {purchase.cantidad_pcs}
                                    </p>
                                    <p>
                                        <strong>Descripción : </strong>
                                        {purchase.descripcion}
                                    </p>
                                    <p>
                                        <strong>Total: </strong>
                                        {purchase.total}
                                    </p>
                                </React.Fragment>
                            ) : (
                                <EmptyList message="No se ha añadido una orden de compra" />
                            )}
                        </div>
                    </div>
                </React.Fragment>
            </div>

            {purchase ? (
                <div className="modal-footer">
                    <button type="button" className="btn btn-primary">
                        <span className="material-icons mr-2">brush</span>
                        Iniciar Arte
                    </button>
                    <button type="button" className="btn btn-info">
                        <span className="material-icons mr-2">
                            precision_manufacturing
                        </span>
                        Iniciar Producción
                    </button>
                    <div className="flex-grow-1 d-flex justify-content-end">
                        <button type="button" className="btn btn-success">
                            <span className="material-icons mr-2">
                                task_alt
                            </span>
                            Iniciar Arte y Producción
                        </button>
                    </div>
                </div>
            ) : (
                <div className="modal-footer bg-danger">
                    <p className="d-flex text-white align-items-center h6">
                        <span className="material-icons mr-2">warning</span>Esta
                        negociación no puede iniciar arte o producción hasta que
                        se le añada una orden de compra
                    </p>
                </div>
            )}
        </React.Fragment>
    );
};

export default NegotiationModal;
