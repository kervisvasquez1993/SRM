import React from "react";
import { MdAttachMoney } from "react-icons/md";
import { AiOutlineBarcode } from "react-icons/ai";
import EmptyList from "../Navigation/EmptyList";
import SmallCard from "../Widgets/SmallCard";

const PurchaseTab = ({ negotiation }) => {
    const { compras_total: totalPurchase, compra_po: poCode } = negotiation;

    return (
        <React.Fragment>
            {totalPurchase > 0 ? (
                <React.Fragment>
                    <div className="row px-2">
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
        </React.Fragment>
    );
};

export default PurchaseTab;
