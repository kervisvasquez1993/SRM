import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { NumberParam, useQueryParam } from "use-query-params";
import { focusOnElementWithId } from "./store/actions/focusActions";

export const milisecondsInMinute = 1000 * 60;
export const milisecondsInHour = 1000 * 60 * 60;
export const secondsInDay = 1000 * 60 * 60 * 24;

const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC"
};

const defaultShortOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    timeZone: "UTC"
};

export function dateToString(date, options = defaultOptions) {
    return new Intl.DateTimeFormat("default", options).format(date);
}

export function dateToShortString(date, options = defaultShortOptions) {
    return new Intl.DateTimeFormat("default", options).format(date);
}

export function getElapsedTimeString(date) {
    const days = Math.floor((new Date() - date) / secondsInDay);
    if (days > 0) {
        return days + "d";
    }
    const hours = Math.floor((new Date() - date) / milisecondsInHour);
    if (hours > 0) {
        return hours + "h";
    }
    const minutes = Math.floor((new Date() - date) / milisecondsInMinute);
    if (minutes > 0) {
        return minutes + "m";
    }

    return "ahora";
}

export const redCard = {
    text: "text-white",
    background: "bg-danger"
};

export const yellowCard = {
    text: "text-white",
    background: "bg-warning"
};

export const greenCard = {
    text: "text-white",
    background: "bg-success"
};

export const blueCard = {
    text: "text-white",
    background: "bg-blue"
};

export const normalCard = {
    text: "",
    background: ""
};

const blackCard = {
    text: "text-white",
    background: "bg-dark"
};

export function getColorsForTask(task) {
    return getColorsFromDates(
        new Date(task.created_at),
        new Date(task.fecha_fin)
    );
}

export function getColorsFromDates(startDate, finishDate) {
    const percentage = (finishDate - new Date()) / (finishDate - startDate);
    let days = getDaysBetweenDates(
        finishDate - new Date(),
        new Date(finishDate)
    );

    /*
    if (percentage < 0) {
        return blackCard;
    }

    if (days <= 2) {
        return redCard;
    } else if (days <= 4) {
        return yellowCard;
    } else {
        if (percentage < 0.333) {
            return redCard;
        } else if (percentage < 0.666) {
            return yellowCard;
        } else {
            return normalCard;
        }
    }
    */
    if (percentage < 0) {
        return redCard;
    }

    if (days <= 4) {
        return yellowCard;
    } else {
        if (percentage < 0.5) {
            return yellowCard;
        } else {
            return blueCard;
        }
    }
}

export function getDaysBetweenDates(startDate, finishDate) {
    return Math.ceil((finishDate - startDate) / secondsInDay);
}

export function getDaysToFinishTask(task) {
    return getDaysBetweenDates(
        new Date(task.created_at),
        new Date(task.fecha_fin)
    );
}

export function getRemainingDaysToFinishTask(task) {
    return Math.ceil((new Date(task.fecha_fin) - new Date()) / secondsInDay);
}

export function extractError(errors, error) {
    if (errors && errors[error]) {
        return errors[error][0];
    }
}

export function useUser() {
    const user = useSelector(state => state.auth.user);

    return user;
}

export function hasNoProducts(negotiation) {
    return (
        negotiation.total_cbm == 0 &&
        negotiation.total_n_w == 0 &&
        negotiation.total_g_w == 0 &&
        negotiation.total_ctn == 0
    );
}

export function getSum(array, column) {
    if (array.length === 0) {
        return 0;
    }

    let values = array.map(item => Number(item[column]));
    const result = values.reduce((a, b) => a + b);
    return values.reduce((a, b) => a + b);
}

export function isNegotiationCompleted(negotiation) {
    return negotiation.iniciar_produccion && negotiation.iniciar_arte;
}

// If a negotiation has started production and arts, then the rest of the providers of the same task
// must not been shown
export function filterNegotiations(negotiations) {
    negotiations.forEach(i => {
        if (isNegotiationCompleted(i)) {
            negotiations = negotiations.filter(j => {
                if (j.tarea.id === i.tarea.id && i != j) return false;
                return true;
            });
        }
    });

    return negotiations;
}

export function getPaymentsInfoFromProduction(production) {
    const {
        pivot: { compras_total: totalToPay },
        pagos: payments
    } = production;

    const totalPaid = getSum(payments, "monto");
    const paidPercentage = (totalPaid / totalToPay) * 100;
    const prepayment = totalPaid > 0 ? payments[0].monto : 0;
    const prepaymentPercentage = (prepayment / totalToPay) * 100;
    const remainingPayment = totalToPay - totalPaid;
    const remainingPercentage = (remainingPayment / totalToPay) * 100;

    const isPrepaymentDone = payments.length > 0;
    const isCompletelyPaid = paidPercentage >= 100;

    return {
        totalToPay: roundMoneyAmount(totalToPay),
        totalPaid: roundMoneyAmount(totalPaid),
        paidPercentage: roundMoneyAmount(paidPercentage),
        prepayment: roundMoneyAmount(prepayment),
        prepaymentPercentage: roundMoneyAmount(prepaymentPercentage),
        remainingPayment: roundMoneyAmount(remainingPayment),
        remainingPercentage: roundMoneyAmount(remainingPercentage),
        isPrepaymentDone,
        isCompletelyPaid
    };
}

export function roundMoneyAmount(amount) {
    return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export const preventDefault = e => {
    e.preventDefault();
};

export const className = (condition, value) => {
    return condition ? value : "";
};

export const isClaimCompleted = claim => {
    return (
        claim.recepcion_mercancia &&
        claim.inspeccion_carga &&
        claim.reclamos_devoluciones
    );
};

export const isArtCompleted = art => {
    return (
        art.creacion_fichas === "finalizado" &&
        art.validacion_fichas === "finalizado" &&
        art.creacion_boceto === "finalizado" &&
        art.validacion_boceto === "finalizado" &&
        art.confirmacion_proveedor === "finalizado"
    );
};
export const getNegotiationModalName = negotiation => {
    return `${negotiation.proveedor.nombre} - ${negotiation.proveedor.pais} - ${negotiation.proveedor.ciudad}`;
};

export const useSimpleUrlFocus = (ownId, paramName) => {
    const dispatch = useDispatch();
    const container = useRef(null);
    const focusOnId = useSelector(state => state.focus.focusOnId);
    const [queryId] = useQueryParam(paramName, NumberParam);
    const location = useLocation();
    const history = useHistory();
    const [className, setClassName] = useState("");

    useEffect(() => {
        if (focusOnId && focusOnId === ownId) {
            container.current.scrollIntoView();
        }

        setClassName(focusOnId === ownId ? "jump" : "");
    }, [focusOnId]);

    useEffect(() => {
        if (queryId === ownId) {
            dispatch(focusOnElementWithId(ownId));

            const queryParams = new URLSearchParams(location.search);

            queryParams.delete(paramName);
            history.replace({
                search: queryParams.toString()
            });
        }
    }, [queryId]);

    return [container, className];

    //return [container, focusOnId && focusOnId === ownId ? "jump" : ""];
};

export const useSimpleScrollToId = (hashValue, extraDependencies = []) => {
    const { hash } = useLocation();

    const ref = useCallback(
        element => {
            if (element && hash === hashValue) {
                element.scrollIntoView();
            }
        },
        [hash, ...extraDependencies]
    );

    return ref;
};
