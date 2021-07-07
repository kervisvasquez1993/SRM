import { capitalize } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
import { showGeneralError } from "../../store/actions/genericFormActions";
import { createUser, editUser } from "../../store/actions/userActions";
import InputSelect from "../Form/InputSelect";
import InputText from "../Form/InputText";
import GenericFormModal from "../Table/GenericFormModal";

const roles = ["coordinador", "comprador", "observador", "artes", 'almacen', 'presidente', 'logistica'];

const UserModal = ({ formData, isEditor }) => {
    const dispatch = useDispatch();

    const onSubmit = data => {
        if (data.password && data.password != data.password_confirmation) {
            dispatch(showGeneralError("Las contraseñas no coinciden"));
            return {
                ...data,
                password: "",
                password_confirmation: ""
            };
        }

        if (isEditor) {
            dispatch(editUser(data));
        } else {
            dispatch(createUser(data));
        }
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
            <InputText type="password" id="password" label="Contraseña" />
            <InputText
                type="password"
                id="password_confirmation"
                label="Confirmación de contraseña"
            />
        </GenericFormModal>
    );
};

export default UserModal;
