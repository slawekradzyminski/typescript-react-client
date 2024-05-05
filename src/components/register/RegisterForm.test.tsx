import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterForm from './RegisterForm';
import { Roles } from '../../types';

describe('RegisterForm', () => {
    jest.setTimeout(10000)
    let mockSubmit: jest.Mock;

    beforeEach(() => {
        mockSubmit = jest.fn();
    });

    test('validates inputs and allows form submission', async () => {
        // given
        const rolesArray = Object.values(Roles);
        render(<RegisterForm onSubmit={mockSubmit} />);
        const firstNameInput = screen.getByLabelText(/first name/i);
        const lastNameInput = screen.getByLabelText(/last name/i);
        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const emailInput = screen.getByLabelText(/email/i);
        const registerButton = screen.getByRole('button', { name: /register/i });
        const roleCheckboxes = rolesArray.map(role => screen.getByRole('checkbox', { name: role }));

        // when
        await userEvent.type(firstNameInput, 'testfirst');
        await userEvent.type(lastNameInput, 'testlast');
        await userEvent.type(usernameInput, 'testuser');
        await userEvent.type(passwordInput, 'testpass');
        await userEvent.type(emailInput, 'test@test.com');
        for (const checkbox of roleCheckboxes) {
            await userEvent.click(checkbox);
        }
        await userEvent.click(registerButton);

        // then
        await waitFor(() => {
            expect(mockSubmit).toHaveBeenCalledWith({
                firstName: 'testfirst',
                lastName: 'testlast',
                username: 'testuser',
                password: 'testpass',
                email: 'test@test.com',
                roles: rolesArray,
                specialties: []
            });
        });
    });

    ['First Name', 'Last Name', 'Username', 'Password'].forEach(field => {
        test(`shows error when ${field} is less than 3 characters`, async () => {
            // given
            render(<RegisterForm onSubmit={mockSubmit} />);
            const input = screen.getByLabelText(new RegExp(field, 'i'));

            // when
            await userEvent.type(input, 'te');

            // then
            await waitFor(() => {
                expect(screen.getByText(`${field} must be at least 3 characters long`)).toBeInTheDocument();
            });
            expect(mockSubmit).not.toHaveBeenCalled();
        });
    });

    test('shows error when email is invalid', async () => {
        // given
        render(<RegisterForm onSubmit={mockSubmit} />);
        const emailInput = screen.getByLabelText(/email/i);

        // when
        await userEvent.type(emailInput, 'test');

        // then
        expect(screen.getByText('Email is not valid')).toBeInTheDocument();
        expect(mockSubmit).not.toHaveBeenCalled();
    });

    test('checks attributes of Register button', async () => {
        // given
        render(<RegisterForm onSubmit={mockSubmit} />);
        const registerButton = screen.getByRole('button', { name: /register/i });
        
        // then
        expect(registerButton).toHaveAttribute('type', 'submit')
    });
});