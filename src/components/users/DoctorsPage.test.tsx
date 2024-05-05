import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DoctorsPage from './DoctorsPage';
import { userService } from '../../api/user.api';
import UserTable from './UserTable';
import { Roles, User } from '../../types';
import { ToastContext } from '../../context/ToastContext';

jest.mock('../../api/user.api', () => ({
    userService: {
        delete: jest.fn(),
        getAll: jest.fn()
    }
}));

jest.mock('./UserTable', () => {
    return jest.fn(({ users, handleDelete }) => (
        <div>
            {users.map((user: User, index: number) => (
                <button key={index} onClick={() => handleDelete(user.username)}>
                    Delete {user.username}
                </button>
            ))}
        </div>
    ));
});

const mockSetToast = jest.fn()

describe('DoctorsPage', () => {
    const mockUsers = [
        { username: 'doctor1', roles: [Roles.ROLE_DOCTOR], specialties: ['Cardiology'] },
        { username: 'doctor2', roles: [Roles.ROLE_DOCTOR], specialties: ['Neurology'] },
        { username: 'doctor3', roles: [Roles.ROLE_DOCTOR], specialties: [] },
        { username: 'client', roles: [Roles.ROLE_CLIENT], specialties: [] },
        { username: 'admin', roles: [Roles.ROLE_ADMIN], specialties: [] },
    ];

    beforeEach(() => {
        (userService.getAll as jest.Mock).mockResolvedValue(mockUsers);
        (userService.delete as jest.Mock).mockResolvedValue({});
    });

    it('renders users correctly and filters them out', async () => {
        // given
        render(<DoctorsPage />);

        // then
        await waitFor(() => {
            expect(UserTable).toHaveBeenCalledWith(
                expect.objectContaining({
                    users: [mockUsers[0], mockUsers[1]],
                }),
                expect.anything(),
            );
        });
    });

    it('handles user deletion', async () => {
        // given
        window.confirm = jest.fn(() => true);
        const userToDelete = mockUsers[0].username;
        render(
            <ToastContext.Provider value={mockSetToast}>
                <DoctorsPage />
            </ToastContext.Provider>
        );
        await waitFor(() => screen.getByText(`Delete ${userToDelete}`));

        // when
        userEvent.click(screen.getByText(`Delete ${userToDelete}`));

        // then
        await waitFor(() => {
            expect(userService.delete).toHaveBeenCalledWith(userToDelete);
            expect(screen.queryByText(`Delete ${userToDelete}`)).not.toBeInTheDocument();
            expect(mockSetToast).toHaveBeenCalledWith({ type: 'success', message: 'User deleted successfully' });
        });
    });
});