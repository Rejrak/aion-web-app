import React from 'react';
import { ListItem, ListItemText, IconButton, Divider } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { TrainingPlan } from '../../interfaces/trainginPlan';

interface TrainingPlanItemProps {
    trainingPlan: TrainingPlan;
    onEdit: (plan: TrainingPlan) => void;
    onDelete: (id: string) => void;
}

const TrainingPlanItem: React.FC<TrainingPlanItemProps> = ({ trainingPlan, onEdit, onDelete }) => {
    return (
        <>
            <ListItem
                secondaryAction={
                    <>
                        <IconButton edge="end" color="primary" onClick={() => onEdit(trainingPlan)}>
                            <Edit />
                        </IconButton>
                        <IconButton edge="end" color="secondary" onClick={() => onDelete(trainingPlan.id)}>
                            <Delete />
                        </IconButton>
                    </>
                }
            >
                <ListItemText
                    primary={trainingPlan.name}
                    secondary={`Tipo: ${trainingPlan.trainingType} | Data: ${new Date(trainingPlan.assignedDate).toLocaleDateString()}`}
                />
            </ListItem>
            <Divider />
        </>
    );
};

export default TrainingPlanItem;
