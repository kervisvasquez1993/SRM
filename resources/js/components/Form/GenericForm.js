import React, { createContext } from "react";

export const FormContext = createContext(null);

const GenericForm = props => {
    const {
        handleSubmit,
        disableSubmit,
        handleReset = null,
        hideButtons = false,
        formId = "genericForm"
    } = props;

    return (
        <FormContext.Provider value={{ ...props }}>
            <form
                className="form-horizontal"
                onSubmit={handleSubmit}
                id={formId}
            >
                {props.children}

                {props.error && (
                    <div className="text-danger my-2">
                        <strong>{props.error}</strong>
                    </div>
                )}

                {!hideButtons && (
                    <div className="form-group mb-10">
                        <button
                            className="btn btn-success btn-round"
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
                                className="btn btn-warning btn-round"
                                type="reset"
                                onClick={handleReset}
                            >
                                Limpiar
                            </button>
                        )}
                    </div>
                )}
            </form>
        </FormContext.Provider>
    );
};

export default GenericForm;
