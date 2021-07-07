import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductClaims } from "../../../store/actions/claimActions";
import { openModal } from "../../../store/actions/modalActions";
import EmptyList from "../../Navigation/EmptyList";
import LoadingScreen from "../../Navigation/LoadingScreen";
import LargeCreateButton from "../../Widgets/LargeCreateButton";
import ProductClaimCard from "./ProductClaimCard";
import ProductClaimModal from "./ProductClaimModal";

const emptyClaim = {
    titulo: "",
    descripcion: ""
};

const ProductClaimList = () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const claim = useSelector(state => state.claim.current);
    const productClaims = useSelector(state => state.claim.productClaims);

    const areIncidentsLoading = useSelector(
        // @ts-ignore
        state => state.claim.areClaimsLoading
    );

    useEffect(() => {
        dispatch(getProductClaims(claim.id));
    }, []);

    const handleCreate = () => {
        dispatch(
            openModal({
                title: "Agregar Reclamo",
                body: (
                    <ProductClaimModal
                        parentId={claim.id}
                        formData={emptyClaim}
                    />
                )
            })
        );
    };

    return (
        <React.Fragment>
            <div className="mr-auto text-center py-2">
                <h2>Reclamos</h2>
            </div>

            {areIncidentsLoading ? (
                <LoadingScreen />
            ) : (
                <React.Fragment>
                    {productClaims.length === 0 && <EmptyList />}

                    <LargeCreateButton onClick={handleCreate} />
                    <div className="d-flex flex-column-reverse">
                        {productClaims.length > 0 &&
                            productClaims.map(item => {
                                return (
                                    <ProductClaimCard
                                        data={item}
                                        key={item.id}
                                    />
                                );
                            })}
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

export default ProductClaimList;
