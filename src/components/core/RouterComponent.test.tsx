import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RoutesComponent from './RouterComponent';
import { setupMockDispatch } from '../../tests/testHelpers';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

describe('RoutesComponent', () => {

    let mockDispatch: jest.Mock;

    beforeEach(() => {
        mockDispatch = setupMockDispatch();
    });

    test('renders LoginPage for the /login path', () => {
        render(
            <MemoryRouter initialEntries={['/login']}>
                <RoutesComponent />
            </MemoryRouter>
        );

        expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
    });


    test('renders RegisterPage for the /register path', () => {
        render(
            <MemoryRouter initialEntries={['/register']}>
                <RoutesComponent />
            </MemoryRouter>
        );

        expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument();
    });
});