import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
// @ts-ignore
import { NumberParam, StringParam, useQueryParam } from "use-query-params";
import { store } from "./components/Index";
// @ts-ignore
import { openArtModal } from "./store/actions/artActions";
import { clearFocus, focusOnElementWithId } from "./store/actions/focusActions";

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
    // @ts-ignore
    return new Intl.DateTimeFormat("default", options).format(date);
}

export function dateToShortString(date, options = defaultShortOptions) {
    // @ts-ignore
    return new Intl.DateTimeFormat("default", options).format(date);
}

export function getElapsedTimeString(date) {
    // @ts-ignore
    const days = Math.floor((new Date() - date) / secondsInDay);
    if (days > 0) {
        return days + "d";
    }
    // @ts-ignore
    const hours = Math.floor((new Date() - date) / milisecondsInHour);
    if (hours > 0) {
        return hours + "h";
    }
    // @ts-ignore
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

// @ts-ignore
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
    // @ts-ignore
    const percentage = (finishDate - new Date()) / (finishDate - startDate);

    let days = getDaysBetweenDates(new Date(), finishDate);

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
    // @ts-ignore
    return Math.ceil((new Date(task.fecha_fin) - new Date()) / secondsInDay);
}

export function extractError(errors, error) {
    if (errors && errors[error]) {
        return errors[error][0];
    }
}

export function useUser() {
    // @ts-ignore
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
    // @ts-ignore
    const result = values.reduce((a, b) => a + b);
    return values.reduce((a, b) => a + b);
}

export function isNegotiationSelected(negotiation) {
    return negotiation.seleccionado;
}

// If a negotiation has started production and arts, then the rest of the providers of the same task
// must not been shown
export function filterNegotiations(negotiations) {
    let result = [...negotiations];

    negotiations.forEach(i => {
        if (isNegotiationSelected(i)) {
            result = result.filter(j => {
                if (j.tarea.id === i.tarea.id && i != j) {
                    return false;
                }

                return true;
            });
        }
    });

    return result;
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

export const scrollIntoViewOptions = {
    behavior: "smooth",
    block: "center",
    inline: "center"
};

export const useSimpleUrlFocus = (ownId, paramName = "id", callback) => {
    const dispatch = useDispatch();
    const container = useRef(null);
    // @ts-ignore
    const focusOnId = useSelector(state => state.focus.focusOnId);
    const [queryId] = useQueryParam(paramName, NumberParam);
    const location = useLocation();
    const history = useHistory();
    const [className, setClassName] = useState("");

    useEffect(() => {
        let handleAnimationEnd;
        let element;

        if (focusOnId && focusOnId === ownId) {
            element = container.current;
            element.scrollIntoView(scrollIntoViewOptions);

            if (callback) {
                callback();
            }

            // @ts-ignore
            handleAnimationEnd = e => {
                dispatch(clearFocus());
            };

            element.addEventListener("animationend", handleAnimationEnd);
        }

        setClassName(focusOnId === ownId ? "jump" : "");

        return () => {
            if (element && handleAnimationEnd) {
                element.removeEventListener("animationend", handleAnimationEnd);
            }
        };
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
    const history = useHistory();

    const ref = useCallback(
        element => {
            if (element && hash === hashValue) {
                element.scrollIntoView(scrollIntoViewOptions);

                history.replace({
                    hash: ""
                });
            }
        },
        [hash, ...extraDependencies]
    );

    return ref;
};

export const removeSlash = text => {
    if (text[text.length - 1] === "/") {
        return text.substring(0, text.length - 1);
    }

    return text;
};

export const maxUploadSize = 10000000;
export const maxUploadSizeText = "10 MB";

export const isRepeatedValidator = (
    file,
    stateSelector = state => state.negotiation.files
) => {
    const state = store.getState();

    if (stateSelector(state).find(item => item.name === file.name)) {
        return {
            code: "repeated-name",
            message: "Nombre de archivo repetido"
        };
    }

    return null;
};

export const isTouchDevice = () => {
    return (
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        navigator.msMaxTouchPoints > 0
    );
};

export const extractToken = (template, url, token) => {
    var sReg = "[A-z]",
        xyzReg = "[0-9]+",
        tokenMapping = {
            "{s}": sReg,
            "{x}": xyzReg,
            "{y}": xyzReg,
            "{z}": xyzReg
        },
        tokenList = [];

    var regexpTemplate = template.replace(".", "\\.");

    // Find the order of your tokens
    var i, tokenIndex, tokenEntry;
    for (var m in tokenMapping) {
        tokenIndex = template.indexOf(m);

        // Token found
        if (tokenIndex > -1) {
            regexpTemplate = regexpTemplate.replace(
                m,
                "(" + tokenMapping[m] + ")"
            );
            tokenEntry = {
                index: tokenIndex,
                token: m
            };

            for (
                i = 0;
                i < tokenList.length && tokenList[i].index < tokenIndex;
                i++
            );

            // Insert it at index i
            if (i < tokenList.length) {
                tokenList.splice(i, 0, tokenEntry);
            }
            // Or push it at the end
            else {
                tokenList.push(tokenEntry);
            }
        }
    }

    var match = new RegExp(regexpTemplate).exec(url);

    // Find your token entry
    for (i = 0; i < tokenList.length; i++) {
        if (tokenList[i].token === token) {
            return match[i + 1];
        }
    }

    return null;
};

export const extractStringBetween = (text, a, b) => {
    const indexA = text.indexOf(a);
    const indexB = text.indexOf(b);
    return text.substring(indexA + a.length, indexB);
};

export const extractStringAfter = (text, a) => {
    const indexA = text.indexOf(a);
    return text.substring(indexA + a.length);
};

export const resize = (array, newSize, defaultValue = undefined) => {
    // Crear una copia del arreglo para devolver
    const result = [...array];
    // Copiar el tamaño original
    const oldSize = array.length;
    // Redimensionar el arreglo
    result.length = newSize;
    // En caso de que el arreglo sea más grande que el original,
    // rellenar los espacios nuevos con "defaultValue"
    if (newSize > oldSize) {
        result.fill(defaultValue, oldSize);
    }

    return result;
};

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}
