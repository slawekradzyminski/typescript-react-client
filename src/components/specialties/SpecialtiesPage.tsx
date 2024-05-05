import React, { useContext, useEffect, useState } from 'react';
import { fetchSpecialties, createSpecialty } from '../../api/specialties.api';
import { useSelector } from 'react-redux';
import { RootState } from '../../_reducers';
import { ToastContext } from '../../context/ToastContext';
import SpecialtyList from './SpecialtyList';
import AddSpecialty from './AddSpecialty';
import ThemedContainer from '../core/ThemedContainer';
import { useAppDispatch } from '../../_reducers/store';
import { updateSpecialties } from '../../_actions/user.actions';

const SpecialtiesPage = () => {
    const [selectedSpecialties, setSelectedSpecialties] = useState({});
    const [specialties, setSpecialties] = useState([]);
    const [newSpecialtyName, setNewSpecialtyName] = useState('');
    const setToast = useContext(ToastContext);
    const dispatch = useAppDispatch();
    const user = useSelector((state: RootState) => state.authentication.user);

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetchSpecialties();
            setSpecialties(data);
            if (user && user.specialties) {
                const userSpecialties = user.specialties
                    .reduce((acc, curr) => ({ ...acc, [curr.name]: true }), {});
                setSelectedSpecialties(userSpecialties);
            }
        };

        fetchData();
    }, [user]);

    const handleChange = async (event) => {
        const updatedSelectedSpecialties = { ...selectedSpecialties, [event.target.name]: event.target.checked };
        setSelectedSpecialties(updatedSelectedSpecialties);

        const selectedIds = Object.keys(updatedSelectedSpecialties)
            .filter(key => updatedSelectedSpecialties[key])
            .map(key => specialties.find(specialty => specialty.name === key)?.id)
            .filter(id => id !== undefined);
        await dispatch(updateSpecialties({ selectedIds, setToast }));
    };

    const handleCreate = async () => {
        try {
            const response = await createSpecialty({ name: newSpecialtyName });
            setNewSpecialtyName('');

            if (!specialties.some(specialty => specialty.name === newSpecialtyName)) {
                const newSpecialty = { id: response.id, name: newSpecialtyName };
                const updatedSpecialties = [...specialties, newSpecialty];
                setSpecialties(updatedSpecialties);

                const updatedSelectedSpecialties = {
                    ...selectedSpecialties,
                    [newSpecialty.name]: true
                };
                setSelectedSpecialties(updatedSelectedSpecialties);
                const selectedIds = Object.keys(updatedSelectedSpecialties)
                    .filter(key => updatedSelectedSpecialties[key])
                    .map(key => updatedSpecialties.find(specialty => specialty.name === key)?.id)
                    .filter(id => id !== undefined);
                await dispatch(updateSpecialties({ selectedIds, setToast }));

                setToast({ open: true, message: 'Doctor type created and applied successfully!', type: 'success' });
            } else {
                setToast({ open: true, message: 'Doctor type already exists!', type: 'info' });
            }
        } catch (error) {
            setToast({ open: true, message: 'Failed to create doctor type!', type: 'error' });
        }
    };

    return (
        <ThemedContainer maxWidth="md">
            <SpecialtyList
                specialties={specialties}
                selectedSpecialties={selectedSpecialties}
                handleChange={handleChange}
            />
            <AddSpecialty
                newSpecialtyName={newSpecialtyName}
                handleCreate={handleCreate}
                setNewSpecialityName={setNewSpecialtyName}
            />
        </ThemedContainer>
    );
};

export default SpecialtiesPage;
