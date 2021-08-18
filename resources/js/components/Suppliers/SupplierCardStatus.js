import React from "react";
import CheckIcon from "../Widgets/CheckIcon";

const SupplierCardStatus = ({ provider, selectedProvider }) => {
    const isSelected = selectedProvider === provider;

    return (
        <React.Fragment>
            {(!selectedProvider || isSelected) && (
                <div className="d-flex flex-column flex-lg-row justify-content-center">
                    <div className="d-flex align-items-center mr-1">
                        <CheckIcon
                            checked={provider.pivot.productos_cargados}
                            className="icon-medium"
                        />
                        Cargar Productos
                    </div>

                    <div className="d-flex align-items-center mr-1">
                        <CheckIcon
                            checked={provider.pivot.productos_confirmados}
                            className="icon-medium"
                        />
                        Confirmar Productos
                    </div>

                    <div className="d-flex align-items-center mr-1">
                        <CheckIcon
                            checked={provider.pivot.seleccionado}
                            className="icon-medium"
                        />
                        Selección de proveedor
                    </div>

                    <div className="d-flex align-items-center mr-1">
                        <CheckIcon
                            checked={provider.pivot.codigo_barra_finalizado}
                            className="icon-medium"
                        />
                        Codigos de barra
                    </div>

                    <div className="d-flex align-items-center mr-1">
                        <CheckIcon
                            checked={provider.pivot.base_grafico_finalizado}
                            className="icon-medium"
                        />
                        Base gráfico
                    </div>

                    <div className="d-flex align-items-center mr-1">
                        <CheckIcon
                            checked={provider.pivot.orden_compra}
                            className="icon-medium"
                        />
                        <span>Orden de compra</span>
                    </div>
                </div>
            )}

            {selectedProvider &&
                (isSelected ? (
                    <div className="text-center mt-4">
                        <span className="material-icons">done</span>
                        <span className="material-icons mr-2">done</span>
                        <strong className="h4 m-0">
                            Esta empresa fue escogida para continuar con
                            producción y arte
                        </strong>
                    </div>
                ) : (
                    <div className="text-center">
                        <span className="material-icons mr-2">close</span>
                        <strong className="h4 m-0">
                            Esta empresa fue descartada
                        </strong>
                    </div>
                ))}
        </React.Fragment>
    );
};

export default SupplierCardStatus;
