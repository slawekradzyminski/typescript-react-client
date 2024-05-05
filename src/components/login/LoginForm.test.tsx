import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from './LoginForm';
import { MemoryRouter } from 'react-router-dom';

describe('LoginForm', () => {
    let mockSubmit: jest.Mock;

    beforeEach(() => {
        mockSubmit = jest.fn();
        render(<MemoryRouter>
            <LoginForm onSubmit={mockSubmit} />
        </MemoryRouter>)
    });

    test('validates inputs and allows form submission', async () => {
        // given
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const submitButton = screen.getByText('Sign In');

        // when
        await userEvent.type(usernameInput, 'testuser');
        await userEvent.type(passwordInput, 'testpass');
        await userEvent.click(submitButton);

        // then
        expect(mockSubmit).toHaveBeenCalledWith({ username: 'testuser', password: 'testpass' });
    });

    test('shows error when username is less than 3 characters', async () => {
        // given
        const usernameInput = screen.getByLabelText(/username/i);

        // when
        await userEvent.type(usernameInput, 'te');

        // then
        expect(screen.getByText('Username must be at least 3 characters long')).toBeInTheDocument();
        expect(mockSubmit).not.toHaveBeenCalled();
    });

    test('shows error when password is less than 3 characters', async () => {
        // given
        const passwordInput = screen.getByLabelText(/password/i);

        // when
        await userEvent.type(passwordInput, 'te');

        // then
        expect(screen.getByText('Password must be at least 3 characters long')).toBeInTheDocument();
        expect(mockSubmit).not.toHaveBeenCalled();
    });

    test('navigates to /register when Sign Up link is clicked', () => {
        // then
        expect(screen.getByText("Don't have an account? Sign Up")).toHaveAttribute('href', '/register')
    });
});

