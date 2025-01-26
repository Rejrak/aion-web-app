import React from 'react';
import { ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { ExerciseType } from '../../interfaces/exerciseType';

interface ExerciseItemProps {
    exercise: ExerciseType;
    onEdit: (exercise: ExerciseType) => void;
    onDelete: (id: string) => void;
}

const ExerciseItem: React.FC<ExerciseItemProps> = ({ exercise, onEdit, onDelete }) => {
    return (
        <>
            <ListItem
                secondaryAction={
                    <>
                        <IconButton edge="end" color="primary" onClick={() => onEdit(exercise)}>
                            <Edit />
                        </IconButton>
                        <IconButton edge="end" color="secondary" onClick={() => onDelete(exercise.id)}>
                            <Delete />
                        </IconButton>
                    </>
                }
            >
                <ListItemText primary={exercise.name} secondary={`Gruppo: ${exercise.muscleGroup}`} />
            </ListItem>
            <Divider />
        </>
    );
};

export default ExerciseItem;
