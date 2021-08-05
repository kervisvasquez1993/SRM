import React from "react";
import ProductsTab from "../Products/ProductsTab";
import ProviderTab from "../Providers/ProviderTab";
import PurchaseTab from "../Purchases/PurchaseTab";
import TaskTab from "../Tasks/TaskTab";
import TabButton from "../Widgets/TabButton";
import TabContent from "../Widgets/TabContent";
import Tabs from "../Widgets/Tabs";

const NegotiationTabs = ({ negotiation }) => {
    const { tarea, proveedor, usuario } = negotiation;

    return (
        <div className="modal-body">
            <Tabs defaultTab="task">
                <ul
                    className="nav nav-pills d-flex flex-column flex-lg-row justify-content-center mb-4"
                    role="tablist"
                >
                    <TabButton name="task">
                        <i className="material-icons">task</i>
                        Tarea
                    </TabButton>

                    <TabButton name="business">
                        <i className="material-icons">business</i>
                        Proveedor
                    </TabButton>

                    <TabButton name="products">
                        <i className="material-icons">inventory_2</i>
                        Productos
                    </TabButton>

                    {/* <TabButton name="purchase">
                        <i className="material-icons">receipt_long</i>
                        Compras
                    </TabButton> */}
                </ul>

                <div className="tab-content tab-space p-2">
                    <TabContent name="task">
                        <TaskTab task={tarea} user={usuario} />
                    </TabContent>
                    <TabContent name="business">
                        <ProviderTab provider={proveedor} />
                    </TabContent>
                    <TabContent name="products">
                        <ProductsTab negotiation={negotiation} />
                    </TabContent>
                    {/* <TabContent name="purchase">
                        <PurchaseTab negotiation={negotiation} />
                    </TabContent> */}
                </div>
            </Tabs>
        </div>
    );
};

export default NegotiationTabs;
