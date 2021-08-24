import React from "react";
import { useDispatch } from "react-redux";
import { updateProductionDeliveryTime } from "../../store/actions/productionActions";
import InputDate from "../Form/InputDate";
import GenericFormModal from "../Table/GenericFormModal";

const DeliveryTimeFormModal = ({ formData }) => {
    const dispatch = useDispatch();

    console.log(formData);

    const onSubmit = data => {
        dispatch(updateProductionDeliveryTime(data));
    };

    return (
        <GenericFormModal formData={formData} onSubmit={onSubmit}>
            <InputDate
                id="fecha_fin_produccion"
                label="Fecha de entrega (aproximada)"
            />
        </GenericFormModal>
    );
};

export default DeliveryTimeFormModal;
