import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { getClaims } from "../../store/actions/claimActions";
import { useUser } from "../../utils";
import ClaimCard from "./ClaimCard";

const ClaimsList = () => {
    const dispatch = useDispatch();
    const user = useUser();

    const claims = useSelector(state => state.claim.list);

    if (!(user.rol === "coordinador" || user.rol === "comprador")) {
        return <Redirect to="/home" />;
    }

    useEffect(() => {
        dispatch(getClaims());
    }, []);

    return (
        <React.Fragment>
            <h1 className="text-center my-5">Reclamos y Devoluciones</h1>

            <div className="d-flex flex-column-reverse">
                {claims.map(item => (
                    <ClaimCard key={item.id} claim={item} />
                ))}
            </div>
        </React.Fragment>
    );
};

export default ClaimsList;
