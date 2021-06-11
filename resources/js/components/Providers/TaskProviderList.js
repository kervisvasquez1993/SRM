import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import { getProvidersFromTask } from "../../store/actions/providerActions";
import { isNegotiationCompleted } from "../../utils";
import EmptyList from "../Navigation/EmptyList";
import ProviderCard from "../Providers/ProviderCard";
import ProviderModal, { emptyProvider } from "./ProviderModal";

const TaskProviderList = () => {
    const dispatch = useDispatch();

    const providers = useSelector(state => state.provider.providers);
    const user = useSelector(state => state.auth.user);
    const task = useSelector(state => state.task.task);

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

    const handleCreateProvider = () => {
        dispatch(
            openModal({
                title: "Agregar Empresa",
                body: <ProviderModal provider={emptyProvider} taskId={id} />
            })
        );
    };

    const isMine = user.id == task.usuario.id;

    return (
        <React.Fragment>
            <div className="mr-auto text-center">
                <h2 className="py-4">Empresas Asociadas</h2>
                {isMine && !selectedProvider && (
                    <button
                        className="btn btn-lg btn-outline-primary btn-round"
                        onClick={handleCreateProvider}
                    >
                        Agregar Empresa
                    </button>
                )}
            </div>

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
