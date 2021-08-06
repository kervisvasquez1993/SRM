import React from "react";
import SmallCard from "./SmallCard";
import { MdAttachMoney } from "react-icons/md";
import { roundMoneyAmount } from "../../utils";

const PurchaseOrdersResume = ({ compras_total }) => {
    return (
        <React.Fragment>
            <div className="resume-card-body resume-card-body-1">
                <SmallCard
                    label="Total a Pagar"
                    icon={<MdAttachMoney className="icon-normal" />}
                >
                    {roundMoneyAmount(compras_total)}
                </SmallCard>
            </div>
        </React.Fragment>
    );
};

export default PurchaseOrdersResume;
