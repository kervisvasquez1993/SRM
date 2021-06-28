import React, { createContext, useState } from "react";

export const FormContext = createContext();

const GenericForm = props => {
    const { handleSubmit, disableSubmit, handleReset = null } = props;

    return (
        <FormContext.Provider value={{ ...props }}>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                {props.children}

                {props.error && (
                    <div className="text-danger my-2">
                        <strong>{props.error}</strong>
                    </div>
                )}

                <div className="form-group mb-10">
                    <button
                        className="btn btn-sm btn-outline-success btn-round"
                        type="submit"
                        disabled={disableSubmit}
                    >
                        {disableSubmit ? (
                            <div className="spinner-border spinner-border-sm">
                                <span className="sr-only">Loading...</span>
                            </div>
                        ) : (
                            "Enviar"
                        )}
                    </button>
                    {handleReset && (
                        <button
                            className="btn btn-sm btn-outline-warning btn-round"
                            type="reset"
                            onClick={handleReset}
                        >
                            Limpiar
                        </button>
                    )}
                </div>
            </form>
        </FormContext.Provider>
    );
};

export default GenericForm;
