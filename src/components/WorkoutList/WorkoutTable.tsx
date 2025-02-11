import React from 'react';
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

interface WorkoutTableProps {
    workout: Workout;
    isEditing: boolean;
    sortOrder: 'asc' | 'desc';
    onSort: () => void;
    onExerciseChange: (index: number, field: string, value: any) => void;
    onDeleteExercise: (index: number) => void;
}

const WorkoutTable: React.FC<WorkoutTableProps> = ({ workout, isEditing, sortOrder, onSort, onExerciseChange, onDeleteExercise }) => {
    return (
        <TableContainer component={Paper} sx={{ marginBottom: 2 }}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Tipo Esercizio</TableCell>
                        <TableCell>
                            Muscoli Coinvolti
                            <IconButton onClick={onSort} size="small">
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
                    {workout.exercises.map((ex, index) => (
                        <WorkoutTableRow
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
