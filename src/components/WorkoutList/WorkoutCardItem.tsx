import { Button, Card, CardActions, CardContent, List, TextField, Typography } from "@mui/material";
import { useCallback, useState } from "react";
import { Workout } from "../../interfaces/trainginPlan";


interface WorkoutItemProps {
    workout: Workout;
    onEdit: (index: number, field: string, value: any) => void;
    onDelete: (id: string) => void;
}

const WorkoutCard: React.FC<WorkoutItemProps> = ({ workout, onEdit, onDelete }) => {
    const [editingExerciseIndex, setEditingExerciseIndex] = useState<number | null>(null);
    const [editedWorkout, setEditedWorkout] = useState(workout);
    const handleDeleteExercise = useCallback((index: number) => {
            setEditedWorkout((prevWorkout) => ({
                ...prevWorkout,
                exercises: prevWorkout.exercises.filter((_, i) => i !== index)
            }));
        }, []);

    return (
        <List>
            {editedWorkout.exercises.map((e, index) => (
                <Card key={index} sx={{ backgroundColor: '#000000aa', boxShadow: 3, marginBottom: '8px' }}>
                    <CardContent>
                        {editingExerciseIndex === index ? (
                            <>
                                <TextField
                                    label="Gruppo Muscolare"
                                    value={e.exerciseMuscleGroup}
                                    onChange={(event) => onEdit(index, 'exerciseMuscleGroup', event.target.value)}
                                    fullWidth
                                    sx={{ marginBottom: 2 }}
                                />
                                <TextField
                                    label="Tipo di Esercizio"
                                    value={e.exerciseTypeName}
                                    onChange={(event) => onEdit(index, 'exerciseTypeName', event.target.value)}
                                    fullWidth
                                    sx={{ marginBottom: 2 }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: "8px" }}>
                                    <TextField
                                        label="Serie"
                                        type="number"
                                        value={e.series}
                                        onChange={(event) => onEdit(index, 'series', event.target.value)}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        label="Ripetizioni"
                                        type="number"
                                        value={e.repetitions}
                                        onChange={(event) => onEdit(index, 'repetitions', event.target.value)}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: "8px" }}>
                                    <TextField
                                        label="Durata (minuti)"
                                        type="number"
                                        value={e.duration.minutes}
                                        onChange={(event) => onEdit(index, 'duration.minutes', event.target.value)}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        label="Durata (secondi)"
                                        type="number"
                                        value={e.duration.seconds}
                                        onChange={(event) => onEdit(index, 'duration.seconds', event.target.value)}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', gap: "8px" }}>
                                    <TextField
                                        label="Riposo (minuti)"
                                        type="number"
                                        value={e.rest.minutes}
                                        onChange={(event) => onEdit(index, 'rest.minutes', event.target.value)}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                    <TextField
                                        label="Riposo (secondi)"
                                        type="number"
                                        value={e.rest.seconds}
                                        onChange={(event) => onEdit(index, 'rest.seconds', event.target.value)}
                                        fullWidth
                                        sx={{ marginBottom: 2 }}
                                    />
                                </div>
                                <TextField
                                    label="Note"
                                    value={e.notes}
                                    onChange={(event) => onEdit(index, 'notes', event.target.value)}
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
    );
};

export default WorkoutCard;