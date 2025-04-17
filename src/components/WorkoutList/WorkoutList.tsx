import React, { useState, useEffect } from 'react';
import { Container, Paper, Typography, Button, List, CircularProgress, Box, Grow, Snackbar, Alert } from '@mui/material';
import { Add, ArrowBack } from '@mui/icons-material';
import WorkoutItem from './WorkoutItem';
import WorkoutDialog from './WorkoutDialog';
import ConfirmDialog from '../Commons/ConfirmDialog';
import { Workout } from '../../interfaces/trainginPlan';
import { Tabs, Tab } from '@mui/material';
import { useTrainingPlan } from '../../context/trainginPlanContext';

interface WorkoutListProps {
    onBack: () => void;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ onBack }) => {
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [currentWorkout, setCurrentWorkout] = useState<Workout | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
    const [confirmDialogOpen, setConfirmDialogOpen] = useState<boolean>(false);
    const [workoutToDelete, setWorkoutToDelete] = useState<string | null>(null);
    const [selectedTab, setSelectedTab] = useState<number>(0);
    const { trainingPlan, setTrainingPlanContext, clearTrainingPlanContext } = useTrainingPlan();
    

    const fetchWorkouts = () => {
        try {
            setLoading(true);
            if (!trainingPlan) {
                setError('Nessun piano di allenamento selezionato.');
                return;
            }
        } catch (err) {
            console.error("Errore nel fetch dei workout:", err);
            setError(err instanceof Error ? err.message : 'Errore sconosciuto');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setCurrentWorkout(trainingPlan?.workouts[0] || null);
        fetchWorkouts();
    }, [trainingPlan]);

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
                // TODO Update workout in the trainingPlan in the context
            } else {
                // TODO Update workout in the trainingPlan in the context
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
            // TODO remove workout from the one in the context 
        } catch (err) {
            console.error("Errore nell'eliminazione del workout:", err);
        } finally {
            setConfirmDialogOpen(false);
            setWorkoutToDelete(null);
        }
    };

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setSelectedTab(newValue);
        setCurrentWorkout(trainingPlan!.workouts[newValue]);
    };

    return (
        <Container sx={{ marginTop: 0, marginBottom: 4, minWidth: '100%'}} >
            <Button variant="outlined" color="secondary" startIcon={<ArrowBack />} onClick={onBack}>
                Torna Indietro
            </Button>
            <Paper elevation={0} sx={{ padding: 0, marginTop: 4, backgroundColor: 'transparent', boxShadow: 'none' }}>
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
                ) : trainingPlan!.workouts.length === 0 ? (
                    <Typography variant="h6" color="textSecondary">
                        Nessun workout trovato.
                    </Typography>
                ) : (
                    <>
                        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="workout tabs">
                            {trainingPlan!.workouts.map((workout, index) => ( 
                                <Tab 
                                    value={index} 
                                    label={workout.name} 
                                    key={workout.id} /> )
                            )}
                        </Tabs>
                        {currentWorkout !== null && (  
                            <WorkoutItem 
                                plan={trainingPlan!}
                                workout={currentWorkout!} 
                                onEdit={handleOpenDialog} 
                                onDelete={handleDeleteWorkout}  
                                key={currentWorkout!.id}/>
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
