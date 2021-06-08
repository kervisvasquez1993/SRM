import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNegotiations } from "../../store/actions/negotiationActions";
import NegotiationCard from "./NegotiationCard";

const NegotiationList = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);
    const negotiations = useSelector(state => state.negotiation.negotiations);

    useEffect(() => {
        dispatch(getNegotiations());
    }, []);

    return (
        <React.Fragment>
            <h1 className="text-center my-5">Negociaciones</h1>

            {negotiations.map(negotiation => {
                return (
                    <NegotiationCard
                        key={negotiation.id}
                        negotiation={negotiation}
                    />
                );
            })}
        </React.Fragment>
    );
};

export default NegotiationList;
