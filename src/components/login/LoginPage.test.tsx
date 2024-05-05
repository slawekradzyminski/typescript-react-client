import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../../_reducers/store';
import { LoginPage } from './LoginPage';
import { MemoryRouter } from 'react-router-dom';
import { setupMockDispatch } from '../../tests/testHelpers';

jest.mock('react-redux', () => ({
    ...jest.requireActual('react-redux'),
    useDispatch: jest.fn(),
}));

describe('LoginPage', () => {

    let mockDispatch: jest.Mock;

    beforeEach(() => {
        mockDispatch = setupMockDispatch();
    });

    test('renders LoginForm', () => {
        // when
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // then
        expect(screen.getByText('Sign In')).toBeInTheDocument();
    });

    test('dispatches logout action on mount', () => {
        // when
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <LoginPage />
                </MemoryRouter>
            </Provider>
        );

        // then
        expect(mockDispatch).toHaveBeenCalled();
    });
});