import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/actions/authActions";

function extractError(errors, error) {
    if (errors[error]) {
        return errors[error][0];
    }
}

const Login = () => {
    const dispatch = useDispatch();
    const [user, setUser] = useState({
        email: "",
        password: ""
    });

    const isLoggin = useSelector(state => state.auth.isLoggin);
    const errors = useSelector(state => state.auth.errors);
    const errorEmail = extractError(errors, "email");
    const errorPassword = extractError(errors, "password");
    const error = useSelector(state => state.auth.error);

    const handleSubmit = e => {
        e.preventDefault();

        dispatch(login(user));
    };

    const handleChange = e => {
        const id = e.target.id;

        setUser({
            ...user,
            [id]: e.target.value
        });
    };

    useEffect(() => {
        if (error) {
            setUser({ ...user, password: "" });
        }
    }, [error]);

    return (
        <div id="app">
            <div className="wrapper">
                <div className="main-panel">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-md-8">
                                <div className="card">
                                    <div className="card-header">
                                        Iniciar Sesión
                                    </div>

                                    <div className="card-body">
                                        <form>
                                            <div className="form-group col-md-12">
                                                <label
                                                    htmlFor="email"
                                                    className="bmd-label-floating"
                                                >
                                                    Email
                                                </label>
                                                <div>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        className={"form-control " + (errorEmail && "is-invalid")}
                                                        name="email"
                                                        required
                                                        autoComplete="email"
                                                        autoFocus
                                                        onChange={handleChange}
                                                        value={user.email}
                                                    />
                                                    {errorEmail && (
                                                        <div className="text-danger">
                                                            <strong>
                                                                {errorEmail}
                                                            </strong>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="form-group col-md-12">
                                                <label
                                                    htmlFor="password"
                                                    className="bmd-label-floating"
                                                >
                                                    Contraseña
                                                </label>

                                                <div>
                                                    <input
                                                        id="password"
                                                        type="password"
                                                        className={"form-control " + (errorPassword && "is-invalid")}
                                                        name="password"
                                                        required
                                                        autoComplete="current-password"
                                                        onChange={handleChange}
                                                        value={user.password}
                                                    />

                                                    {errorPassword && (
                                                        <div className="text-danger">
                                                            <strong>
                                                                {errorPassword}
                                                            </strong>
                                                        </div>
                                                    )}

                                                    {error && (
                                                        <div className="text-danger">
                                                            <strong>
                                                                {error}
                                                            </strong>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>

                                            <div className="form-group col-md-12">
                                                <div className="">
                                                    <button
                                                        type="submit"
                                                        className="btn btn-primary"
                                                        onClick={handleSubmit}
                                                        disabled={
                                                            isLoggin
                                                                ? true
                                                                : false
                                                        }
                                                    >
                                                        Iniciar sesión
                                                    </button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
