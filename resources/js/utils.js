export const secondsInDay = 1000 * 60 * 60 * 24;

const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
};

export function dateToString(date, options = defaultOptions) {
    return new Intl.DateTimeFormat("default", options).format(date);
}

const redCard = {
    text: "text-white",
    background: "bg-danger"
};

const yellowCard = {
    text: "text-white",
    background: "bg-warning"
};

const greenCard = {
    text: "text-white",
    background: "bg-success"
};

const normalCard = {
    text: "",
    background: ""
};

const blackCard = {
    text: "text-white",
    background: "bg-dark"
};

export function getColorsFromDates(startDate, finishDate) {
    const percentage = (finishDate - new Date()) / (finishDate - startDate);
    let days = Math.round((finishDate - new Date()) / secondsInDay);

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
}

export function getDaysBetweenDates(startDate, finishDate) {
    return Math.round((finishDate - new Date()) / secondsInDay);
}

export function getDaysToFinishTask(task) {
    return getDaysBetweenDates(
        new Date(task.created_at),
        new Date(task.fecha_fin)
    );
}

export function getRemainingDaysToFinishTask(task) {
    return Math.round((new Date(task.fecha_fin) - new Date()) / secondsInDay);
}
