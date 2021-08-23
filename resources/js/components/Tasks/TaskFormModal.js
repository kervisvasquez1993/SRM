import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTask, editTask } from "../../store/actions/taskActions";
import InputSelect from "../Form/InputSelect";
import InputText from "../Form/InputText";
import InputDate from "../Form/InputDate";
import InputTextArea from "../Form/InputTextarea";
import GenericFormModal from "../Table/GenericFormModal";
import { getUsers } from "../../store/actions/userActions";
import { useUser } from "../../utils";
import Tabs from "../Widgets/Tabs";
import TabButton from "../Widgets/TabButton";
import TabContent from "../Widgets/TabContent";
import { BiPurchaseTagAlt, BiTask } from "react-icons/bi";
import { getSuppliers } from "../../store/actions/providerActions";
import { matchPath, useLocation } from "react-router-dom";

const TaskFormModal = ({ task = {}, isEditor = false }) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const users = useSelector(state => state.user.users);
    const user = useUser();
    const filteredUsers = users.filter(
        user => user.rol === "coordinador" || user.rol === "comprador"
    );

    const location = useLocation();

    const genericFormMethods = useRef(null);

    // @ts-ignore
    const suppliers = useSelector(state => state.provider.fullList);

    const arePersonalTasks = matchPath(location.pathname, {
        path: "/me/tasks"
    });

    useEffect(() => {
        dispatch(getUsers());
        dispatch(getSuppliers());
    }, []);

    const handleSubmit = data => {
        data = { ...data, tareasPersonales: arePersonalTasks };

        if (isEditor) {
            dispatch(editTask(data));
        } else {
            dispatch(createTask(data));
        }
    };

    const userList = (
        <div className="form-row">
            <InputSelect id="user_id" label="Comprador">
                {filteredUsers.map(user => {
                    return (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    );
                })}
            </InputSelect>
        </div>
    );

    const handleTabChange = () => {
        // Reiniciar el formulario al cambiar de pestañas
        if (!isEditor) {
            genericFormMethods.current.setData({});
        }
    };

    return (
        <GenericFormModal
            formData={task}
            onSubmit={handleSubmit}
            methods={genericFormMethods}
        >
            <Tabs defaultTab="normal" onChangeTab={handleTabChange}>
                <ul
                    className="nav nav-pills d-flex flex-column flex-lg-row justify-content-center mb-4"
                    role="tablist"
                >
                    <TabButton name="normal">
                        <BiTask className="icon-normal mr-2" />
                        Tarea
                    </TabButton>

                    <TabButton name="purchase">
                        <BiPurchaseTagAlt className="icon-normal mr-2" />
                        Con orden de compra
                    </TabButton>
                </ul>

                <TabContent name="normal">
                    <div className="form-row">
                        <InputText id="nombre" label="Titulo de la Tarea" />
                    </div>

                    {user.rol === "coordinador" && (
                        <React.Fragment>
                            {!arePersonalTasks && userList}

                            <div className="form-row">
                                <InputDate
                                    id="fecha_fin"
                                    label="Fecha Finalizacion"
                                />
                            </div>
                        </React.Fragment>
                    )}

                    <div className="form-row">
                        <InputTextArea id="descripcion" label="Descripción" />
                    </div>
                </TabContent>

                <TabContent name="purchase">
                    <div className="form-row">
                        <InputText id="nombre" label="Titulo de la Tarea" />
                    </div>

                    {!arePersonalTasks && userList}

                    <div className="form-row">
                        <InputTextArea id="descripcion" label="Descripción" />
                    </div>

                    <div className="form-row">
                        <InputSelect id="proveedor_id" label="Empresa">
                            {suppliers.map(supplier => {
                                return (
                                    <option
                                        key={supplier.id}
                                        value={supplier.id}
                                    >
                                        {`${supplier.nombre} - País: ${supplier.pais} - Ciudad: ${supplier.ciudad}`}
                                    </option>
                                );
                            })}
                        </InputSelect>
                    </div>
                </TabContent>
            </Tabs>
        </GenericFormModal>
    );
};

export default TaskFormModal;
