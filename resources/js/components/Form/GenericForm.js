import React, { createContext, useState } from "react";

export const FormContext = createContext();

const GenericForm = props => {
    const { handleSubmit, disableSubmit, handleReset, onChange } = props;

    return (
        <FormContext.Provider value={{...props}}>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                {props.children}

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
                    <button
                        className="btn btn-sm btn-outline-warning btn-round"
                        type="reset"
                        onClick={handleReset}
                    >
                        Limpiar
                    </button>
                </div>
            </form>
        </FormContext.Provider>
    );
};

export default GenericForm;
