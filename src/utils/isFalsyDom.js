export function isFalsyDom(value) {
    if (value === true) {
        return true
    }

    if (value === false) {
        return true;
    }

    if (value === undefined) {
        return true;
    }

    return value === null;
}