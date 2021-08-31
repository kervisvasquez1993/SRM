import { extractComparatorCellIndices } from "../../components/Comparator/ComparatorTable";
import { resize } from "../../utils";

const defaultState = {
    // task: null,

    comparisons: [],
    areComparisonsLoading: true,

    products: [],
    areProductsLoading: true,

    suppliers: [],
    areSuppliersLoading: true
    // negotiations: [],
    // products: [],
};

const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
};

const constructColumns = (state, comparisons) => {
    const newComparisons = comparisons.map(item => {
        return { ...item, state: [] };
    });

    // Recorrer todas las comparaciones
    comparisons.forEach(comparison => {
        // Recorrer todas las filas
        comparison.filas.forEach(row => {
            row.columns = Array.from(Array(state.suppliers.length), () => []);

            // Se deben ordenar de acuerdo al orden y proveedor
            state.suppliers.forEach((supplier, supplierIndex) => {
                // Obtener las celdas en esta fila del proveedor actual
                const celdas = row.celdas
                    .filter(item => item.proveedor_id === supplier.id)
                    .sort((x, y) => x.orden - y.orden);

                celdas.forEach(cell => {
                    // Agregar un objeto correspondiente a la celda
                    row.columns[supplierIndex] = [
                        ...row.columns[supplierIndex],
                        { id: cell.producto_id, cell: { ...cell } }
                    ];
                });
            });

            // // Rellenar los productos dentro de cada columna
            // row.celdas.forEach(cell => {
            //     // Obtener el indice del proveedor dentro del arreglo de proveedores
            //     const supplierIndex = state.suppliers.findIndex(
            //         item => item.id === cell.proveedor_id
            //     );
            //     // Agregar un objeto correspondiente a la celda
            //     row.columns[supplierIndex] = [
            //         ...row.columns[supplierIndex],
            //         { id: cell.producto_id, cell: { ...cell } }
            //     ];
            // });
        });
    });

    return newComparisons;
};

