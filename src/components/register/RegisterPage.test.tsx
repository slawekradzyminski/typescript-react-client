import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { RegisterPage } from './RegisterPage';
import { MemoryRouter } from 'react-router-dom';
import { ToastContext } from '../../context/ToastContext';

jest.mock('./RegisterForm', () => (props) => (
    <form data-testid="mock-register-form" onSubmit={(e) => {
        e.preventDefault();
        props.onSubmit({
            username: 'testuser',
            password: 'password123'
        });
    }}>
        <button type="submit">Mock Register</button>
    </form>
));

jest.mock('../../api/user.api', () => ({
    userService: {
        register: jest.fn()
    }
}));

const mockSetToast = jest.fn();
const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

describe('RegisterPage with Mock RegisterForm', () => {

    it('handles form submission correctly', async () => {
        // given
        render(
            <MemoryRouter>
                <ToastContext.Provider value={mockSetToast}>
                    <RegisterPage />
                </ToastContext.Provider>
            </MemoryRouter>
        );

        // when
        const mockForm = screen.getByTestId('mock-register-form');
        fireEvent.submit(mockForm);

        // then
        await waitFor(() => {
            expect(mockNavigate).toHaveBeenCalledWith('/login');
            expect(mockSetToast).toHaveBeenCalledWith({ type: 'success', message: 'Registration successful!' });
        });
    });

    it('handles form submission error correctly', async () => {
        // given
        const errorMessage = "Username is already in use";
        require('../../api/user.api').userService.register.mockRejectedValue(errorMessage);
        render(
            <MemoryRouter>
                <ToastContext.Provider value={mockSetToast}>
                    <RegisterPage />
                </ToastContext.Provider>
            </MemoryRouter>
        );
    
        // when
        const mockForm = screen.getByTestId('mock-register-form');
        fireEvent.submit(mockForm);
    
        // then
        await waitFor(() => {
            expect(mockSetToast).toHaveBeenCalledWith({ type: 'error', message: errorMessage });
        });
    });
});