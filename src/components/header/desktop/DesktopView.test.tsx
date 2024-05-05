import { fireEvent, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import DesktopView from './DesktopView';
import React from 'react';
import { Roles } from '../../../types';
import { renderWithRedux } from '../../../tests/testHelpers';

const mockNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate
}));

describe('DesktopView', () => {

    test('displays logged in only links for logged out user', () => {
        renderWithRedux(<MemoryRouter><DesktopView /></MemoryRouter>);
        expect(screen.queryByText('Login')).toBeInTheDocument();
        expect(screen.queryByText('QR Codes')).not.toBeInTheDocument();
        expect(screen.queryByText('Open Slots')).not.toBeInTheDocument();
    });

    test('renders DesktopToolbar for Clients', () => {
        const initialState = {
            authentication: {
                loggedIn: true,
                user: {
                    roles: [Roles.ROLE_CLIENT]
                }
            }
        };
        renderWithRedux(<MemoryRouter><DesktopView /></MemoryRouter>, { initialState });
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
        expect(screen.queryByText('QR Codes')).toBeInTheDocument();
        expect(screen.queryByText('Open Slots')).not.toBeInTheDocument();
    });

    test('renders DesktopToolbar for Doctors', () => {
        const initialState = {
            authentication: {
                loggedIn: true,
                user: {
                    roles: [Roles.ROLE_DOCTOR]
                }
            }
        };
        renderWithRedux(<MemoryRouter><DesktopView /></MemoryRouter>, { initialState });
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
        expect(screen.queryByText('QR Codes')).toBeInTheDocument();
        expect(screen.queryByText('Open Slots')).toBeInTheDocument();
    });

    test('renders DesktopToolbar for Admins', () => {
        const initialState = {
            authentication: {
                loggedIn: true,
                user: {
                    roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
                }
            }
        };
        renderWithRedux(<MemoryRouter><DesktopView /></MemoryRouter>, { initialState });
        expect(screen.queryByText('Login')).not.toBeInTheDocument();
        expect(screen.queryByText('QR Codes')).toBeInTheDocument();
        expect(screen.queryByText('Open Slots')).toBeInTheDocument();
    });

    test('navigates to correct page on button click as logged out', () => {
        renderWithRedux(
            <MemoryRouter>
                <DesktopView />
            </MemoryRouter>
        );

        fireEvent.click(screen.getByText('Login'));

        expect(mockNavigate).toHaveBeenCalledWith('/login');
    });

    test('navigates to correct page on button click as logged in', () => {
        const initialState = {
            authentication: {
                loggedIn: true,
                user: {
                    roles: [Roles.ROLE_ADMIN, Roles.ROLE_CLIENT]
                }
            }
        };
        renderWithRedux(<MemoryRouter><DesktopView /></MemoryRouter>, { initialState });
        fireEvent.click(screen.getByText('QR Codes'));

        expect(mockNavigate).toHaveBeenCalledWith('/qr');
    });

    test('active menu item is bolded', () => {
        renderWithRedux(
            <MemoryRouter initialEntries={['/login']}>
                <DesktopView />
            </MemoryRouter>
        );
    
        const loginButton = screen.getByText('Login');
        const computedStyles = window.getComputedStyle(loginButton);
        const fontWeight = computedStyles.getPropertyValue('font-weight');
        expect(fontWeight).toBe('700');
    });
    
    test('inactive menu item is not bolded', () => {
        renderWithRedux(
            <MemoryRouter initialEntries={['/login']}>
                <DesktopView />
            </MemoryRouter>
        );
    
        const registerButton = screen.getByText('Register');
        const computedStyles = window.getComputedStyle(registerButton);
        const fontWeight = computedStyles.getPropertyValue('font-weight');
        expect(fontWeight).not.toBe('700');
    });

});