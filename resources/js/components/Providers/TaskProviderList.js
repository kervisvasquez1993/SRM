import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProvidersFromTask } from "../../store/actions/providerActions";
import ProviderCard from "../Providers/ProviderCard";

const TaskProviderList = () => {
    const dispatch = useDispatch();
    const providers = useSelector(state => state.provider.providers);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProvidersFromTask(id));
    }, []);

    return (
        <div className="d-flex flex-column-reverse">
            {providers.map(provider => {
                return (
                    <ProviderCard key={provider.id} provider={provider} />
                );
            })}
        </div>
    );
};

export default TaskProviderList;
