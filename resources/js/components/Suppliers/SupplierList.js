import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../store/actions/modalActions";
import { getSuppliers } from "../../store/actions/providerActions";
import EmptyList from "../Navigation/EmptyList";
import LoadingScreen from "../Navigation/LoadingScreen";
import LargeCreateButton from "../Widgets/LargeCreateButton";
import SupplierCard from "./SupplierCard";
import SupplierFormModal, { emptyProvider } from "./SupplierFormModal";

export default () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const isLoadingList = useSelector(
        // @ts-ignore
        state => state.provider.isLoadingFullList
    );
    // @ts-ignore
    const suppliers = useSelector(state => state.provider.fullList);

    useEffect(() => {
        dispatch(getSuppliers());
    }, []);

    const helmet = (
        <Helmet>
            <title>{`Empresas - ${process.env.MIX_APP_NAME}`}</title>
        </Helmet>
    );

    if (isLoadingList) {
        return <LoadingScreen>{helmet}</LoadingScreen>;
    }

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Empresa",
                body: <SupplierFormModal provider={emptyProvider} />
            })
        );
    };

    return (
        <React.Fragment>
            <h1 className="text-center my-5">Empresas</h1>
            {suppliers.length === 0 && <EmptyList />}
            <LargeCreateButton onClick={handleCreate} />
            <div className="user-cards">
                {suppliers.map(item => (
                    <SupplierCard
                        supplier={item}
                        key={item.id}
                        haveNegotiation={false}
                    />
                ))}
            </div>
        </React.Fragment>
    );
};
