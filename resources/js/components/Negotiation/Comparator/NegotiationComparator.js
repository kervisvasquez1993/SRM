import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { MdAddCircle } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import { openModal } from "../../../store/actions/modalActions";
import { getTask } from "../../../store/actions/taskActions";
import LoadingScreen from "../../Navigation/LoadingScreen";
import AddComparisionModal from "./AddComparisionModal";
import ComparatorTable from "./ComparatorTable";

// const colors = ["green", "blue", "red", "bg-warning", "table-dark"];

// const getColor = index => {
//     return colors[index];
// };

export default () => {
    const dispatch = useDispatch();
    // @ts-ignore
    const { id: taskId } = useParams();

    // @ts-ignore
    const task = useSelector(state => state.task.task);
    // @ts-ignore
    const comparisions = useSelector(state => state.comparator.comparisions);

    const helmet = (
        <Helmet>
            <title>{`Comparación de Empresas - ${process.env.MIX_APP_NAME}`}</title>
        </Helmet>
    );

    useEffect(() => {
        dispatch(getTask(taskId, { negociaciones: true, productos: true }));
    }, []);

    const handleOpenModal = () => {
        dispatch(
            openModal({
                title: "Agregar Comparación",
                body: (
                    <AddComparisionModal
                        formData={{
                            id: v4(),
                            productName: "Ejemplo",
                            productIds: []
                        }}
                    />
                )
            })
        );
    };

    if (!task) {
        return <LoadingScreen>{helmet}</LoadingScreen>;
    }

    return (
        <React.Fragment>
            {helmet}

            {comparisions.map(item => {
                return (
                    <ComparatorTable
                        negotiations={task.negociaciones}
                        comparision={item}
                        key={item.productName}
                    />
                );
            })}

            {comparisions.length > 0 && <hr className="my-5" />}

            <div className="text-center">
                <button
                    className="btn btn-success mb-4"
                    onClick={handleOpenModal}
                >
                    <MdAddCircle className="mr-2" />
                    Agregar Comparación
                </button>
            </div>
        </React.Fragment>
    );
};
