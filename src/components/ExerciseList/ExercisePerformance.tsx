import React, { useState } from "react";
import { Exercise, PerformanceEntry } from "../../interfaces/trainginPlan";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    IconButton,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { addPerformance, updatePerformance, deletePerformance } from "../../services/firebaseTrainingPlan";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface ExercisePerformanceProps {
    userId: string;
    planId: string;
    workoutId: string;
    exercise: Exercise;
    onClose: () => void;
}

const ExercisePerformance: React.FC<ExercisePerformanceProps> = ({ userId, planId, workoutId, exercise, onClose }) => {
    const [newPerformance, setNewPerformance] = useState<PerformanceEntry>({
        id: Date.now().toString(),
        date: new Date(),
        weight: 0,
        duration: { hours: 0, minutes: 0, seconds: 0 },
        time: { hours: 0, minutes: 0, seconds: 0 },
    });

    const handleAddPerformance = async () => {
        await addPerformance(userId, planId, workoutId, exercise.id, newPerformance);
        setNewPerformance({ ...newPerformance, id: Date.now().toString(), weight: 0 });
    };

    const handleUpdatePerformance = async (updatedPerformance: PerformanceEntry) => {
        await updatePerformance(userId, planId, workoutId, exercise.id, updatedPerformance);
    };

    const handleDeletePerformance = async (performanceId: string) => {
        await deletePerformance(userId, planId, workoutId, exercise.id, performanceId);
    };

    // 🔥 Correggi il problema con le scale di Chart.js
    const performanceData = {
        labels: exercise.performances.map((p) => new Date(p.date).toLocaleDateString()),
        datasets: [
            {
                label: "Peso (kg)",
                data: exercise.performances.map((p) => p.weight),
                borderColor: "blue",
                backgroundColor: "rgba(0, 0, 255, 0.2)",
                fill: true,
                tension: 0.4
            }
        ]
    };

    return (
        <Dialog open onClose={onClose} fullWidth>
            <DialogTitle>Performance di {exercise.exerciseTypeName}</DialogTitle>
            <DialogContent>
                {/* ✅ Grafico corretto */}
                <Line key={exercise.id} data={performanceData} />

                {/* Lista delle performance */}
                <List>
                    {exercise.performances.map((p) => (
                        <ListItem key={p.id}>
                            <ListItemText
                                primary={`Peso: ${p.weight} kg`}
                                secondary={`Data: ${new Date(p.date).toLocaleDateString()}`}
                            />
                            <IconButton onClick={() => handleUpdatePerformance({ ...p, weight: p.weight + 1 })}>
                                <Edit />
                            </IconButton>
                            <IconButton onClick={() => handleDeletePerformance(p.id)}>
                                <Delete />
                            </IconButton>
                        </ListItem>
                    ))}
                </List>

                {/* Aggiunta nuova performance */}
                <TextField
                    label="Peso (kg)"
                    type="number"
                    fullWidth
                    value={newPerformance.weight}
                    onChange={(e) => setNewPerformance({ ...newPerformance, weight: Number(e.target.value) })}
                    sx={{ marginBottom: 2 }}
                />
                <Button variant="contained" color="primary" onClick={handleAddPerformance}>
                    Aggiungi Performance
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Chiudi</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ExercisePerformance;
