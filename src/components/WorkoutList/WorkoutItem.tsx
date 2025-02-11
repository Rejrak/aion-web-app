import React, { useState, useCallback } from 'react';
import { Workout } from '../../interfaces/trainginPlan';
import { Paper, Typography, TextField, Button, IconButton, useMediaQuery } from '@mui/material';
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
                <WorkoutTable 
                    workout={editedWorkout} 
                    isEditing={isEditing} 
                    sortOrder={sortOrder} 
                    onSort={sortExercises} 
                    onExerciseChange={handleExerciseChange} 
                    onDeleteExercise={handleDeleteExercise}
                />
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {renderActionButtons()}
            </div>
        </Paper>
    );
};

export default WorkoutItem;
