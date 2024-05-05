import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EmailForm from './EmailForm';
import { sendEmail } from '../../api/email/email.api';
import { ToastContext } from '../../context/ToastContext';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../api/email/email.api', () => ({
    sendEmail: jest.fn(),
}));


describe('EmailForm', () => {
    let mockSetToast: jest.Mock;

    beforeEach(() => {
        mockSetToast = jest.fn();
        const sendEmailMock = sendEmail as jest.MockedFunction<typeof sendEmail>;
        sendEmailMock.mockResolvedValue({});
    });

    test('shows error when subject or message is less than 3 characters', async () => {
        // given
        render(
            <MemoryRouter>
                <ToastContext.Provider value={mockSetToast}>
                    <EmailForm to="test@test.com" />
                </ToastContext.Provider>
            </MemoryRouter>
        );
        const subjectInput = screen.getByLabelText(/subject/i);
        const messageInput = screen.getByLabelText(/message/i);

        // when
        await userEvent.type(subjectInput, 'te');
        await userEvent.type(messageInput, 'te');

        // then
        expect(screen.getByText('Subject must be at least 3 characters long')).toBeInTheDocument();
        expect(screen.getByText('Message must be at least 3 characters long')).toBeInTheDocument();
    });

    test('calls sendEmail when form is submitted with valid inputs', async () => {
        // given
        render(
            <MemoryRouter>
                <ToastContext.Provider value={mockSetToast}>
                    <EmailForm to="test@test.com" />
                </ToastContext.Provider>
            </MemoryRouter>
        );
        const subjectInput = screen.getByLabelText(/subject/i);
        const messageInput = screen.getByLabelText(/message/i);
        const submitButton = screen.getByRole('button', { name: /send email/i });

        // when
        await userEvent.type(subjectInput, 'test subject');
        await userEvent.type(messageInput, 'test message');
        await userEvent.click(submitButton);

        // then
        expect(sendEmail).toHaveBeenCalledWith({ to: 'test@test.com', subject: 'test subject', message: 'test message' });
    });


    test('verifies that "to" input is disabled and correctly autofilled', () => {
        // given
        const testEmail = "test@test.com";
        render(
            <MemoryRouter>
                <ToastContext.Provider value={mockSetToast}>
                    <EmailForm to={testEmail} />
                </ToastContext.Provider>
            </MemoryRouter>
        );

        // when
        const toInput = screen.getByLabelText(/email/i);

        // then
        expect(toInput).toHaveValue(testEmail);
        expect(toInput).toBeDisabled();
    });
});
