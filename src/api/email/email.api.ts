import { Email } from "../../types";
import { apiUrl, postRequestOptions } from "../apiCommons";
import { handleResponse } from "../responseHandler";

export const sendEmail = async (email: Email) => {
    const response = await fetch(`${apiUrl}/email`, postRequestOptions(email));
    return handleResponse(response);
}