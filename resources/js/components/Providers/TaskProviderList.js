import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProvidersFromTask } from "../../store/actions/providerActions";
import { isNegotiationCompleted } from "../../utils";
import EmptyList from "../Navigation/EmptyList";
import ProviderCard from "../Providers/ProviderCard";

const TaskProviderList = () => {
    const dispatch = useDispatch();
    const providers = useSelector(state => state.provider.providers);
    const [orderedProviders, setOrderedProviders] = useState([]);
    const { id } = useParams();

    const selectedProvider = providers.find(provider => isNegotiationCompleted(provider.pivot));

    useEffect(() => {
        dispatch(getProvidersFromTask(id));
    }, []);

    useEffect(() => {
        const ordered = providers.sort((x, y) => {
            const x1 = x.pivot.iniciar_negociacion;
            const y1 = y.pivot.iniciar_negociacion;

            if (x == selectedProvider) {
                return 1;
            } else if (y == selectedProvider) {
                return -1;
            }

            return x1 === y1 ? 0 : x1 > y1 ? 1 : -1;
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
                                selectedProvider={selectedProvider}
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
