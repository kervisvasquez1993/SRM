import React from "react";
import ReactDOM from "react-dom";
import { toast } from "react-toastify";

function Example() {
    const handleToast = () => {
        toast("✔️ La notificación funciona");
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <div className="card-header">Example Component</div>
                        <div className="card-body">
                            I'm an example component!
                        </div>
                        <button
                            className="btn btn-primary"
                            onClick={handleToast}
                        >
                            Test Toast
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Example;
