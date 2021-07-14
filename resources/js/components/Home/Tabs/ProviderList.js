import React, { useEffect, useState } from "react";
import { BiLink } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProvidersFromTask } from "../../../store/actions/providerActions";
import { isNegotiationCompleted } from "../../../utils";
import EmptyList from "../../Navigation/EmptyList";
import SimpleProviderCard from "../SimpleProviderCard";

const ProviderList = ({ taskId, filterProvidersInNegotiation = false }) => {
    const dispatch = useDispatch();

    // @ts-ignore
    const providers = useSelector(state => state.provider.providers);
    const [orderedProviders, setOrderedProviders] = useState([]);
    const selectedProvider = providers.find(provider =>
        isNegotiationCompleted(provider.pivot)
    );

    useEffect(() => {
        dispatch(getProvidersFromTask(taskId));

        return () => {
            dispatch({
                type: "CLEAR_PROVIDERS"
            });
        };
    }, []);

    useEffect(() => {
        let ordered = providers.sort((x, y) => {
            const x1 = x.pivot.iniciar_negociacion;
            const y1 = y.pivot.iniciar_negociacion;

            if (x == selectedProvider) {
                return 1;
            } else if (y == selectedProvider) {
                return -1;
            }

            return x1 === y1 ? 0 : x1 > y1 ? 1 : -1;
        });

        if (filterProvidersInNegotiation) {
            ordered = providers.filter(item => item.pivot.iniciar_negociacion);
        }

        setOrderedProviders(ordered);
    }, [providers]);

    return (
        <React.Fragment>
            {orderedProviders.length > 0 ? (
                <div className="d-flex flex-column-reverse">
                    {orderedProviders.map(provider => {
                        return (
                            <SimpleProviderCard
                                key={provider.id}
                                taskId={taskId}
                                provider={provider}
                                selectedProvider={selectedProvider}
                            />
                        );
                    })}
                </div>
            ) : (
                <EmptyList message="No se han agregado empresas" />
            )}
        </React.Fragment>
    );
};

export default ProviderList;
