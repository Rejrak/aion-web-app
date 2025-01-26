import React, { useState, useEffect } from 'react';
import { Container, Paper, TextField, Typography, Button, Box, List, CircularProgress, Grow } from '@mui/material';
import { Add } from '@mui/icons-material';
import ExerciseItem from './exerciseTypeItem';
import ExerciseDialog from './exerciseDialog';
import { v4 as uuidv4 } from 'uuid';
import { getExerciseTypes, addExerciseType, updateExerciseType, deleteExerciseType } from '../../services/firebaseExerciseType'; // Assicurati di importare la funzione correttamente

export interface ExerciseType {
    id: string;
    muscleGroup: string;
    name: string;
}

const ExerciseList: React.FC = () => {
    const [exercises, setExercises] = useState<ExerciseType[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [open, setOpen] = useState<boolean>(false);
    const [currentExercise, setCurrentExercise] = useState<ExerciseType | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchExercises = async () => {
        try {
            setLoading(true);
            const data = await getExerciseTypes();
            setExercises(data);
            setError(null);
        } catch (err) {
            setError('Errore durante il caricamento degli esercizi.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    const handleOpenDialog = (exercise: ExerciseType | null = null) => {
        setCurrentExercise(exercise);
        setOpen(true);
    };
    const handleCloseDialog = () => {
        setCurrentExercise({ id: '', muscleGroup: '', name: '' });
        setOpen(false)
    };

    const handleSaveExercise  = async (exercise: ExerciseType) => {
        var newExerciseType = exercise ;
        if (newExerciseType.id) {
            await updateExerciseType(newExerciseType);
        } else {
            newExerciseType =  { ...exercise, id: exercise.id || uuidv4() };
            await addExerciseType(newExerciseType);
        }
        
        setExercises((prev) => newExerciseType.id 
            ? prev.map((ex) => (ex.id === newExerciseType.id ? newExerciseType : ex))
            : [...prev, newExerciseType]
        );
        setCurrentExercise(null);
        handleCloseDialog();
    };

    const handleDeleteExercise = async (id: string) => {
        setExercises((prev) => prev.filter((exercise) => exercise.id !== id));
        await deleteExerciseType(id);
        
    };

    const filteredExercises = exercises.filter(
        (exercise) =>
            exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            exercise.muscleGroup.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const groupByMuscle = (exercises: ExerciseType[]) => {
        return exercises.reduce((acc, exercise) => {
            if (!acc[exercise.muscleGroup]) {
                acc[exercise.muscleGroup] = [];
            }
            acc[exercise.muscleGroup].push(exercise);
            return acc;
        }, {} as Record<string, ExerciseType[]>);
    };

    const groupedExercises = groupByMuscle(filteredExercises);

    return (
        <Container component="main" sx={{ marginTop: 0, marginBottom: 4 }}>
            <Paper elevation={0} sx={{ padding: 3, marginTop: 4, backgroundColor: 'transparent', boxShadow: 'none' }}>
                <TextField fullWidth label="Cerca per nome o gruppo muscolare" variant="outlined" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} sx={{ marginBottom: 2 }}/>

                <Button variant="contained" color="primary" startIcon={<Add />} onClick={() => handleOpenDialog(null)} sx={{ marginBottom: 1 }}>
                    Aggiungi Esercizio
                </Button>

                {loading ? (
                    <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: '200px' }}>
                        <CircularProgress />
                    </Box>
                ) : error ? (
                    <Typography color="error">{error}</Typography>
                ) : Object.keys(groupedExercises).length === 0 ? (
                    <Typography variant="h6" color="textSecondary">
                        Nessun esercizio trovato.
                    </Typography>
                ) : (
                    Object.entries(groupedExercises).map(([muscleGroup, exercises]) => (
                        <Box key={muscleGroup} sx={{ marginBottom: 3 }}>
                            <Typography variant="h6" color="primary" sx={{ marginBottom: 1 }}>
                                {muscleGroup}
                            </Typography>
                            <List>
                                {exercises.map((exercise, index) => (
                                    <Grow in style={{ transformOrigin: '0 0 0' }} {...{ timeout: 250 * (index + 1) }} key={exercise.id} >
                                        <div>
                                            <ExerciseItem exercise={exercise} onEdit={handleOpenDialog} onDelete={handleDeleteExercise} />
                                        </div>
                                    </Grow>
                                ))}
                            </List>
                        </Box>
                    ))
                )}
            </Paper>

            <ExerciseDialog
                open={open}
                exercise={currentExercise}
                muscleGroups={Object.keys(groupedExercises)}
                onClose={handleCloseDialog}
                onSave={handleSaveExercise}
            />
        </Container>
    );
};

export default ExerciseList;
