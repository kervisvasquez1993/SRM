import { capitalize } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { createUser } from "../../store/actions/userActions";
import InputSelect from "../Form/InputSelect";
import InputText from "../Form/InputText";
import GenericFormModal from "../Table/GenericFormModal";

const roles = ["coordinador", "comprador", "observador", "artes"];

const UserModal = ({ formData }) => {
    const dispatch = useDispatch();

    const onSubmit = data => {
        dispatch(createUser(data));
    };

    return (
        <GenericFormModal formData={formData} onSubmit={onSubmit}>
            <InputText id="name" label="Nombre" />
            <InputSelect id="rol" label="Rol">
                {roles.map(item => {
                    return (
                        <option key={item} value={item}>
                            {capitalize(item)}
                        </option>
                    );
                })}
            </InputSelect>
            <InputText id="email" label="Email" />
            <InputText type="password" id="password" label="Password" />
        </GenericFormModal>
    );
};

export default UserModal;
