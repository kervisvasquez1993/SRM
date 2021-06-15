import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductions } from "../../store/actions/productionActions";
import EmptyList from "../Navigation/EmptyList";
import ProductionCard from "./ProductionCard";

const ProductionList = () => {
    const dispatch = useDispatch();
    const productions = useSelector(state => state.production.list);

    useEffect(() => {
        dispatch(getProductions());
    }, []);

    return (
        <React.Fragment>
            <h1 className="text-center my-5">Producción y Transito</h1>

            {productions.length > 0 ? (
                <div className="d-flex flex-column-reverse">
                    {productions.map(item => {
                        return (
                            <ProductionCard key={item.id} production={item} />
                        );
                    })}
                </div>
            ) : (
                <EmptyList />
            )}
        </React.Fragment>
    );
};

export default ProductionList;
