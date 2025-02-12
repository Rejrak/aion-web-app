import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, TextField, Button, List, CircularProgress, Box, Grow, Snackbar, Alert } from '@mui/material';
import { Add } from '@mui/icons-material';
import TrainingPlanItem from './TrainingPlanItem';
import TrainingPlanDialog from './TrainingPlanDialog';
import { v4 as uuidv4 } from 'uuid';
import { getTrainingPlans, addTrainingPlan, updateTrainingPlan, deleteTrainingPlan } from '../../services/firebaseTrainingPlan';
import { TrainingPlan } from '../../interfaces/trainginPlan';
import { useUser } from '../../context/userContext';

interface TrainingPlanListProps {
    onSelectTrainingPlan: (plan: TrainingPlan) => void;
}


const TrainingPlanList: React.FC<TrainingPlanListProps> = ({ onSelectTrainingPlan }) => {
    const [trainingPlans, setTrainingPlans] = useState<TrainingPlan[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPlan, setCurrentPlan] = useState<TrainingPlan | null>(null);
    const [open, setOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
    const { user } = useUser();

    const fetchTrainingPlans = async () => {
        try {
            setLoading(true);
            const data = await getTrainingPlans(user!.userId);
            setTrainingPlans(data);
        } catch (err) {
            console.error("Errore nel fetch dei piani di allenamento:", err);
            setError(err instanceof Error ? err.message : 'Errore sconosciuto');
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
        try {
            const newPlan = plan.id ? plan : { ...plan, id: uuidv4(), assignDate: plan.assignedDate.toISOString() };

            if (plan.id) {
                await updateTrainingPlan(newPlan);
                setTrainingPlans((prev) => prev.map((p) => (p.id === newPlan.id ? newPlan : p)));
            } else {
                await addTrainingPlan(user!.userId, newPlan);
                setTrainingPlans((prev) => [...prev, newPlan]);
            }
            setSnackbarMessage('Piano di allenamento salvato con successo!');
        } catch (err) {
            console.error("Errore nel salvataggio del piano di allenamento:", err);
        } finally {
            handleCloseDialog();
        }
    };

    const handleDeleteTrainingPlan = async (id: string) => {
        const confirmed = window.confirm("Sei sicuro di voler eliminare questo piano?");
        if (!confirmed) return;

        try {
            await deleteTrainingPlan(user!.userId, id);
            setTrainingPlans((prev) => prev.filter((p) => p.id !== id));
        } catch (err) {
            console.error("Errore nell'eliminazione del piano di allenamento:", err);
        }
    };

    const filteredPlans = trainingPlans.filter((plan) =>
        plan.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Container sx={{ marginTop: 0, marginBottom: 4 }} style={{ minWidth: '100%' }}>
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
                                <div onClick={() => onSelectTrainingPlan(plan)} style={{ cursor: 'pointer' }}>
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

            <Snackbar open={!!snackbarMessage} autoHideDuration={3000} onClose={() => setSnackbarMessage(null)}>
                <Alert onClose={() => setSnackbarMessage(null)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default TrainingPlanList;
