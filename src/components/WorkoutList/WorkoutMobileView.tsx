import React, { useState } from "react";
import { Workout, Exercise, TrainingPlan } from "../../interfaces/trainginPlan";
import { Card, CardContent, Typography, IconButton, Fab, MenuItem, Select, } from "@mui/material";
import { Edit, Delete, Add, Assessment } from "@mui/icons-material";
import ExerciseEditModal from "../ExerciseList/ExerciseEditModal";
import ConfirmDeleteDialog from "./ConfirmDeleteDialog";
import ExercisePerformance from "../ExerciseList/ExercisePerformance";
import { useUser } from "../../context/userContext";

interface WorkoutMobileViewProps {
    workout: Workout;
    plan: TrainingPlan;
    onUpdateWorkout: (updatedWorkout: Workout) => void;
}

const WorkoutMobileView: React.FC<WorkoutMobileViewProps> = ({ workout, plan, onUpdateWorkout }) => {
    const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [exerciseToDelete, setExerciseToDelete] = useState<Exercise | null>(null);
    const [filterMuscleGroup, setFilterMuscleGroup] = useState<string>("");
    const [selectedExerciseForPerformance, setSelectedExerciseForPerformance] = useState<Exercise | null>(null);
    const { user } = useUser();



    const handleEditExercise = (exercise: Exercise | null) => {
        setSelectedExercise(exercise);
        setIsEditModalOpen(true);
    };

    const handleDeleteExercise = (exercise: Exercise) => {
        setExerciseToDelete(exercise);
        setIsDeleteDialogOpen(true);
    };

    const handleConfirmDelete = () => {
        if (exerciseToDelete) {
            const updatedExercises = workout.exercises.filter((ex) => ex.id !== exerciseToDelete.id);
            onUpdateWorkout({ ...workout, exercises: updatedExercises });
            setIsDeleteDialogOpen(false);
        }
    };

    return (
        <div>
            <Typography variant="h5">{workout.name}</Typography>

            {/* Filtro per gruppo muscolare */}
            <Select value={filterMuscleGroup} onChange={(e) => setFilterMuscleGroup(e.target.value)}>
                <MenuItem value="">Tutti</MenuItem>
                {Array.from(new Set(workout.exercises.map((ex) => ex.exerciseMuscleGroup))).map((group) => (
                    <MenuItem key={group} value={group}>
                        {group}
                    </MenuItem>
                ))}
            </Select>

            {/* Lista degli esercizi */}
            {workout.exercises
                .filter((ex) => (filterMuscleGroup ? ex.exerciseMuscleGroup === filterMuscleGroup : true))
                .map((exercise) => (
                    <Card key={exercise.id} sx={{ marginBottom: 2 }}>
                        <CardContent>
                            <Typography variant="h6">{exercise.exerciseTypeName}</Typography>
                            <Typography variant="body2">{exercise.exerciseMuscleGroup}</Typography>
                            <Typography variant="body2">{exercise.series} serie x {exercise.repetitions} reps</Typography>
                            <Typography variant="body2">Riposo: {exercise.rest.minutes}:{exercise.rest.seconds} min</Typography>

                            <IconButton onClick={() => handleEditExercise(exercise)}>
                                <Edit />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteExercise(exercise)}>
                                <Delete />
                            </IconButton>
                            <IconButton onClick={() => setSelectedExerciseForPerformance(exercise)}>
                                <Assessment />
                            </IconButton>
                        </CardContent>
                    </Card>
                ))}

            {/* Bottone flottante per aggiungere esercizi */}
            <Fab color="primary" sx={{ position: "fixed", bottom: 20, right: 20 }} onClick={() => handleEditExercise(null)}>
                <Add />
            </Fab>

            {/* Modale per editare esercizio */}
            {isEditModalOpen && selectedExercise !== null && (
                <ExerciseEditModal
                    exercise={selectedExercise}
                    onClose={() => setIsEditModalOpen(false)}
                    onSave={(updatedExercise) => {
                        const updatedExercises = workout.exercises.map((ex) =>
                            ex.id === updatedExercise.id ? updatedExercise : ex
                        );
                        onUpdateWorkout({ ...workout, exercises: updatedExercises });
                    }}
                />
            )}

            {selectedExerciseForPerformance && (
                <ExercisePerformance
                    userId={user!.userId}
                    planId={plan.id}
                    workoutId={workout.id}
                    exercise={selectedExerciseForPerformance}
                    onClose={() => setSelectedExerciseForPerformance(null)}
                />
            )}

            {/* Dialog di conferma eliminazione */}
            <ConfirmDeleteDialog
                open={isDeleteDialogOpen}
                onConfirm={handleConfirmDelete}
                onCancel={() => setIsDeleteDialogOpen(false)}
            />
        </div>
    );
};

export default WorkoutMobileView;
