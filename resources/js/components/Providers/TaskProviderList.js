import React, { useEffect, useState } from "react";
import { BiGitCompare } from "react-icons/bi";
import { IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import { getProvidersFromTask } from "../../store/actions/providerActions";
import { isNegotiationSelected } from "../../utils";
import EmptyList from "../Navigation/EmptyList";
import LoadingScreen from "../Navigation/LoadingScreen";
import ProviderCard from "../Providers/ProviderCard";
import NewProviderModal from "./ProviderModal";

const TaskProviderList = () => {
    const dispatch = useDispatch();

    // @ts-ignore
    const providers = useSelector(state => state.provider.providers);
    // @ts-ignore
    const isLoading = useSelector(state => state.provider.isLoadingList);
    // @ts-ignore
    const user = useSelector(state => state.auth.user);
    // @ts-ignore
    const task = useSelector(state => state.task.task);

    const [orderedProviders, setOrderedProviders] = useState([]);

    const selectedProvider = providers.find(provider =>
        isNegotiationSelected(provider.pivot)
    );

    useEffect(() => {
        dispatch(getProvidersFromTask(task.id));
    }, []);

    useEffect(() => {
        const ordered = providers.sort((x, y) => {
            const x1 = x.pivot.seleccionado;
            const y1 = y.pivot.seleccionado;

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
                body: <NewProviderModal />
            })
        );
    };

    const isMine = user.id == task.usuario.id;

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <React.Fragment>
            <div className="mr-auto text-center">
                <h2 className="py-4">Empresas Asociadas</h2>
                {isMine && !selectedProvider && (
                    <button
                        className="btn btn-lg btn-success btn-round"
                        onClick={handleCreateProvider}
                    >
                        <IoMdAddCircle className="mr-2" />
                        Agregar Empresa
                    </button>
                )}

                {providers.length > 1 && (
                    <Link
                        to={`/tasks/${task.id}/comparator`}
                        className="btn btn-lg btn-round btn-info"
                    >
                        <BiGitCompare className="icon-normal" />
                        Comparar
                    </Link>
                )}
            </div>

            {orderedProviders.length > 0 ? (
                <div className="d-flex flex-column-reverse">
                    {orderedProviders.map(provider => {
                        return (
                            <ProviderCard
                                key={provider.id}
                                // @ts-ignore
                                taskId={task.id}
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
