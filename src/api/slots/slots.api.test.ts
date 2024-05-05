import { apiUrl, postRequestOptions } from '../apiCommons';
import { createSlots, CreateSlotRangeDto } from './slots.api';
import { handleResponse } from '../responseHandler';

jest.mock('../responseHandler');

describe('createSlots', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('calls fetch with the right args and returns the result of handleResponse', async () => {
    const mockResponse = { success: true };
    (handleResponse as jest.Mock).mockReturnValueOnce(mockResponse);
    fetchMock.mockResponseOnce(JSON.stringify(mockResponse));

    const createSlotRangeDto: CreateSlotRangeDto = {
      username: 'johndoe',
      startAvailability: new Date('2023-01-01T09:00:00Z'),
      endAvailability: new Date('2023-01-01T17:00:00Z'),
      slotDurationMinutes: 30
    };

    const formattedDto = {
      username: createSlotRangeDto.username,
      startAvailability: createSlotRangeDto.startAvailability.toISOString(),
      endAvailability: createSlotRangeDto.endAvailability.toISOString(),
      slotDuration: `PT${createSlotRangeDto.slotDurationMinutes}M`
    };

    const result = await createSlots(createSlotRangeDto);

    expect(fetchMock).toHaveBeenCalledWith(`${apiUrl}/slots`, postRequestOptions(formattedDto));
    expect(result).toEqual(mockResponse);
  });
});