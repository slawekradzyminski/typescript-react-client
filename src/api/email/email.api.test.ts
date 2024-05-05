import { apiUrl, postRequestOptions } from '../apiCommons';
import { sendEmail } from './email.api';
import { handleResponse } from '../responseHandler';

jest.mock('../responseHandler');

describe('sendEmail', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('calls fetch with the right args and returns the result of handleResponse', async () => {
    (handleResponse as jest.Mock).mockReturnValueOnce({ success: true });
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    const email = { to: 'test@example.com', subject: 'Test', message: 'Test email' };
    const result = await sendEmail(email);

    expect(fetchMock).toHaveBeenCalledWith(`${apiUrl}/email`, postRequestOptions(email));
    expect(result).toEqual({ success: true });
  });
});
