import React, { useEffect } from "react";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { openModal } from "../../store/actions/modalActions";
import { getUsers } from "../../store/actions/userActions";
import { useUser } from "../../utils";
import EmptyList from "../Navigation/EmptyList";
import LoadingScreen from "../Navigation/LoadingScreen";
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
    const loggedUser = useUser();
    // @ts-ignore
    const users = useSelector(state => state.user.users);
    // @ts-ignore
    const isLoadingList = useSelector(state => state.user.isLoadingList);

    const [orderedUsers, setOrderedUsers] = useState([]);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    useEffect(() => {
        // Ordenar la lista de usuarios para que el usuario salga de primer lugar
        const newList = users.sort((a, b) => (a.id === loggedUser.id ? -1 : 1));

        setOrderedUsers(newList);
    }, [users]);

    const helmet = (
        <Helmet>
            <title>{`Usuarios - ${process.env.MIX_APP_NAME}`}</title>
        </Helmet>
    );

    if (isLoadingList) {
        return <LoadingScreen>{helmet}</LoadingScreen>;
    }

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Crear Usuario",
                body: <UserModal formData={emptyUser} isEditor={false} />
            })
        );
    };

    return (
        <React.Fragment>
            {helmet}
            <h1 className="text-center my-5">Usuarios</h1>

            {orderedUsers.length === 0 && <EmptyList />}

            {loggedUser.rol === "coordinador" && (
                <LargeCreateButton onClick={handleCreate} />
            )}

            <div className="user-cards">
                {orderedUsers.map(item => {
                    return <UserCard key={item.id} user={item} />;
                })}
            </div>
        </React.Fragment>
    );
};

export default UserList;
