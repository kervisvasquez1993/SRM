import React, { useEffect, useState } from "react";
import { BiLink } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProvidersFromTask } from "../../../store/actions/providerActions";
import { isNegotiationSelected } from "../../../utils";
import EmptyList from "../../Navigation/EmptyList";
import LoadingScreen from "../../Navigation/LoadingScreen";
import MiniSupplierCard from "../MiniSupplierCard";

const ProviderList = ({ taskId }) => {
    const dispatch = useDispatch();

    // @ts-ignore
    const suppliers = useSelector(state => state.provider.list);
    // @ts-ignore
    const isLoading = useSelector(state => state.provider.isLoadingList);

    const [orderedProviders, setOrderedProviders] = useState([]);
    const selectedProvider = suppliers.find(provider =>
        isNegotiationSelected(provider.pivot)
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
        let ordered = suppliers.sort((x, y) => {
            const x1 = x.pivot.seleccionado;
            const y1 = y.pivot.seleccionado;

            if (x == selectedProvider) {
                return 1;
            } else if (y == selectedProvider) {
                return -1;
            }

            return x1 === y1 ? 0 : x1 > y1 ? 1 : -1;
        });

        // console.log(providers)

        // if (filterProvidersInNegotiation) {
        //     ordered = providers.filter(item => item.pivot.seleccionado);
        // }

        setOrderedProviders(ordered);
    }, [suppliers]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <React.Fragment>
            {orderedProviders.length > 0 ? (
                <div className="d-flex flex-column-reverse">
                    {orderedProviders.map(provider => {
                        return (
                            <MiniSupplierCard
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
