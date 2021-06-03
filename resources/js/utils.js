export const dayInSeconds = 1000 * 60 * 60 * 24;

const defaultOptions = {
    year: "numeric",
    month: "long",
    day: "numeric"
};

export function dateToString(date, options=defaultOptions) {
    return new Intl.DateTimeFormat("default", options).format(date);
}