import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../store/actions/userActions";
import EmptyList from "../Navigation/EmptyList";
import LargeCreateButton from "../UI/LargeCreateButton";
import UserCard from "./UserCard";

const UserList = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.user.users);

    useEffect(() => {
        dispatch(getUsers());
    }, []);

    const handleCreate = () => {
        console.log("Crear usuario");
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
