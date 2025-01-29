import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, MenuItem } from '@mui/material';
import { TrainingPlan, TrainingType } from '../../interfaces/trainginPlan';

interface TrainingPlanDialogProps {
    open: boolean;
    trainingPlan: TrainingPlan | null;
    onClose: () => void;
    onSave: (plan: TrainingPlan) => void;
}

const TrainingPlanDialog: React.FC<TrainingPlanDialogProps> = ({ open, trainingPlan, onClose, onSave }) => {
    const [formState, setFormState] = useState<TrainingPlan>({
        id: '',
        userId: '',
        name: '',
        assignedDate: new Date(),
        trainingType: TrainingType.Forza,
        workouts: [],
    });

    useEffect(() => {
        if (trainingPlan) setFormState(trainingPlan);
    }, [trainingPlan]);

    const handleChange = (field: keyof TrainingPlan, value: any) => {
        setFormState((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        onSave(formState);
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>{trainingPlan ? 'Modifica Piano' : 'Nuovo Piano'}</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    label="Nome"
                    variant="outlined"
                    value={formState.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <TextField
                    fullWidth
                    label="Tipo di Allenamento"
                    variant="outlined"
                    select
                    value={formState.trainingType}
                    onChange={(e) => handleChange('trainingType', e.target.value as TrainingType)}
                    sx={{ marginBottom: 2 }}
                >
                    {Object.values(TrainingType).map((type) => (
                        <MenuItem key={type} value={type}>
                            {type}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    fullWidth
                    label="Data di Assegnazione"
                    type="date"
                    value={formState.assignedDate.toISOString().split('T')[0]}
                    onChange={(e) => handleChange('assignedDate', new Date(e.target.value))}
                    sx={{ marginBottom: 2 }}
                 /> 
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="secondary">
                    Annulla
                </Button>
                <Button onClick={handleSave} color="primary">
                    Salva
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default TrainingPlanDialog;
