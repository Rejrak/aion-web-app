import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { Workout } from '../../interfaces/trainginPlan';

interface WorkoutDialogProps {
    open: boolean;
    workout: Workout | null;
    onClose: () => void;
    onSave: (workout: Workout) => void;
}

const WorkoutDialog: React.FC<WorkoutDialogProps> = ({ open, workout, onClose, onSave }) => {
    const [name, setName] = useState(workout?.name || '');

    const handleSave = () => {
        onSave({ ...workout, name } as Workout);
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{workout ? 'Modifica Workout' : 'Nuovo Workout'}</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Nome Workout"
                    type="text"
                    fullWidth
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Annulla</Button>
                <Button onClick={handleSave} color="primary">Salva</Button>
            </DialogActions>
        </Dialog>
    );
};

export default WorkoutDialog;
