import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getBookedSlots, cancelBooking } from '../../api/slots/slots.api';
import BookedSlotsPage from '../bookedslots/BookedSlotsPage';

jest.mock('../../api/slots/slots.api', () => ({
    getBookedSlots: jest.fn(),
    cancelBooking: jest.fn(),
}));

describe('BookedSlotsPage', () => {
    beforeEach(() => {
        (getBookedSlots as jest.Mock).mockResolvedValue([
            {
                id: '1',
                doctorFullName: 'Test Doctor',
                doctorSpecialties: ['Test Specialty'],
                startTime: new Date(),
                endTime: new Date()
            }]);
        (cancelBooking as jest.Mock).mockResolvedValue({});
        render(<BookedSlotsPage />);
    });

    test('calls cancelBooking when a slot is cancelled', async () => {
        // when
        const cancelButton = await screen.findByText('Cancel');
        userEvent.click(cancelButton);
        const confirmButton = await screen.findByText('Yes');
        userEvent.click(confirmButton);

        // then
        await waitFor(() => expect(cancelBooking).toHaveBeenCalledWith('1'));
    });

    test('does not call cancelBooking when "No" is clicked on confirmation', async () => {
        // when
        const cancelButton = await screen.findByText('Cancel');
        userEvent.click(cancelButton);
        const noButton = await screen.findByText('No');
        userEvent.click(noButton);

        // then
        expect(cancelBooking).not.toHaveBeenCalled();
    });
});