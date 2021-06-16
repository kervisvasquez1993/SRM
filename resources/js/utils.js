import { useSelector } from "react-redux";

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
    return Math.ceil((finishDate - new Date()) / secondsInDay);
}

export function getDaysToFinishTask(task) {
    return getDaysBetweenDates(
        new Date(task.created_at),
        new Date(task.fecha_fin)
    );
}

export function getRemainingDaysToFinishTask(task) {
    return Math.ceil(
        (new Date(task.fecha_fin) - new Date()) / secondsInDay
    );
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
    return (
        negotiation.iniciar_produccion === 1 && negotiation.iniciar_arte === 1
    );
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
        totalToPay,
        totalPaid,
        paidPercentage: roundMoneyAmount(paidPercentage),
        prepayment,
        prepaymentPercentage: roundMoneyAmount(prepaymentPercentage),
        remainingPayment,
        remainingPercentage,
        isPrepaymentDone,
        isCompletelyPaid
    };
}

export function roundMoneyAmount(amount) {
    return Math.round((amount + Number.EPSILON) * 100) / 100;
}
