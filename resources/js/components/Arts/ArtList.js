import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArts } from "../../store/actions/artActions";
import EmptyList from "../Navigation/EmptyList";
import ArtCard from "./ArtCard";

const ArtList = () => {
    const dispatch = useDispatch();
    const arts = useSelector(state => state.art.list);

    useEffect(() => {
        dispatch(getArts());
    }, []);

    return (
        <React.Fragment>
            <h1 className="text-center my-5">Artes</h1>

            {arts.length > 0 ? (
                <div className="d-flex flex-column-reverse">
                    {arts.map(item => {
                        return (
                            <ArtCard key={item.id} art={item} />
                        );
                    })}
                </div>
            ) : (
                <EmptyList />
            )}
        </React.Fragment>
    );
};

export default ArtList;
