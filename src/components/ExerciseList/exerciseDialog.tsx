import React, { useEffect, useState } from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Button,
    Select,
    MenuItem
} from '@mui/material';
import { ExerciseType } from '../../interfaces/exerciseType';

interface ExerciseDialogProps {
    open: boolean;
    exercise: ExerciseType | null;
    muscleGroups: string[];
    onClose: () => void;
    onSave: (exercise: ExerciseType) => void;
}

const ExerciseDialog: React.FC<ExerciseDialogProps> = ({ open, exercise, muscleGroups, onClose, onSave }) => {
    const [newExercise, setNewExercise] = useState<ExerciseType>(
        exercise || { id: '', name: '', muscleGroup: '' }
    );

    const [newMuscleGroup, setNewMuscleGroup] = useState<string>('');
    const [useNewGroup, setUseNewGroup] = useState<boolean>(false);

    const handleSave = () => {
        if (useNewGroup && newMuscleGroup.trim()) {
            onSave({ ...newExercise, muscleGroup: newMuscleGroup });
        } else {
            onSave(newExercise);
        }
        onClose();
    };
    useEffect(() => {
        if (exercise) {
            setNewExercise(exercise);
        }
    }, [exercise]);
    
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>{exercise?.id ? 'Modifica Esercizio' : 'Aggiungi Esercizio'}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Nome Esercizio"
                    variant="outlined"
                    value={newExercise.name}
                    onChange={(e) => setNewExercise({ ...newExercise, name: e.target.value })}
                    sx={{ marginBottom: 2 }}
                />

                <Select
                    fullWidth
                    value={useNewGroup ? 'new' : newExercise.muscleGroup}
                    onChange={(e) => {
                        if (e.target.value === 'new') {
                            setUseNewGroup(true);
                        } else {
                            setUseNewGroup(false);
                            setNewExercise({ ...newExercise, muscleGroup: e.target.value });
                        }
                    }}
                >
                    {muscleGroups.map((group) => (
                        <MenuItem key={group} value={group}>
                            {group}
                        </MenuItem>
                    ))}
                    <MenuItem value="new">+ Aggiungi nuovo gruppo</MenuItem>
                </Select>

                {useNewGroup && (
                    <TextField
                        fullWidth
                        label="Nuovo Gruppo Muscolare"
                        variant="outlined"
                        value={newMuscleGroup}
                        onChange={(e) => setNewMuscleGroup(e.target.value)}
                        sx={{ marginTop: 2 }}
                    />
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">Annulla</Button>
                <Button onClick={handleSave} color="primary">Salva</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExerciseDialog;
