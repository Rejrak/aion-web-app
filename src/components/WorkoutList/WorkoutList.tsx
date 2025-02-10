import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, List, CircularProgress, Box, Grow, Snackbar, Alert } from '@mui/material';
import { Add, ArrowBack } from '@mui/icons-material';
import WorkoutItem from './WorkoutItem';
import WorkoutDialog from './WorkoutDialog';
import ConfirmDialog from '../Commons/ConfirmDialog';
// import { getWorkouts, addWorkout, updateWorkout, deleteWorkout } from '../../services/firebaseWorkout';
import { TrainingPlan, Workout } from '../../interfaces/trainginPlan';
import { Tabs, Tab } from '@mui/material';

interface WorkoutListProps {
    trainingPlan: TrainingPlan;
    onBack: () => void;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ trainingPlan, onBack }) => {
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const [workoutToDelete, setWorkoutToDelete] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<number>(0);

    const fetchWorkouts = async () => {
        try {
            setLoading(true);
            setWorkouts(trainingPlan.workouts);
        } catch (err) {
            console.error("Errore nel fetch dei workout:", err);
            setError(err instanceof Error ? err.message : 'Errore sconosciuto');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const handleOpenDialog = (workout: Workout | null = null) => {
        setCurrentWorkout(workout);
        setOpen(true);
    };

    const handleCloseDialog = () => {
        setOpen(false);
        setCurrentWorkout(null);
    };

    const handleSaveWorkout = async (workout: Workout) => {
        try {
            if (workout.id) {
                // await updateWorkout(newWorkout);
                // setWorkouts((prev) => prev.map((w) => (w.id === newWorkout.id ? newWorkout : w)));
            } else {
                // await addWorkout(trainingPlanId, newWorkout);
                // setWorkouts((prev) => [...prev, newWorkout]);
            }
            setSnackbarMessage('Workout salvato con successo!');
        } catch (err) {
            console.error("Errore nel salvataggio del workout:", err);
        } finally {
            handleCloseDialog();
        }
    };

    const handleDeleteWorkout = (id: string) => {
        setWorkoutToDelete(id);
        setConfirmDialogOpen(true);
    };

    const confirmDeleteWorkout = async () => {
        if (!workoutToDelete) return;

        try {
            // await deleteWorkout(trainingPlanId, workoutToDelete);
            setWorkouts((prev) => prev.filter((w) => w.id !== workoutToDelete));
        } catch (err) {
            console.error("Errore nell'eliminazione del workout:", err);
        } finally {
            setConfirmDialogOpen(false);
            setWorkoutToDelete(null);
        }
    };

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
    };

    return (
        <Container sx={{ marginTop: 0, marginBottom: 4 }}>
            <Button variant="outlined" color="secondary" startIcon={<ArrowBack />} onClick={onBack}>
                Torna Indietro
            </Button>
            <Paper elevation={0} sx={{ padding: 3, marginTop: 4, backgroundColor: 'transparent', boxShadow: 'none' }}>
                <Typography variant="h5" sx={{ marginBottom: 2 }}>Lista Workout</Typography>
                <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenDialog()}>
                    Aggiungi Workout
                </Button>

                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '200px' }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : workouts.length === 0 ? (
                    <Typography variant="h6" color="textSecondary">
                        Nessun workout trovato.
                    </Typography>
                ) : (
                    <>
                        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="workout tabs">
                            {workouts.map((workout, index) => (
                                <Tab label={workout.name} key={workout.id} />
                            ))}
                        </Tabs>
                        {workouts[selectedTab] && (
                            <Grow in style={{ transformOrigin: '0 0 0' }} timeout={250}>
                                <div>
                                    <WorkoutItem workout={workouts[selectedTab]} onEdit={handleOpenDialog} onDelete={handleDeleteWorkout} />
                                </div>
                            </Grow>
                        )}
                    </>
                )}
            </Paper>

            <WorkoutDialog open={open} workout={currentWorkout} onClose={handleCloseDialog} onSave={handleSaveWorkout} />

            <ConfirmDialog open={confirmDialogOpen} title="Conferma Eliminazione" message="Sei sicuro di voler eliminare questo workout?" onClose={() => setConfirmDialogOpen(false)} onConfirm={confirmDeleteWorkout} />

            <Snackbar open={!!snackbarMessage} autoHideDuration={3000} onClose={() => setSnackbarMessage(null)}>
                <Alert onClose={() => setSnackbarMessage(null)} severity="success">
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
};

export default WorkoutList;
