import React, { useEffect, useState } from 'react';
import { TableRow, TableCell, TextField, IconButton, Select, MenuItem } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { Exercise } from '../../interfaces/trainginPlan';
import { ExerciseType } from '../ExerciseList/exerciseTypeList';

interface WorkoutTableRowProps {
    muscleGroups: string[];
    exerciseTypes: ExerciseType[];
    exercise: Exercise;
    index: number;
    isEditing: boolean;
    onExerciseChange: (index: number, field: string, value: any) => void;
    onDeleteExercise: (index: number) => void;
}

const WorkoutTableRow: React.FC<WorkoutTableRowProps> = ({ muscleGroups, exercise, exerciseTypes, index, isEditing, onExerciseChange, onDeleteExercise }) => {
    const [muscleGroup, setMuscleGroup] = useState<string>('');
    const [exerciseTypeSelected, setExerciseType] = useState<string>('');
    const handleSave = () => {};
    useEffect(() => {
        if (exercise) {
            setMuscleGroup(exercise.exerciseMuscleGroup);
            setExerciseType(exercise.exerciseTypeName);
            // setNewExercise(exercise);
        }
    }, [exercise]);

    return (
        <TableRow>
            {isEditing ? (
                <>
                    <TableCell>
                        <Select
                            fullWidth
                            value={muscleGroup}
                            onChange={(e) => { setMuscleGroup(e.target.value as string); }}
                        >
                            {muscleGroups.map((group) => (
                                <MenuItem key={group} value={group}>
                                    {group}
                                </MenuItem>
                            ))}
                        </Select>
                    </TableCell>
                    <TableCell>
                    <Select
                            fullWidth
                            value={exerciseTypeSelected}
                            onChange={(e) => { setExerciseType(e.target.value as string); }}
                        >
                            {exerciseTypes.filter((exerciseType) => exerciseType.muscleGroup === muscleGroup).map((ext) => (
                                <MenuItem key={ext.id} value={ext.name}>
                                    {ext.name}
                                </MenuItem>
                            ))}
                        </Select>
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
                    <TableCell>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <>
                                <TextField
                                    size='small'
                                    type='number'
                                    label="min"
                                    value={exercise.duration.minutes}
                                    onChange={(e) => onExerciseChange(index, 'duration-min', e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    size='small'
                                    type='number'
                                    label="sec"
                                    value={exercise.duration.seconds}
                                    onChange={(e) => onExerciseChange(index, 'duration-sec', e.target.value)}
                                    fullWidth
                                />
                            </>
                        </div>
                        {/* {exercise.duration.minutes} min {exercise.duration.seconds} sec */}
                    </TableCell>
                    <TableCell>
                        <div style={{ display: 'flex', gap: '8px' }}>
                            <>
                                <TextField
                                    size='small'
                                    type='number'
                                    label="min"
                                    value={exercise.rest.minutes}
                                    onChange={(e) => onExerciseChange(index, 'rest-min', e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    size='small'
                                    type='number'
                                    label="sec"
                                    value={exercise.rest.seconds}
                                    onChange={(e) => onExerciseChange(index, 'duration-sec', e.target.value)}
                                    fullWidth
                                />
                            </>
                        </div>
                    </TableCell>
                    <TableCell style={{ width: "20%", maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <TextField
                            size="medium"
                            label="Note"
                            value={exercise.notes}
                            onChange={(e) => onExerciseChange(index, 'notes', e.target.value)}
                            fullWidth
                            multiline
                            rows={2} // Puoi regolarlo per permettere più righe 
                        />
                    </TableCell>

                    <TableCell>
                        <IconButton color="error" onClick={() => onDeleteExercise(index)}>
                            <Delete />
                        </IconButton>
                    </TableCell>

                </>
            ) : (
                <>
                    <TableCell>{exercise.exerciseMuscleGroup}</TableCell>
                    <TableCell>{exercise.exerciseTypeName}</TableCell>
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
