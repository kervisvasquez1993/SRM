import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getReceptionItems } from "../../../store/actions/claimActions";
import { dateToShortString, getSum, roundMoneyAmount } from "../../../utils";

const ReceptionTable = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const receptionItems = useSelector(state => state.claim.receptionItems);
    // @ts-ignore
    const { id } = useParams();

    useEffect(() => {
        dispatch(getReceptionItems(id));
    }, []);

    return (
        <React.Fragment>
            {receptionItems.length > 0 && (
                <div className="table-responsive table-text mt-5">
                    <table className="table table-sm table-hover table-bordered fade-in">
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col" colSpan={13}>
                                    RECEPCION DE MERCANCIA
                                </th>
                                <th scope="col" colSpan={6}>
                                    PACKING LIST
                                </th>
                            </tr>
                            <tr>
                                <th scope="col">Codigo Sistema</th>
                                <th scope="col" style={{ minWidth: "200px" }}>
                                    Descripción Sistema
                                </th>
                                <th scope="col" style={{ minWidth: "70px" }}>
                                    Lote
                                </th>
                                <th scope="col">Vence</th>
                                <th scope="col">Total Recibido (unidades)</th>
                                <th scope="col">U/M</th>
                                <th scope="col">Cantidad U/M</th>
                                <th scope="col">Total Unidades X Bulto</th>
                                <th scope="col">CANT. EMP. Intermedio</th>
                                <th scope="col">U/M EMP. Intermedio</th>
                                <th scope="col">UNIDADES EN BULTO RESTO</th>
                                <th scope="col">PRESENTACION</th>
                                <th scope="col">REFERENCIA / CATALOGO</th>
                                <th scope="col">U/M</th>
                                <th scope="col">CANTIDAD DE UM</th>
                                <th scope="col">UNIDADES EN UM</th>
                                <th scope="col">TOTAL EN UNIDADES PL</th>
                                <th scope="col">Validación</th>
                                <th scope="col" style={{ minWidth: "100px" }}>
                                    Observaciones
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {receptionItems.map(product => {
                                return (
                                    <tr key={product.id} className="fade-in">
                                        <th scope="row">
                                            {product.codigo_sistema}
                                        </th>
                                        <td>{product.descripcion}</td>
                                        <td>{product.lote}</td>
                                        <td>
                                            {dateToShortString(
                                                new Date(product.vence)
                                            )}
                                        </td>
                                        <td>
                                            {product.total_recibido_en_unidades}
                                        </td>
                                        <td>{product.u_m}</td>
                                        <td>{product.cantidad_u_m}</td>
                                        <td>{product.total_unidades_bulto}</td>
                                        <td>
                                            {
                                                product.cantidad_empaque_intermedio
                                            }
                                        </td>
                                        <td>
                                            {product.u_m_empaque_intermedio}
                                        </td>
                                        <td>
                                            {product.unidades_en_bulto_resto}
                                        </td>
                                        <td>{product.presentacion}</td>
                                        <td>{product.referencia_catalogo}</td>
                                        <td>{product.packing_u_m}</td>
                                        <td>{product.packing_cantidad_u_m}</td>
                                        <td>{product.packing_unidades_u_m}</td>
                                        <td>
                                            {product.packing_total_unidad_spl}
                                        </td>
                                        <td>{product.validacion}</td>
                                        <td>{product.observaciones}</td>
                                    </tr>
                                );
                            })}
                            <tr>
                                <td></td>
                                <th scope="row">Total</th>

                                <th scope="row" colSpan={2}></th>
                                <th scope="row">
                                    {roundMoneyAmount(
                                        getSum(
                                            receptionItems,
                                            "total_recibido_en_unidades"
                                        )
                                    )}
                                </th>
                                <td></td>
                                <th scope="row">
                                    {roundMoneyAmount(
                                        getSum(receptionItems, "cantidad_u_m")
                                    )}
                                </th>
                                <th scope="row" colSpan={7}></th>
                                <th scope="row">
                                    {roundMoneyAmount(
                                        getSum(
                                            receptionItems,
                                            "packing_cantidad_u_m"
                                        )
                                    )}
                                </th>
                                <td></td>
                                <th scope="row">
                                    {roundMoneyAmount(
                                        getSum(
                                            receptionItems,
                                            "packing_total_unidad_spl"
                                        )
                                    )}
                                </th>
                                <th
                                    scope="row border-0 borderless "
                                    colSpan={2}
                                ></th>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}
        </React.Fragment>
    );
};

export default ReceptionTable;
