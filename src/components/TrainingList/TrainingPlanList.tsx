import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, List, CircularProgress, Box, Grow } from '@mui/material';
import { Add } from '@mui/icons-material';
import TrainingPlanItem from './TrainingPlanItem';
import TrainingPlanDialog from './TrainingPlanDialog';
import { v4 as uuidv4 } from 'uuid';
import { getTrainingPlans, addTrainingPlan, updateTrainingPlan, deleteTrainingPlan } from '../../services/firebaseTrainingPlan'; // Implementare

import { TrainingPlan } from '../../interfaces/trainginPlan';
import { useUser } from '../../context/userContext';

const TrainingPlanList: React.FC = () => {
    const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPlan, setCurrentPlan] = useState<TrainingPlan | null>(null);
    const [open, setOpen] = useState(false);
    const { loginUserContext, logoutUserContext, user } = useUser();

    const fetchTrainingPlans = async () => {
        try {
            setLoading(true);
            const data = await getTrainingPlans(user!.userId);
            setTrainingPlans(data);
        } catch (err) {
            setError('Errore durante il caricamento dei piani di allenamento.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrainingPlans();
    }, []);

    const handleOpenDialog = (plan: TrainingPlan | null = null) => {
        setCurrentPlan(plan);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setCurrentPlan(null);
    };

    const handleSaveTrainingPlan = async (plan: TrainingPlan) => {
        const newPlan = plan.id ? plan : { ...plan, id: uuidv4(), assignDate: plan.assignedDate.toISOString() };
        
        if (plan.id) {
            await updateTrainingPlan(newPlan);
        } else {
            await addTrainingPlan(user!.userId,newPlan);
        }
        setTrainingPlans((prev) =>
            newPlan.id ? prev.map((p) => (p.id === newPlan.id ? newPlan : p)) : [...prev, newPlan]
        );
        await fetchTrainingPlans();
        handleCloseDialog();
    };

    const handleDeleteTrainingPlan = async (id: string) => {
        await deleteTrainingPlan(user!.userId,id);
        setTrainingPlans((prev) => prev.filter((p) => p.id !== id));
    };

    const filteredPlans = trainingPlans.filter((plan) =>
        plan.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container sx={{ marginTop: 0, marginBottom: 4 }}>
            <Paper elevation={0} sx={{ padding: 3, marginTop: 4, backgroundColor: 'transparent', boxShadow: 'none' }}>
                <TextField
                    fullWidth
                    label="Cerca piano di allenamento"
                    variant="outlined"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenDialog()}>
                    Aggiungi Piano
                </Button>
                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '200px' }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : filteredPlans.length === 0 ? (
                    <Typography variant="h6" color="textSecondary">
                        Nessun piano trovato.
                    </Typography>
                ) : (
                    <List>
                        {filteredPlans.map((plan, index) => (
                            <Grow in style={{ transformOrigin: '0 0 0' }} {...{ timeout: 250 * (index + 1) }} key={plan.id}>
                                <div>
                                    <TrainingPlanItem
                                        trainingPlan={plan}
                                        onEdit={handleOpenDialog}
                                        onDelete={handleDeleteTrainingPlan}
                                    />
                                </div>
                            </Grow>
                        ))}
                    </List>
                )}
            </Paper>

            <TrainingPlanDialog
                open={open}
                trainingPlan={currentPlan}
                onClose={handleCloseDialog}
                onSave={handleSaveTrainingPlan}
            />
        </Container>
    );
};

export default TrainingPlanList;
