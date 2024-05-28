import {backendUrl} from "./config";
export const makeUnauthenticatedPOSTRequest = async (route, body) => {
    // The function takes two parameters: 'route' (the API route) and 'body' (the data to be sent).

    const response = await fetch(backendUrl + route, {
        // The 'fetch' function is used to send the POST request.
        // 'backendUrl + route' forms the complete URL for the request.

        method: "POST",  // Specifies that a POST request should be made.

        headers: {
            "Content-Type": "application/json",  // Specifies that the content type is JSON.
        },

        body: JSON.stringify(body),  // Converts the 'body' object to a JSON string and includes it in the request.
    });

    const formattedResponse = await response.json();
    // The response from the server is read as JSON.

    return formattedResponse;
    // The function returns the JSON response from the server.
};

export const makeAuthenticatedPOSTRequest = async (route, body) => {
    const token = getToken();
    const response = await fetch(backendUrl + route, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    });
    const formattedResponse = await response.json();
    return formattedResponse;
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
    const formattedResponse = await response.json();
    return formattedResponse;
};

const getToken = () => {
    const accessToken = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
    );
    return accessToken;
};