const comparatorReducer = (state = defaultState, action) => {
    const { type, payload } = action;

    if (type === "CHANGE_HISTORY") {
        return {
            ...state,
            comparisons: [],
            areComparisonsLoading: true,

            products: [],
            areProductsLoading: true,

            suppliers: [],
            areSuppliersLoading: true
            //task: null
        };
    }

    if (type === "GET_PRODUCT_LIST_SUCCESS") {
        return {
            ...state,
            products: payload,
            areProductsLoading: false
        };
    }

    if (type === "GET_COMPARISION_LIST_SUCCESS") {
        return {
            ...state,
            comparisons: constructColumns(state, payload),
            areComparisonsLoading: false
        };
    }

    if (type === "GET_SUPPLIER_LIST_SUCCESS") {
        return {
            ...state,
            suppliers: payload,
            areSuppliersLoading: false
        };
    }

    if (type === "ADD_COMPARATOR_SUCCESS") {
        let newComparisons = [...state.comparisons, { ...payload, state: [] }];

        // Recrear el attributo columns
        newComparisons = constructColumns(state, newComparisons);

        return {
            ...state,
            comparisons: newComparisons
        };
    }

    if (type === "UPDATE_COMPARATOR_SUCCESS") {
        let newComparisons = state.comparisons.map(item =>
            item.id === payload.id ? payload : item
        );

        // Recrear el attributo columns
        newComparisons = constructColumns(state, newComparisons);

        return {
            ...state,
            comparisons: newComparisons
        };
    }

    if (type === "DELETE_COMPARATOR_SUCCESS") {
        return {
            ...state,
            comparisons: state.comparisons.filter(item => item.id != payload.id)
        };
    }

    if (type === "CREATE_COMPARATOR_ROW_SUCCESS") {
        // Construir el atributo state en la fila nueva
        const newRow = {
            ...payload,
            celdas: []
        };

        // Insertar la fila nueva en la comparación correspondiente
        let newComparisons = state.comparisons.map(comparison => {
            if (comparison.id === payload.comparacion_id) {
                const newComparison = {
                    ...comparison,
                    filas: [...comparison.filas, newRow]
                };

                return newComparison;
            }

            return comparison;
        });

        // Recrear el attributo columns
        newComparisons = constructColumns(state, newComparisons);

        return {
            ...state,
            comparisons: newComparisons
        };
    }

    if (type === "DELETE_COMPARATOR_ROW_SUCCESS") {
        // Remover la fila de la comparación correspondiente
        const newComparisons = state.comparisons.map(comparison => {
            if (comparison.id === payload.comparacion_id) {
                return {
                    ...comparison,
                    filas: comparison.filas.filter(
                        item => item.id != payload.id
                    )
                };
            }

            return comparison;
        });

        return {
            ...state,
            comparisons: newComparisons
        };
    }

    if (type === "MOVE_COMPARATOR_ROW") {
        const {
            row,
            result: { source, destination }
        } = payload;

        let newComparisons = [...state.comparisons];

        // Encontrar la comparación correspondiente
        const targetComparision = newComparisons.find(
            item => item.id === row.comparacion_id
        );

        // Reordenar el arreglo de filas
        targetComparision.filas = reorder(
            targetComparision.filas,
            source.index,
            destination.index
        );

        // Recrear el attributo columns
        newComparisons = constructColumns(state, newComparisons);

        return {
            ...state,
            comparisons: newComparisons
        };
    }

    if (type === "MOVE_COMPARATOR_CELL") {
        let {
            comparison,
            result: { source, destination }
        } = payload;

        let newComparisons = [...state.comparisons];

        // Extraer coordenadas de la celda origen
        const [
            sourceRowIndex,
            sourceColumnIndex
        ] = extractComparatorCellIndices(source.droppableId);

        // Extraer coordenadas de la celda destino
        const [
            destinationRowIndex,
            destinationColumnIndex
        ] = extractComparatorCellIndices(destination.droppableId);

        // Comparison
        comparison = newComparisons.find(item => item.id === comparison.id);

        // Celda
        const dragCell =
            comparison.filas[sourceRowIndex].columns[sourceColumnIndex][
                source.index
            ].cell;

        const remoteSourceCell = comparison.filas[sourceRowIndex].celdas.find(
            item => item.id === dragCell.id
        );

        // Fila original
        const remoteSourceRow = comparison.filas[sourceRowIndex];
        const remoteSourceIndex = remoteSourceRow.celdas.indexOf(
            remoteSourceCell
        );

        // Fila destino
        const remoteDestinationRow = comparison.filas[destinationRowIndex];

        // Guardar las celdas debajo de la celda que se movera
        const sourceCells = remoteSourceRow.celdas.filter(
            item =>
                item.proveedor_id === remoteSourceCell.proveedor_id &&
                item.orden > source.index
        );

        // Mover dichos cards hacia arriba
        for (let _cell of sourceCells) {
            _cell.orden--;
        }

        // Guardar las celdas debajo de la ubicación a donde se movera
        const destinationCells = remoteDestinationRow.celdas.filter(
            item =>
                item.proveedor_id === remoteSourceCell.proveedor_id &&
                item.orden >= destination.index
        );

        // Mover dichos cards hacia abajo
        for (let _cell of destinationCells) {
            if (_cell.id != remoteSourceCell.id) {
                _cell.orden++;
            }
        }

        // Remover la celda que se está moviendo de la fila origen
        const [removed] = remoteSourceRow.celdas.splice(remoteSourceIndex, 1);

        // Agregar la celda eliminada en la fila destino
        remoteDestinationRow.celdas.push(removed);

        // Guardar la celda
        remoteSourceCell.orden = destination.index;
        remoteSourceCell.fila_id = remoteDestinationRow.id;

        // Recrear el attributo columns
        newComparisons = constructColumns(state, newComparisons);

        // const {
        //     comparison,
        //     result: { source, destination }
        // } = payload;

        // const newComparisons = [...state.comparisons];

        // const targetComparision = newComparisons.find(
        //     item => item.id === comparison.id
        // );

        // const sourceDropableId = source.droppableId;
        // const destinationDropableId = destination.droppableId;

        // // Extraer coordenadas de la celda origen
        // const [
        //     sourceRowIndex,
        //     sourceColumnIndex
        // ] = extractComparatorCellIndices(sourceDropableId);

        // // Extraer coordenadas de la celda destino
        // const [
        //     destinationRowIndex,
        //     destinationColumnIndex
        // ] = extractComparatorCellIndices(destinationDropableId);

        // // // Encontrar la columna del proveedor
        // // const supplierIndex = state.suppliers.findIndex(
        // //     item => item.id === cell.proveedor_id
        // // );

        // // Encontrar la fila original
        // const sourceRow = targetComparision.filas[sourceRowIndex];

        // // Encontrar la fila destino
        // const destinationRow = targetComparision.filas[destinationRowIndex];

        // // Remove the item from the source
        // const [removed] = sourceRow.columns[sourceColumnIndex].splice(
        //     source.index,
        //     1
        // );

        // // Add the item to the destination column
        // destinationRow.columns[destinationColumnIndex].splice(
        //     destination.index,
        //     0,
        //     removed
        // );

        return {
            ...state,
            comparisons: newComparisons
        };
    }

    if (type === "GET_TASK_FOR_COMPARISION_SUCCESS") {
        // Convertir el string de comparaciones en un objeto
        const comparaciones = payload.comparaciones;

        // Es necesario redimensionar los arreglos en caso de que una empresa sea agregada
        const negotiationCount = payload.negociaciones.length;
        comparaciones.forEach(comparacion => {
            comparacion.productIds = resize(
                comparacion.productIds,
                negotiationCount,
                []
            );

            // Se debe redimensionar el arreglo de columnas de cda comparacion
            comparacion.rows.forEach(row => {
                row.columns = resize(row.columns, negotiationCount, []);
            });
        });

        // Obtener un arreglo de todos los productos de las negociaciones filtradas
        const products = payload.negociaciones
            .map(item => item.productos)
            .flat();

        const newTask = {
            ...payload
        };

        return {
            ...state,
            task: JSON.parse(JSON.stringify(newTask)),
            products
        };
    }

    if (type === "ADD_NEGOTIATION_COMPARATOR") {
        return {
            ...state,
            task: {
                ...state.task,
                comparaciones: [...state.task.comparaciones, payload]
            }
            //comparisions: [...state.comparisions, payload]
        };
    }

    if (type === "UPDATE_COMPARISION_ROWS") {
        const newTask = {
            ...state.task,
            comparaciones: state.task.comparaciones.map(item =>
                item.id === payload.id ? { ...item, ...payload } : item
            )
        };

        return {
            ...state,
            task: newTask
        };
    }

    if (type === "DELETE_NEGOTIATION_COMPARATOR") {
        const newTask = {
            ...state.task,
            comparaciones: state.task.comparaciones.filter(
                item => item.id != payload
            )
        };

        return {
            ...state,
            task: newTask
        };
    }

    if (type === "EDIT_NEGOTIATION_COMPARATOR") {
        const newTask = {
            ...state.task,
            comparaciones: state.task.comparaciones.map(item =>
                item.id === payload.id ? payload : item
            )
        };

        return {
            ...state,
            task: newTask
        };
    }

    if (type === "UPDATE_COMPARATOR_CELL") {
        const newTask = {
            ...state.task
        };

        newTask.comparaciones[payload.comparisonIndex].rows[
            payload.rowIndex
        ].columns[payload.columnIndex][payload.cellIndex] = payload.data;

        return {
            ...state,
            task: newTask
        };
    }

    if (type === "DELETE_COMPARATOR_CELL") {
        const newTask = {
            ...state.task
        };

        // Informacion que se necesitara
        const comparacion = newTask.comparaciones[payload.comparisonIndex];
        newTask.comparaciones[payload.comparisonIndex];
        const array =
            comparacion.rows[payload.rowIndex].columns[payload.columnIndex];

        // Informacion de la celda
        const data = array[payload.cellIndex];
        const productId = data.id;

        // Primero se debe eliminar la celda
        array.splice(payload.cellIndex, 1);

        // Ahora se debe eliminar el id de la lista de productos
        comparacion.productIds[payload.columnIndex] = comparacion.productIds[
            payload.columnIndex
        ].filter(item => item != productId);

        return {
            ...state,
            task: newTask
        };
    }

    return state;
};

export default comparatorReducer;
