export const splitCamelCase = (str) => {
    return str
        .split('_')
        .map(s => s.replace(/(?<=[a-z])([A-Z])/g, ' $1'));
}

export const getFirstWord = (str) => {
    const words = splitCamelCase(str);
    return words[0];
}

export const getSecondWord = (str) => {
    const words = splitCamelCase(str);
    return words[1];
}

export const removeLastSubstring = (str) => {
    const lastIndex = str.lastIndexOf('_');

    if (lastIndex !== -1) {
        return str.substring(0, lastIndex);
    }

    return str;
}

export const getBeforeDash = (str) => {
    const dashIndex = str.indexOf('-');

    if (dashIndex !== -1) {
        return str.substring(0, dashIndex);
    }

    return str;
}

export const getQueryParamsAfterSubcategory = (location) => {
    const queryString = location;
    const regex = /(?:subcategory=[^&]*&)(.*)/;
    const match = queryString.match(regex);
    const queryParamsAfterSubcategory = match ? match[1] : '';
    return queryParamsAfterSubcategory;
}