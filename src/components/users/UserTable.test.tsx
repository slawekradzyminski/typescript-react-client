import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Roles, User } from '../../types';
import { renderWithRedux } from '../../tests/testHelpers';
import UserTable from './UserTable';

const mockNavigate = jest.fn();
const mockHandleDelete = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}));

const users: User[] = [
    {
        id: 1,
        email: 'client@slawek.com',
        username: 'john_doe',
        firstName: 'John',
        lastName: 'Doe',
        specialties: [{ id: 1, name: 'JavaScript' }],
        roles: [Roles.ROLE_CLIENT],
    },
    {
        id: 2,
        email: 'admin@slawek.com',
        username: 'jane_doe',
        firstName: 'Jane',
        lastName: 'Doe',
        specialties: [{ id: 2, name: 'Python' }],
        roles: [Roles.ROLE_ADMIN],
    },
];

describe('UserTable', () => {

    test('renders user table with correct data for ROLE_ADMIN', () => {
        // when
        const initialState = {
            authentication: {
                user: {
                    roles: [Roles.ROLE_ADMIN],
                },
            },
        };
        renderWithRedux(<UserTable users={users} handleDelete={mockHandleDelete} />, { initialState });

        // then
        expect(screen.getAllByRole('row')).toHaveLength(users.length + 1);
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('JavaScript')).toBeInTheDocument();
        expect(screen.getAllByRole('button')).toHaveLength(users.length * 3);
    });

    test('does not display edit and delete buttons for ROLE_DOCTOR', () => {
        // given
        const initialState = {
            authentication: {
                user: {
                    roles: [Roles.ROLE_DOCTOR],
                },
            },
        };
        renderWithRedux(<UserTable users={users} handleDelete={mockHandleDelete} />, { initialState });

        // then
        const editButtons = screen.queryByTestId('EditIcon');
        const deleteButtons = screen.queryByTestId('DeleteIcon');
        expect(editButtons).toBeNull();
        expect(deleteButtons).toBeNull();
    });

    test('calls handleDelete with correct username when delete button is clicked', () => {
        // given
        const initialState = {
            authentication: {
                user: {
                    roles: [Roles.ROLE_ADMIN],
                },
            },
        };
        renderWithRedux(<UserTable users={users} handleDelete={mockHandleDelete} />, { initialState });

        // when
        const deleteButtons = screen.getAllByTestId('DeleteIcon');
        fireEvent.click(deleteButtons[0]);

        // then
        expect(mockHandleDelete).toHaveBeenCalledWith(users[0].username);
    });

    test('calls editUser when edit button is clicked', () => {
        // given
        const initialState = {
            authentication: {
                user: {
                    roles: [Roles.ROLE_ADMIN],
                },
            },
        };
        renderWithRedux(<UserTable users={users} handleDelete={mockHandleDelete} />, { initialState });

        // when
        const editButtons = screen.getAllByTestId('EditIcon');
        fireEvent.click(editButtons[1]);

        // then
        expect(mockNavigate).toHaveBeenCalledWith('/edit-user', { state: { user: users[1] } });
    });

    test('calls emailUser when email button is clicked', () => {
        // given
        const initialState = {
            authentication: {
                user: {
                    roles: [Roles.ROLE_CLIENT],
                },
            },
        };
        renderWithRedux(<UserTable users={users} handleDelete={mockHandleDelete} />, { initialState });

        // when
        const emailButtons = screen.getAllByTestId('EmailIcon');
        fireEvent.click(emailButtons[0]);

        // then
        expect(mockNavigate).toHaveBeenCalledWith('/email', { state: { user: users[0] } });
    });

});