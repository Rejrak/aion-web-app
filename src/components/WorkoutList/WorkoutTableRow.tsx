import React from 'react';
import { TableRow, TableCell, TextField, IconButton } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Exercise } from '../../interfaces/trainginPlan';

interface WorkoutTableRowProps {
    exercise: Exercise;
    index: number;
    isEditing: boolean;
    onExerciseChange: (index: number, field: string, value: any) => void;
    onDeleteExercise: (index: number) => void;
}

const WorkoutTableRow: React.FC<WorkoutTableRowProps> = ({ exercise, index, isEditing, onExerciseChange, onDeleteExercise }) => {
    return (
        <TableRow>
            {isEditing ? (
                <>
                    <TableCell>
                        <TextField
                            value={exercise.exerciseTypeName}
                            onChange={(e) => onExerciseChange(index, 'exerciseTypeName', e.target.value)}
                            fullWidth
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            value={exercise.exerciseMuscleGroup}
                            onChange={(e) => onExerciseChange(index, 'exerciseMuscleGroup', e.target.value)}
                            fullWidth
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            value={exercise.series}
                            onChange={(e) => onExerciseChange(index, 'series', e.target.value)}
                            fullWidth
                        />
                    </TableCell>
                    <TableCell>
                        <TextField
                            type='number'
                            value={exercise.repetitions}
                            onChange={(e) => onExerciseChange(index, 'repetitions', e.target.value)}
                            fullWidth
                        />
                    </TableCell>
                    <TableCell>{exercise.duration.minutes} min {exercise.duration.seconds} sec</TableCell>
                    <TableCell>{exercise.rest.minutes} min {exercise.rest.seconds} sec</TableCell>
                    <TableCell>{exercise.notes || "-"}</TableCell>
                    <TableCell>
                        <IconButton color="error" onClick={() => onDeleteExercise(index)}>
                            <Delete />
                        </IconButton>
                    </TableCell>
                </>
            ) : (
                <>
                <TableCell>{exercise.exerciseTypeName}</TableCell>
                <TableCell>{exercise.exerciseMuscleGroup}</TableCell>
                <TableCell align='center'>{exercise.series}</TableCell>
                <TableCell align='center'>{exercise.repetitions}</TableCell>
                <TableCell>{exercise.duration.minutes} min {exercise.duration.seconds} sec</TableCell>
                <TableCell>{exercise.rest.minutes} min {exercise.rest.seconds} sec</TableCell>
                <TableCell>{exercise.notes || "-"}</TableCell>
                </>
            )}
        </TableRow>
    );
};

export default WorkoutTableRow;
