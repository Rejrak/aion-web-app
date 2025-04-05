import React, { useState } from "react";
import { Exercise } from "../../interfaces/trainginPlan";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";

interface ExerciseEditModalProps {
  exercise: Exercise | null;
  onClose: () => void;
  onSave: (exercise: Exercise) => void;
}

const ExerciseEditModal: React.FC<ExerciseEditModalProps> = ({ exercise, onClose, onSave }) => {
  const [editedExercise, setEditedExercise] = useState<Exercise>(exercise || {
    id: Date.now().toString(),
    exerciseTypeID: "",
    exerciseTypeName: "",
    exerciseMuscleGroup: "",
    series: 3,
    repetitions: 10,
    duration: { hours: 0, minutes: 0, seconds: 0 },
    rest: { hours: 0, minutes: 1, seconds: 0 },
    notes: "",
    performances: [],
  });

  return (
    <Dialog open onClose={onClose}>
      <DialogTitle>{exercise ? "Modifica Esercizio" : "Aggiungi Esercizio"}</DialogTitle>
      <DialogContent>
        <TextField
          label="Nome Esercizio"
          fullWidth
          value={editedExercise.exerciseTypeName}
          onChange={(e) => setEditedExercise({ ...editedExercise, exerciseTypeName: e.target.value })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Serie"
          type="number"
          fullWidth
          value={editedExercise.series}
          onChange={(e) => setEditedExercise({ ...editedExercise, series: Number(e.target.value) })}
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Ripetizioni"
          type="number"
          fullWidth
          value={editedExercise.repetitions}
          onChange={(e) => setEditedExercise({ ...editedExercise, repetitions: Number(e.target.value) })}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Annulla</Button>
        <Button onClick={() => onSave(editedExercise)}>Salva</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ExerciseEditModal;
