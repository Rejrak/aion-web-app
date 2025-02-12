import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton
} from '@mui/material';
import { ArrowUpward, ArrowDownward } from '@mui/icons-material';
import WorkoutTableRow from './WorkoutTableRow';
import { Workout } from '../../interfaces/trainginPlan';
import { ExerciseType } from '../../interfaces/exerciseType';
import { Exercise } from '../../interfaces/trainginPlan';
import { getExerciseTypes } from '../../services/firebaseExerciseType';

interface WorkoutTableProps {
    workout: Workout;
    isEditing: boolean;
    sortOrder: 'asc' | 'desc';
    onSort: () => void;
    onExerciseChange: (index: number, field: string, value: any) => void;
    onDeleteExercise: (index: number) => void;
}

const WorkoutTable: React.FC<WorkoutTableProps> = ({ workout, isEditing, sortOrder, onSort, onExerciseChange, onDeleteExercise }) => {
    const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const fetchExercises = async () => {
        try {
            setLoading(true);
            const data = await getExerciseTypes();
            setExerciseTypes(data);
        } catch (err) {
            console.error("Errore nel fetch degli esercizi:", err);
            setError(err instanceof Error ? err.message : 'Errore sconosciuto');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExercises();
    }, []);

    const groupByMuscle = (exercises: ExerciseType[]) => {
        return exercises.reduce((acc, exercise) => {
            if (!acc[exercise.muscleGroup]) {
                acc[exercise.muscleGroup] = [];
            }
            acc[exercise.muscleGroup].push(exercise);
            return acc;
        }, {} as Record<string, ExerciseType[]>);
    };

    const groupedExercises = groupByMuscle(exerciseTypes);


    return (
        <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            Muscoli Coinvolti
                            <IconButton onClick={onSort} size="small">
                                {sortOrder === 'asc' ? <ArrowUpward /> : <ArrowDownward />}
                            </IconButton>
                        </TableCell>
                        <TableCell>Tipo Esercizio</TableCell>
                        <TableCell>Serie</TableCell>
                        <TableCell>Ripetizioni</TableCell>
                        <TableCell>Durata</TableCell>
                        <TableCell>Riposo</TableCell>
                        <TableCell>Note</TableCell>
                        {isEditing && <TableCell>Azioni</TableCell>}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {workout.exercises.map((ex, index) => (
                        <WorkoutTableRow
                            exerciseTypes={exerciseTypes}
                            muscleGroups={Object.keys(groupedExercises)}
                            key={ex.id}
                            exercise={ex}
                            index={index}
                            isEditing={isEditing}
                            onExerciseChange={onExerciseChange}
                            onDeleteExercise={onDeleteExercise}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default WorkoutTable;
