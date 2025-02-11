import { Workout } from '../../interfaces/trainginPlan';
import {
    Typography,
    IconButton,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Card,
    CardContent,
    CardActions,
    useMediaQuery,
} from '@mui/material';
import { Edit, Delete, Save, Cancel, ArrowUpward, ArrowDownward } from '@mui/icons-material';
import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';

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

    const handleExerciseChange = (index: number, field: string, value: any) => {
        const updatedExercises = editedWorkout.exercises.map((ex, i) =>
            i === index ? { ...ex, [field]: value } : ex
        );
        setEditedWorkout({ ...editedWorkout, exercises: updatedExercises });
    };

    // Eliminazione di un esercizio dal workout
    const handleDeleteExercise = (index: number) => {
        const updatedExercises = editedWorkout.exercises.filter((_, i) => i !== index);
        setEditedWorkout({ ...editedWorkout, exercises: updatedExercises });
    };

    // Ordinamento per gruppo muscolare
    const sortExercises = () => {
        const sortedExercises = [...editedWorkout.exercises].sort((a, b) => {
            if (a.exerciseMuscleGroup < b.exerciseMuscleGroup) return sortOrder === 'asc' ? -1 : 1;
            if (a.exerciseMuscleGroup > b.exerciseMuscleGroup) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });

        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        setEditedWorkout({ ...editedWorkout, exercises: sortedExercises });
    };

    return (
        <Paper sx={{ padding: 3, marginBottom: "20px" }}>
            {isEditing ? (
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
            )}

            {/* ✅ VERSIONE TABELLARE (SOLO DESKTOP) */}
            {!isMobile && (
                <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Tipo Esercizio</TableCell>
                                <TableCell>
                                    Muscoli Coinvolti
                                    <IconButton onClick={sortExercises} size="small">
                                        {sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                                    </IconButton>
                                </TableCell>
                                <TableCell>Serie</TableCell>
                                <TableCell>Ripetizioni</TableCell>
                                <TableCell>Durata</TableCell>
                                <TableCell>Riposo</TableCell>
                                <TableCell>Note</TableCell>
                                {isEditing && <TableCell>Azioni</TableCell>}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {editedWorkout.exercises.map((ex, index) => (
                                <TableRow key={ex.id}>
                                    {isEditing ? (
                                        <>
                                            <TableCell>
                                                <TextField
                                                    value={ex.exerciseTypeName}
                                                    onChange={(e) => handleExerciseChange(index, 'exerciseTypeName', e.target.value)}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={ex.exerciseMuscleGroup}
                                                    onChange={(e) => handleExerciseChange(index, 'exerciseMuscleGroup', e.target.value)}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={ex.series}
                                                    onChange={(e) => handleExerciseChange(index, 'series', e.target.value)}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <TextField
                                                    value={ex.repetitions}
                                                    onChange={(e) => handleExerciseChange(index, 'repetitions', e.target.value)}
                                                    fullWidth
                                                />
                                            </TableCell>
                                            <TableCell>{ex.duration.minutes} min {ex.duration.seconds} sec</TableCell>
                                            <TableCell>{ex.rest.minutes} min {ex.rest.seconds} sec</TableCell>
                                            <TableCell>{ex.notes || "-"}</TableCell>
                                            <TableCell>
                                                <IconButton color="error" onClick={() => handleDeleteExercise(index)}>
                                                    <Delete />
                                                </IconButton>
                                            </TableCell>
                                        </>
                                    ) : (
                                        <>
                                            <TableCell>{ex.exerciseTypeName}</TableCell>
                                            <TableCell>{ex.exerciseMuscleGroup}</TableCell>
                                            <TableCell>{ex.series}</TableCell>
                                            <TableCell>{ex.repetitions}</TableCell>
                                            <TableCell>{ex.duration.minutes} min {ex.duration.seconds} sec</TableCell>
                                            <TableCell>{ex.rest.minutes} min {ex.rest.seconds} sec</TableCell>
                                            <TableCell>{ex.notes || "-"}</TableCell>
                                        </>
                                    )}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                {isEditing ? (
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
                )}
            </div>
        </Paper>
    );
};

export default WorkoutItem;
