import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import { Roles } from '../../types';

interface Props {
    selectedRoles: string[];
    handleRoleChange: (role: string) => void;
    attemptedRegister: boolean;
}

const RolesCheckboxGroup: React.FC<Props> = ({ selectedRoles, handleRoleChange, attemptedRegister }) => {
    const [showError, setShowError] = useState(false);
    const rolesArray = Object.values(Roles);

    const handleChange = (role: string) => {
        handleRoleChange(role);
    };

    useEffect(() => {
        setShowError(attemptedRegister && selectedRoles.length === 0); 
    }, [selectedRoles, attemptedRegister]); 

    return (
        <FormControl fullWidth margin="normal" error={showError}>
            {rolesArray.map((role, index) => (
                <FormControlLabel
                    key={index}
                    control={
                        <Checkbox
                            checked={selectedRoles.includes(role)}
                            onChange={() => handleChange(role)}
                            name={role}
                        />
                    }
                    label={role}
                />
            ))}
            {showError && <FormHelperText>You must select at least one role</FormHelperText>}
        </FormControl>
    );
};

export default RolesCheckboxGroup;
