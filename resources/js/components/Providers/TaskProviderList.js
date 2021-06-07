import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProvidersFromTask } from "../../store/actions/providerActions";
import EmptyList from "../Navigation/EmptyList";
import ProviderCard from "../Providers/ProviderCard";

const TaskProviderList = () => {
    const dispatch = useDispatch();
    const providers = useSelector(state => state.provider.providers);
    const [orderedProviders, setOrderedProviders] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProvidersFromTask(id));
    }, []);

    useEffect(() => {
        const ordered = providers.sort((x, y) => {
            x = x.pivot.iniciar_negociacion;
            y = y.pivot.iniciar_negociacion;

            return x === y ? 0 : x > y ? 1 : -1;
        });

        setOrderedProviders(ordered);
    }, [providers]);

    return (
        <React.Fragment>
            {orderedProviders.length > 0 ? (
                <div className="d-flex flex-column-reverse">
                    {orderedProviders.map(provider => {
                        return (
                            <ProviderCard
                                key={provider.id}
                                provider={provider}
                            />
                        );
                    })}
                </div>
            ) : (
                <EmptyList />
            )}
        </React.Fragment>
    );
};

export default TaskProviderList;
