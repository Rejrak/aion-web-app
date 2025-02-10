import { Workout } from '../../interfaces/trainginPlan';
import { Card, CardContent, CardActions, Typography } from '@mui/material';
import React, { useState } from 'react';
import { List, ListItem, ListItemText, IconButton, TextField, Button } from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';

interface WorkoutItemProps {
    workout: Workout;
    onEdit: (workout: Workout) => void;
    onDelete: (id: string) => void;
}

const WorkoutItem: React.FC<WorkoutItemProps> = ({ workout, onEdit, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editedWorkout, setEditedWorkout] = useState(workout);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onEdit(editedWorkout);
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditedWorkout(workout);
        setIsEditing(false);
    };

    const handleChange = (field: string, value: any) => {
        setEditedWorkout({ ...editedWorkout, [field]: value });
    };

    const handleExerciseChange = (index: number, field: string, value: any) => {
        const updatedExercises = editedWorkout.exercises.map((ex, i) => 
            i === index ? { ...ex, [field]: value } : ex
        );
        setEditedWorkout({ ...editedWorkout, exercises: updatedExercises });
    };

    return (
        <Card sx={{ marginBottom: "20px" }}>
            <CardContent>
                {isEditing ? (
                    <TextField
                        label="Workout Name"
                        value={editedWorkout.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        fullWidth
                    />
                ) : (
                    <Typography variant="h5" component="div">
                        {workout.name}
                    </Typography>
                )}
                <Card sx={{ marginTop: "20px" }}>
                    <CardContent>
                        <Typography variant="h6" component="div">
                            Exercises
                        </Typography>
                        <List>
                            {editedWorkout.exercises.map((ex, index) => (
                                <ListItem key={ex.id} sx={{ flexDirection: 'column', alignItems: 'flex-start', padding: '10px', borderBottom: '1px solid #e0e0e0' }}>
                                    {isEditing ? (
                                        <>
                                            <TextField
                                                label="Exercise Type"
                                                value={ex.exerciseTypeName}
                                                onChange={(e) => handleExerciseChange(index, 'exerciseTypeName', e.target.value)}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Muscle Group"
                                                value={ex.exerciseMuscleGroup}
                                                onChange={(e) => handleExerciseChange(index, 'exerciseMuscleGroup', e.target.value)}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Series"
                                                value={ex.series}
                                                onChange={(e) => handleExerciseChange(index, 'series', e.target.value)}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Repetitions"
                                                value={ex.repetitions}
                                                onChange={(e) => handleExerciseChange(index, 'repetitions', e.target.value)}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Duration (minutes)"
                                                value={ex.duration.minutes}
                                                onChange={(e) => handleExerciseChange(index, 'duration', { ...ex.duration, minutes: e.target.value })}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Duration (seconds)"
                                                value={ex.duration.seconds}
                                                onChange={(e) => handleExerciseChange(index, 'duration', { ...ex.duration, seconds: e.target.value })}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Rest (minutes)"
                                                value={ex.rest.minutes}
                                                onChange={(e) => handleExerciseChange(index, 'rest', { ...ex.rest, minutes: e.target.value })}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Rest (seconds)"
                                                value={ex.rest.seconds}
                                                onChange={(e) => handleExerciseChange(index, 'rest', { ...ex.rest, seconds: e.target.value })}
                                                fullWidth
                                            />
                                            <TextField
                                                label="Notes"
                                                value={ex.notes}
                                                onChange={(e) => handleExerciseChange(index, 'notes', e.target.value)}
                                                fullWidth
                                            />
                                        </>
                                    ) : (
                                        <ListItemText
                                            primary={
                                                <Typography variant="h6" component="div">
                                                    {`${index + 1}. ${ex.exerciseTypeName}`}
                                                </Typography>
                                            }
                                            secondary={
                                                <>
                                                    <Typography component="span" variant="body2" color="text.secondary">
                                                        Muscle Group: {ex.exerciseMuscleGroup}
                                                    </Typography>
                                                    <br />
                                                    <Typography component="span" variant="body2" color="text.secondary">
                                                        Series: {ex.series}, Repetitions: {ex.repetitions}
                                                    </Typography>
                                                    <br />
                                                    <Typography component="span" variant="body2" color="text.secondary">
                                                        Duration: {ex.duration.minutes} min {ex.duration.seconds} sec
                                                    </Typography>
                                                    <br />
                                                    <Typography component="span" variant="body2" color="text.secondary">
                                                        Rest: {ex.rest.minutes} min {ex.rest.seconds} sec
                                                    </Typography>
                                                    {ex.notes && (
                                                        <>
                                                            <br />
                                                            <Typography component="span" variant="body2" color="text.secondary">
                                                                Notes: {ex.notes}
                                                            </Typography>
                                                        </>
                                                    )}
                                                </>
                                            }
                                        />
                                    )}
                                </ListItem>
                            ))}
                        </List>
                    </CardContent>
                </Card>
            </CardContent>
            <CardActions>
                {isEditing ? (
                    <>
                        <IconButton edge="end" aria-label="save" onClick={handleSaveClick}>
                            <Save />
                        </IconButton>
                        <IconButton edge="end" aria-label="cancel" onClick={handleCancelClick}>
                            <Cancel />
                        </IconButton>
                    </>
                ) : (
                    <>
                        <IconButton edge="end" aria-label="edit" onClick={handleEditClick}>
                            <Edit />
                        </IconButton>
                        <IconButton edge="end" aria-label="delete" onClick={() => onDelete(workout.id)}>
                            <Delete />
                        </IconButton>
                    </>
                )}
            </CardActions>
        </Card>
    );
};

export default WorkoutItem;