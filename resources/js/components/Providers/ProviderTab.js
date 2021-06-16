import React from "react";

const ProviderTab = ({ provider }) => {
    return (
        <React.Fragment>
            <p>
                <strong>Nombre : </strong>
                {provider.nombre}
            </p>

            <p className="card-text keep-line-breaks">{provider.descripcion}</p>

            {(provider.pais || provider.ciudad || provider.distrito) && (
                <React.Fragment>
                    <h3 className="card-title mb-2">Ubicación</h3>

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
                    <h3 className="card-title mb-2">Contacto</h3>

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
        </React.Fragment>
    );
};

export default ProviderTab;
