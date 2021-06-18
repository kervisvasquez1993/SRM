import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import { getUsers } from "../../store/actions/userActions";
import { useUser } from "../../utils";
import EmptyList from "../Navigation/EmptyList";
import LargeCreateButton from "../Widgets/LargeCreateButton";
import UserCard from "./UserCard";
import UserModal from "./UserModal";

const emptyUser = {
    name: "",
    rol: "",
    email: "",
    password: ""
};

const UserList = () => {
    const dispatch = useDispatch();
    const user = useUser();
    const users = useSelector(state => state.user.users);

    if (user.rol !== "coordinador") {
        return <Redirect to="/home" />;
    }

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Crear Usuario",
                body: <UserModal formData={emptyUser} />
            })
        );
    };

    return (
        <React.Fragment>
            <h1 className="text-center my-5">Usuarios</h1>
            {users.length === 0 && <EmptyList />}
            <LargeCreateButton onClick={handleCreate} />
            <div className="card-columns">
                {users.map(item => {
                    return <UserCard key={item.id} {...item} />;
                })}
            </div>
        </React.Fragment>
    );
};

export default UserList;
