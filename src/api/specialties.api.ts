import { apiUrl, getRequestOptions, postRequestOptions, putRequestOptions } from "./apiCommons";
import { handleResponse } from "./responseHandler";

export const fetchSpecialties = async () => {
    const response = await fetch(`${apiUrl}/specialties`, getRequestOptions());
    return handleResponse(response);
};

export const setSpecialties = async (specialtiesUpdateDto: { specialtyIds: number[] }) => {
    const response = await fetch(`${apiUrl}/users/specialties`, putRequestOptions(specialtiesUpdateDto));
    return handleResponse(response);
};

export const createSpecialty = async (createSpecialtyDto: { name: string }) => {
    const response = await fetch(`${apiUrl}/specialties`, postRequestOptions(createSpecialtyDto));
    return handleResponse(response);
};