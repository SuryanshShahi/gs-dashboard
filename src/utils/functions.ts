export const extractText = (
    text: string,
    replace?: string,
    replaceWith?: string
) => text?.toLowerCase()?.replaceAll(replace || "_", replaceWith || " ");

export const createUrl = (url: string, params?: object): string => {
    const queryString = params
        ? url?.includes("?")
            ? `&${stringifyParams(params)}`
            : `?${stringifyParams(params)}`
        : "";
    return `${url}${queryString}`;
};

export const stringifyParams = (params: object) => {
    return Object.entries(params)
        ?.filter(([, value]) => Boolean(value))
        ?.map(
            ([key, value]) =>
                `${encodeURIComponent(key)}=${encodeURIComponent(value as string)}`
        )
        ?.join("&");
};

export const decodeToken = (token: string) => {
    try {
        return JSON.parse(window?.atob(token?.split(".")[1]));
    } catch (e) {
        console.error("Failed to decode token:", e);
        return null;
    }
};
