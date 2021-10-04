import React from "react";
import { useDispatch } from "react-redux";
import { updateProductionDate } from "../../store/actions/productionActions";
import InputDate from "../Form/InputDate";
import GenericFormModal from "../Table/GenericFormModal";

const ProductionDateFormModal = ({ label, id, production }) => {
    const dispatch = useDispatch();

    const onSubmit = data => {
        dispatch(updateProductionDate(data));
    };

    return (
        <GenericFormModal formData={production} onSubmit={onSubmit}>
            <InputDate id={id} label={label} />
        </GenericFormModal>
    );
};

export default ProductionDateFormModal;
