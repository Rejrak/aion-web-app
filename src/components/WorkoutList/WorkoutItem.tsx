import React, { useState, useCallback } from 'react';
import { Workout } from '../../interfaces/trainginPlan';
import { Paper, Typography, TextField, Button, useMediaQuery, Card, CardHeader, CardActions, List, CardContent } from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import WorkoutTable from './WorkoutTable';

interface WorkoutItemProps {
    workout: Workout;
    onEdit: (workout: Workout) => void;
    onDelete: (id: string) => void;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedWorkout, setEditedWorkout] = useState(workout);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [editingExerciseIndex, setEditingExerciseIndex] = useState<number | null>(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleEditClick = () => setIsEditing(true);
    const handleSaveClick = () => {
        onEdit(editedWorkout);
        setIsEditing(false);
    };
    const handleCancelClick = () => {
        setEditedWorkout(workout);
        setIsEditing(false);
    };

    const handleExerciseChange = useCallback((index: number, field: string, value: any) => {
        setEditedWorkout((prevWorkout) => ({
            ...prevWorkout,
            exercises: prevWorkout.exercises.map((ex, i) =>
                i === index ? { ...ex, [field]: value } : ex
            )
        }));
    }, []);

    const handleDeleteExercise = useCallback((index: number) => {
        setEditedWorkout((prevWorkout) => ({
            ...prevWorkout,
            exercises: prevWorkout.exercises.filter((_, i) => i !== index)
        }));
    }, []);

    const sortExercises = useCallback(() => {
        setEditedWorkout((prevWorkout) => ({
            ...prevWorkout,
            exercises: [...prevWorkout.exercises].sort((a, b) =>
                sortOrder === 'asc'
                    ? a.exerciseMuscleGroup.localeCompare(b.exerciseMuscleGroup)
                    : b.exerciseMuscleGroup.localeCompare(a.exerciseMuscleGroup)
            )
        }));
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    }, [sortOrder]);

    const renderWorkoutTitle = () => (
        isEditing ? (
            <TextField
                label="Workout Name"
                value={editedWorkout.name}
                onChange={(e) => setEditedWorkout({ ...editedWorkout, name: e.target.value })}
                fullWidth
                sx={{ marginBottom: 2 }}
            />
        ) : (
            <Typography variant="h5" sx={{ marginBottom: 2 }}>
                {workout.name}
            </Typography>
        )
    );

    const renderActionButtons = () => (
        isEditing ? (
            <>
                <Button variant="contained" color="primary" startIcon={<Save />} onClick={handleSaveClick}>
                    Salva
                </Button>
                <Button variant="outlined" color="secondary" startIcon={<Cancel />} onClick={handleCancelClick}>
                    Annulla
                </Button>
            </>
        ) : (
            <>
                <Button variant="contained" color="warning" startIcon={<Edit />} onClick={handleEditClick}>
                    Modifica
                </Button>
                <Button variant="contained" color="error" startIcon={<Delete />} onClick={() => onDelete(workout.id)}>
                    Elimina Workout
                </Button>
            </>
        )
    );

    return (
        <Paper sx={{ padding: 3, marginBottom: "20px" }}>
            {renderWorkoutTitle()}
            {!isMobile && (
                <>
                    <WorkoutTable
                        workout={editedWorkout}
                        isEditing={isEditing}
                        sortOrder={sortOrder}
                        onSort={sortExercises}
                        onExerciseChange={handleExerciseChange}
                        onDeleteExercise={handleDeleteExercise}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        {renderActionButtons()}
                    </div>
                </>
            )}
            {isMobile &&
                <List>
                    {editedWorkout.exercises.map((e, index) => (
                        <Card key={index} sx={{ backgroundColor: '#000000aa', boxShadow: 3, marginBottom: '8px' }}>
                            <CardContent>
                                {editingExerciseIndex === index ? (
                                    <>
                                        <TextField
                                            label="Gruppo Muscolare"
                                            value={e.exerciseMuscleGroup}
                                            onChange={(event) => handleExerciseChange(index, 'exerciseMuscleGroup', event.target.value)}
                                            fullWidth
                                            sx={{ marginBottom: 2 }}
                                        />
                                        <TextField
                                            label="Tipo di Esercizio"
                                            value={e.exerciseTypeName}
                                            onChange={(event) => handleExerciseChange(index, 'exerciseTypeName', event.target.value)}
                                            fullWidth
                                            sx={{ marginBottom: 2 }}
                                        />
                                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: "8px" }}>
                                            <TextField
                                                label="Serie"
                                                type="number"
                                                value={e.series}
                                                onChange={(event) => handleExerciseChange(index, 'series', event.target.value)}
                                                fullWidth
                                                sx={{ marginBottom: 2 }}
                                            />
                                            <TextField
                                                label="Ripetizioni"
                                                type="number"
                                                value={e.repetitions}
                                                onChange={(event) => handleExerciseChange(index, 'repetitions', event.target.value)}
                                                fullWidth
                                                sx={{ marginBottom: 2 }}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: "8px" }}>
                                            <TextField
                                                label="Durata (minuti)"
                                                type="number"
                                                value={e.duration.minutes}
                                                onChange={(event) => handleExerciseChange(index, 'duration.minutes', event.target.value)}
                                                fullWidth
                                                sx={{ marginBottom: 2 }}
                                            />
                                            <TextField
                                                label="Durata (secondi)"
                                                type="number"
                                                value={e.duration.seconds}
                                                onChange={(event) => handleExerciseChange(index, 'duration.seconds', event.target.value)}
                                                fullWidth
                                                sx={{ marginBottom: 2 }}
                                            />
                                        </div>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: "8px" }}>
                                            <TextField
                                                label="Riposo (minuti)"
                                                type="number"
                                                value={e.rest.minutes}
                                                onChange={(event) => handleExerciseChange(index, 'rest.minutes', event.target.value)}
                                                fullWidth
                                                sx={{ marginBottom: 2 }}
                                            />
                                            <TextField
                                                label="Riposo (secondi)"
                                                type="number"
                                                value={e.rest.seconds}
                                                onChange={(event) => handleExerciseChange(index, 'rest.seconds', event.target.value)}
                                                fullWidth
                                                sx={{ marginBottom: 2 }}
                                            />
                                        </div>
                                        <TextField
                                            label="Note"
                                            value={e.notes}
                                            onChange={(event) => handleExerciseChange(index, 'notes', event.target.value)}
                                            fullWidth
                                            sx={{ marginBottom: 2 }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
                                            {e.exerciseMuscleGroup}
                                        </Typography>
                                        <Typography variant="h5" component="div">
                                            {e.exerciseTypeName}
                                        </Typography>
                                        {(e.duration.minutes !== 0 || e.duration.seconds !== 0) && <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Durata: {e.duration.minutes} min {e.duration.seconds} sec</Typography>}
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            {e.series != 0 && <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Serie: {e.series}x{e.repetitions}</Typography>}
                                            {<Typography sx={{ color: 'text.secondary', mb: 1.5 }}>Riposo: {e.rest.minutes} min {e.rest.seconds} sec</Typography>}
                                        </div>
                                        <Typography variant="body2">
                                            Note: {e.notes}
                                        </Typography>
                                    </>
                                )}
                            </CardContent>
                            <CardActions style={{ display: 'flex', justifyContent: 'space-between' }}>
                                {editingExerciseIndex === index ? (
                                    <>
                                        <Button size="small" onClick={() => setEditingExerciseIndex(null)}>Salva</Button>
                                        <Button size="small" onClick={() => setEditingExerciseIndex(null)}>Annulla</Button>
                                    </>
                                ) : (
                                    <>
                                        <Button size="small" onClick={() => setEditingExerciseIndex(index)}>Modifica</Button>
                                        <Button size="small" onClick={() => handleDeleteExercise(index)}>Cancella</Button>
                                    </>
                                )}
                            </CardActions>
                        </Card>
                    ))}
                </List>
            }
        </Paper>
    );
};

export default WorkoutItem;
