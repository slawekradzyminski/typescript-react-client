import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MobileView from './MobileView';
import React from 'react';
import { Roles } from '../../../types';
import { renderWithRedux } from '../../../tests/testHelpers';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('MobileView', () => {

    test('displays logged in only links for logged out user', () => {
        renderWithRedux(<MemoryRouter><MobileView /></MemoryRouter>);
        expect(screen.queryByText('Login')).toBeInTheDocument();
        expect(screen.queryByText('QR Codes')).not.toBeInTheDocument();
        expect(screen.queryByText('Open Slots')).not.toBeInTheDocument();
    });

    test('renders MobileToolbar for Clients', () => {
        const initialState = {
            authentication: {
                loggedIn: true,
                user: {
                    roles: [Roles.ROLE_CLIENT]
                }
            }
        };
        renderWithRedux(<MemoryRouter><MobileView /></MemoryRouter>, { initialState });
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
        expect(screen.queryByText('QR Codes')).toBeInTheDocument();
        expect(screen.queryByText('Open Slots')).not.toBeInTheDocument();
    });

    test('renders MobileToolbar for Doctors', () => {
        const initialState = {
            authentication: {
                loggedIn: true,
                user: {
                    roles: [Roles.ROLE_DOCTOR]
                }
            }
        };
        renderWithRedux(<MemoryRouter><MobileView /></MemoryRouter>, { initialState });
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
        expect(screen.queryByText('QR Codes')).toBeInTheDocument();
        expect(screen.queryByText('Open Slots')).toBeInTheDocument();
    });

    test('renders MobileToolbar for Admins', () => {
        const initialState = {
            authentication: {
                loggedIn: true,
                user: {
                    roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
                }
            }
        };
        renderWithRedux(<MemoryRouter><MobileView /></MemoryRouter>, { initialState });
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
        expect(screen.queryByText('QR Codes')).toBeInTheDocument();
        expect(screen.queryByText('Open Slots')).toBeInTheDocument();
    });

    test('navigates to correct page on button click as logged out', async () => {
        renderWithRedux(
            <MemoryRouter>
                <MobileView />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Login'));

        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    test('navigates to correct page on button click as logged in', async () => {
        const initialState = {
            authentication: {
                loggedIn: true,
                user: {
                    roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
                }
            }
        };
        renderWithRedux(<MemoryRouter><MobileView /></MemoryRouter>, { initialState });
        fireEvent.click(screen.getByText('QR Codes'));

        expect(mockNavigate).toHaveBeenCalledWith('/qr');
    });

});