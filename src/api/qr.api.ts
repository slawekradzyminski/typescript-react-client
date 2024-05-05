import { apiUrl, postRequestOptions } from "./apiCommons";
import { handleImageResponse } from "./responseHandler";

export type CreateQrDto = {
    text: string
}

export const generateQrCode = async (createQrDto: CreateQrDto) => {
    const response = await fetch(`${apiUrl}/qr/create`, postRequestOptions(createQrDto));
    const blob = await handleImageResponse(response);
    const url = URL.createObjectURL(blob);
    return url;
}

