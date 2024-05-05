import { apiUrl, getRequestOptions, postRequestOptions, putRequestOptions } from "../apiCommons";
import { handleResponse } from "../responseHandler";

export type CreateSlotRangeDto = {
  username: string;
  startAvailability: Date;
  endAvailability: Date;
  slotDurationMinutes: number;
};

export type SlotSearchCriteria = {
  startTime: string;
  endTime: string;
  doctorUsername?: string;
  slotStatus?: string;
  specialtyId?: number;
};

const formatCreateSlotRangeDto = (dto: CreateSlotRangeDto) => {
  return {
    username: dto.username,
    startAvailability: dto.startAvailability.toISOString(),
    endAvailability: dto.endAvailability.toISOString(),
    slotDuration: `PT${dto.slotDurationMinutes}M`
  };
};

export const getBookedSlots = async () => {
  const response = await fetch(`${apiUrl}/slots/booked`, getRequestOptions());
  return handleResponse(response);
};

export const cancelBooking = async (slotId: number) => {
  const response = await fetch(`${apiUrl}/slots/${slotId}/cancel`, putRequestOptions({}));
  return handleResponse(response);
};

export const createSlots = async (createSlotRangeDto: CreateSlotRangeDto) => {
  const formattedDto = formatCreateSlotRangeDto(createSlotRangeDto);
  const response = await fetch(`${apiUrl}/slots`, postRequestOptions(formattedDto));
  return handleResponse(response);
};

export const getAvailableSlots = async (criteria: SlotSearchCriteria) => {
  const url = new URL(`${apiUrl}/slots`);
  Object.keys(criteria).forEach(key => url.searchParams.append(key, criteria[key]));
  const response = await fetch(url.toString(), getRequestOptions());
  return handleResponse(response);
};

export const bookSlot = async (slotId: number) => {
  const response = await fetch(`${apiUrl}/slots/${slotId}/book`, putRequestOptions({}));
  return handleResponse(response);
};