import React, { useEffect } from "react";
import { BiLink } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProduction } from "../../../store/actions/productionActions";
import { getPaymentsInfoFromProduction } from "../../../utils";
import EmptyList from "../../Navigation/EmptyList";
import LoadingScreen from "../../Navigation/LoadingScreen";
import CheckIcon from "../../Widgets/CheckIcon";

const ProductionStageTab = ({ productionId }) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const production = useSelector(state => state.production.current);
    // @ts-ignore
    const isLoading = useSelector(state => state.production.isLoading);

    useEffect(() => {
        dispatch(getProduction(productionId));

        return () => {
            dispatch({
                type: "REMOVE_PRODUCTION"
            });
        };
    }, []);

    if (isLoading) {
        return <LoadingScreen />;
    }

    const {
        prepaymentPercentage,
        isCompletelyPaid
    } = getPaymentsInfoFromProduction(production);

    return (
        <React.Fragment>
            <h3 className="text-center">Producción</h3>

            {production ? (
                <React.Fragment>
                    <ul className="list-group">
                        <li className="list-group-item d-flex align-items-center">
                            <strong>Inicio de Producción</strong>
                            <CheckIcon checked={production.inicio_produccion} />
                        </li>

                        <li className="list-group-item d-flex align-items-center">
                            <strong>Pago Anticipado</strong>
                            <CheckIcon checked={prepaymentPercentage > 0} />
                        </li>

                        <li className="list-group-item d-flex align-items-center">
                            <strong>Pago Balance</strong>
                            <CheckIcon checked={isCompletelyPaid} />
                        </li>

                        <li className="list-group-item d-flex align-items-center">
                            <strong>Fin de Producción</strong>
                            <CheckIcon checked={production.fin_produccion} />
                        </li>

                        <li className="list-group-item d-flex align-items-center">
                            <strong>Transito Nacionalización</strong>
                            <CheckIcon
                                checked={production.transito_nacionalizacion}
                            />
                        </li>

                        <li className="list-group-item d-flex align-items-center">
                            <strong>Salida Puerto Origen</strong>
                            <CheckIcon
                                checked={production.salida_puero_origen}
                            />
                        </li>
                    </ul>

                    <div className="text-center my-3">
                        <Link
                            to={`/productions/?id=${production.id}`}
                            className="btn btn-info btn-round"
                        >
                            Ver Detalles
                            <BiLink className="icon-normal ml-2" />
                        </Link>
                    </div>
                </React.Fragment>
            ) : (
                <EmptyList message="No se ha iniciado arte" />
            )}
        </React.Fragment>
    );
};

export default ProductionStageTab;
