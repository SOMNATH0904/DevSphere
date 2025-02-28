import { backendUrl } from "./config";

export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    });
    return await response.json();
};

export const makeAuthenticatedPOSTRequest = async (route, body, isFormData = false) => {
    const token = getToken();
    const headers = {
        Authorization: `Bearer ${token}`,
    };
    if (!isFormData) {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify(body);
    }

    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: isFormData ? headers : { ...headers, "Content-Type": "application/json" },
        body: body, 
    });

    return await response.json();
};

export const makeAuthenticatedGETRequest = async (route) => {
    const token = getToken();
    const response = await fetch(backendUrl + route, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    return await response.json();
};
export const makeAuthenticatedDELETERequest = async (route) => {
    const token = getToken();
    const response = await fetch(backendUrl + route, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    return await response.json();
};

const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};
