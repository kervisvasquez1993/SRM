import React from "react";
import { MdAttachMoney } from "react-icons/md";
import { AiOutlineBarcode } from "react-icons/ai";
import EmptyList from "../Navigation/EmptyList";
import SmallCard from "../Widgets/SmallCard";
import { Link } from "react-router-dom";
import { BiLink } from "react-icons/bi";
import { dateToString, roundMoneyAmount } from "../../utils";
import { FcOvertime } from "react-icons/fc";
import { FaRegHandshake } from "react-icons/fa";
import { GiSandsOfTime } from "react-icons/gi";

const PurchaseTab = ({ negotiation }) => {
    const { compras_total: totalPurchase } = negotiation;

    return (
        <div className="my-3">
            {totalPurchase > 0 ? (
                <React.Fragment>
                    <div className="resume-card-body resume-card-body-5 mb-3">
                        <SmallCard
                            label="Total de Compra"
                            icon={<MdAttachMoney className="icon-normal" />}
                            backgroundClass="bg-success"
                        >
                            {roundMoneyAmount(totalPurchase)}
                        </SmallCard>

                        <SmallCard
                            label="Código PO"
                            icon={<AiOutlineBarcode className="icon-normal" />}
                            backgroundClass="bg-secondary"
                        >
                            {negotiation.compra_po || (
                                <span className="text-danger">
                                    No se ha agregado
                                </span>
                            )}
                        </SmallCard>

                        <SmallCard
                            label="Términos de Pago"
                            icon={<FaRegHandshake className="icon-normal" />}
                            backgroundClass="bg-info"
                        >
                            {negotiation.payment_terms || (
                                <span className="text-danger">
                                    No se ha agregado
                                </span>
                            )}
                        </SmallCard>

                        <SmallCard
                            label="Código HS"
                            icon={<AiOutlineBarcode className="icon-normal" />}
                            backgroundClass="bg-primary"
                        >
                            {negotiation.hs_code || (
                                <span className="text-danger">
                                    No se ha agregado
                                </span>
                            )}
                        </SmallCard>

                        <SmallCard
                            label="Tiempo de Entrega"
                            icon={<GiSandsOfTime className="icon-normal" />}
                            backgroundClass="bg-danger"
                        >
                            {dateToString(
                                new Date(negotiation.delivery_time)
                            ) || (
                                <span className="text-danger">
                                    No se ha agregado
                                </span>
                            )}
                        </SmallCard>
                    </div>
                </React.Fragment>
            ) : (
                <EmptyList message="No se ha añadido una orden de compra" />
            )}

            <div className="text-center">
                <Link
                    to={`/negotiation/${negotiation.id}`}
                    className="btn btn-info btn-round"
                >
                    Ver Detalles
                    <BiLink className="icon-normal ml-2" />
                </Link>
            </div>
        </div>
    );
};

export default PurchaseTab;
