import React from "react";
import { MdAttachMoney } from "react-icons/md";
import { AiOutlineBarcode } from "react-icons/ai";
import EmptyList from "../Navigation/EmptyList";
import SmallCard from "../Widgets/SmallCard";
import { Link } from "react-router-dom";
import { BiLink } from "react-icons/bi";

const PurchaseTab = ({ negotiation }) => {
    const { compras_total: totalPurchase, compra_po: poCode } = negotiation;

    return (
        <React.Fragment>
            {totalPurchase > 0 ? (
                <React.Fragment>
                    <div className="row px-2  mb-3">
                        <SmallCard
                            label="Total de Compra"
                            icon={<MdAttachMoney className="icon-normal" />}
                            backgroundClass="bg-success"
                        >
                            {totalPurchase}
                        </SmallCard>

                        <SmallCard
                            label="Código PO"
                            icon={<AiOutlineBarcode className="icon-normal" />}
                            backgroundClass="bg-secondary"
                        >
                            {poCode || (
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
        </React.Fragment>
    );
};

export default PurchaseTab;
