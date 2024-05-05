export const apiUrl = process.env.API_URL;

export const getRequestOptions = () => {
    return {
        method: 'GET',
        ...common
    };
}

export const postRequestOptions = (body: object) => {
    return {
        method: 'POST',
        body: JSON.stringify(body),
        ...common
    };
}

export const putRequestOptions = (body: object) => {
    return {
        method: 'PUT',
        body: JSON.stringify(body),
        ...common
    };
}

export const deleteRequestOptions = () => {
    return {
        method: 'DELETE',
        ...common
    };
}

const common = {
    headers: { 'Content-Type': 'application/json' },
    credentials: "include" as RequestCredentials
}