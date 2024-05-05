import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { Roles } from '../../types';
import RolesCheckboxGroup from './RolesCheckboxGroup';

describe('RolesCheckboxGroup', () => {
    const handleRoleChange = jest.fn();
    const selectedRoles = [];

    it('calls handleRoleChange when a checkbox is clicked', () => {
        // given
        render(<RolesCheckboxGroup selectedRoles={selectedRoles} handleRoleChange={handleRoleChange} attemptedRegister={false} />);
        const firstRoleKey = Object.keys(Roles)[0];
        const checkbox = screen.getByLabelText(Roles[firstRoleKey]);
        
        // when
        fireEvent.click(checkbox);
        
        // then
        expect(handleRoleChange).toHaveBeenCalledWith(Roles[firstRoleKey]);
    });

    it('shows error message when no role is selected and attemptedRegister is true', () => {
        // when
        render(<RolesCheckboxGroup selectedRoles={selectedRoles} handleRoleChange={handleRoleChange} attemptedRegister={true} />);
        
        // then
        expect(screen.getByText('You must select at least one role')).toBeInTheDocument();
    });
});