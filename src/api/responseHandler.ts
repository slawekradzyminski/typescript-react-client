export const handleResponse = async (response: Response) => {
    const text = await response.text();
    const data = parseText(text)
    if (!response.ok) {
        if (response.status === 403) {
            handleUnauthorizedError()
        }
        if (response.status === 400) {
           return Promise.reject(JSON.stringify(data))
        }
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
}

export const handleImageResponse = async (response: Response) => {
    if (!response.ok) {
        if (response.status === 403) {
            handleUnauthorizedError()
        }
        if (response.status === 400) {
            const text = await response.text();
            const data = parseText(text)
            return Promise.reject(JSON.stringify(data))
        }
        const error = response.statusText;
        return Promise.reject(error);
    }
    return response.blob();
}

const handleUnauthorizedError = () => {
    window.location.href = '/login';
    throw new Error('Not authenticated');
}

const parseText = (text: string) => {
    if (text) {
        try {
            return JSON.parse(text)
        } catch (error) {
            return text
        }
    }
}