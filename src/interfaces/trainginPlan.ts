export enum TrainingType {
    Forza = 'Forza',
    Ipertrofia = 'Ipertrofia',
    ResistenzaMuscolare = 'ResistenzaMuscolare',
    Funzionale = 'Funzionale',
    PerditaPeso = 'PerditaPeso',
    Riabilitazione = 'Riabilitazione',
    SportSpecifico = 'SportSpecifico',
    Principianti = 'Principianti',
    Avanzato = 'Avanzato',
    Cardio = 'Cardio',
    Misto = 'Misto'
}

export interface TrainingPlan {
    id: string;
    userId: string;
    name: string;
    assignedDate: Date;
    trainingType: TrainingType;
    workouts: Workout[];
}

export interface Workout {
    id: string;
    trainingPlanId: string;
    name: string;
    exercises: Exercise[];
}

export enum MeasureType {
    Repetitions = 'Repetitions',
    Minutes = 'Minutes'
}

export interface Exercise {
    id: string;
    exerciseTypeID: string;
    exerciseTypeName: string;
    exerciseMuscleGroup: string;
    series: number;
    repetitions: number;
    duration: Time;
    rest: Time;
    notes?: string;
    performances: PerformanceEntry[];
}

export interface PerformanceEntry {
    id: string;
    date: Date;
    weight: number;
    duration: Time;
    time: Time;
}

export interface Time {
    hours: number;
    minutes: number;
    seconds: number;
}

export const mapTrainingPlanFromFirebase = (data: any): TrainingPlan => ({
    id: data.id,
    userId: data.userId,
    name: data.name,
    assignedDate: new Date(data.assignedDate.toDate()),
    trainingType: data.trainingType as TrainingType,
    workouts: data.workouts.map((w: any) => ({
        id: w.id,
        trainingPlanId: w.trainingPlanId,
        name: w.name,
        exercises: w.exercises.map((e: any) => ({
            id: e.id,
            exerciseTypeID: e.exerciseTypeID,
            exerciseTypeName: e.exerciseTypeName,
            exerciseMuscleGroup: e.exerciseMuscleGroup,
            series: e.series,
            repetitions: e.repetitions,
            duration: e.duration as Time,
            rest: e.rest as Time,
            notes: e.notes,
            performances: e.performances.map((p: any) => ({
                id: p.id,
                date: new Date(p.date.toDate()),
                weight: p.weight,
                duration: p.duration as Time,
                time: p.time as Time
            }))
        }))
    }))
});
