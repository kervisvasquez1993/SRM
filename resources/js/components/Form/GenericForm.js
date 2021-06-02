import React, { createContext, useState } from "react";

export const FormContext = createContext();

const GenericForm = props => {
    const { handleSubmit, disableSubmit, handleReset, onChange } = props;

    const [value] = useState({
        ...props
    });

    return (
        <FormContext.Provider value={value}>
            <form className="form-horizontal" onSubmit={handleSubmit}>
                {props.children}

                <div className="form-group mb-10">
                    <button
                        className="btn btn-sm btn-outline-success btn-round"
                        type="submit"
                        disabled={disableSubmit}
                    >
                        Enviar
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
