import React, { useEffect } from "react";
import { BiLink } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProduction } from "../../../store/actions/productionActions";
import { getPaymentInfoFromProduction } from "../../../utils";
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

    // AVISO: cuando se cierra el modal, en pocos casos puede que state.production.isLoading siga siendo false
    // por lo tanto puede que este if no se cumpla si no se ha cargado la producción y puede provocar que el modla
    // crashee la aplicación
    if (isLoading || !production || production.id != productionId) {
        return <LoadingScreen />;
    }

    const {
        prepaymentPercentage,
        isCompletelyPaid
    } = getPaymentInfoFromProduction(production);

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
                            <strong>Salida Puerto Origen</strong>
                            <CheckIcon
                                checked={production.salida_puero_origen}
                            />
                        </li>

                        <li className="list-group-item d-flex align-items-center">
                            <strong>Tránsito</strong>
                            <CheckIcon checked={production.transito} />
                        </li>

                        <li className="list-group-item d-flex align-items-center">
                            <strong>Nacionalización</strong>
                            <CheckIcon checked={production.nacionalizacion} />
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
