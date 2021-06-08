import { useSelector } from "react-redux";

export const secondsInDay = 1000 * 60 * 60 * 24;

const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
};

export function dateToString(date, options = defaultOptions) {
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
        stringToDateIgnoringTime(task.fecha_fin)
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
        if (percentage < 0.333) {
            return redCard;
        } else if (percentage < 0.666) {
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
        (stringToDateIgnoringTime(task.fecha_fin) - new Date()) / secondsInDay
    );
}

export function stringToDateIgnoringTime(string) {
    string = string.split(" ")[0];

    return new Date(string);
}

export function extractError(errors, error) {
    if (errors[error]) {
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
