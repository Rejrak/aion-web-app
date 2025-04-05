import { collection, deleteDoc, doc, Firestore, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { Exercise, TrainingPlan, PerformanceEntry } from "../interfaces/trainginPlan";
import { db } from "../config/FirebaseConfig";

export async function getTrainingPlans(userId: string): Promise<TrainingPlan[]> {
    const trainingPlansRef = collection(db, "users", userId, "trainingPlans");
    const snapshot = await getDocs(trainingPlansRef);

    return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    })) as TrainingPlan[];
}

export async function addTrainingPlan(userId: string, plan: TrainingPlan): Promise<void> {
    const planRef = doc(collection(db, "users", userId, "trainingPlans"), plan.id);
    await setDoc(planRef, plan);
}

export async function deleteTrainingPlan(userId: string, planId: string): Promise<void> {
    const planRef = doc(collection(db, "users", userId, "trainingPlans"), planId);
    await deleteDoc(planRef);
}

export async function updateTrainingPlan(plan: TrainingPlan): Promise<void> {
    try {
        const planRef = doc(collection(db, "users", plan.userId, "trainingPlans"), plan.id);
        await updateDoc(planRef, { ...plan });
    } catch (e) {
        throw new Error(`Failed to update training plan: ${e}`);
    }
}

export async function updateExercise(userId: string, planId: string, workoutId: string, updatedExercise: Exercise) {
    const planRef = doc(db, "users", userId, "trainingPlans", planId);
    const planSnap = await getDoc(planRef);

    if (!planSnap.exists()) throw new Error("Training plan non trovato");

    const plan = planSnap.data() as TrainingPlan;
    const updatedWorkouts = plan.workouts.map((workout) =>
        workout.id === workoutId
            ? {
                  ...workout,
                  exercises: workout.exercises.map((ex) =>
                      ex.id === updatedExercise.id ? updatedExercise : ex
                  ),
              }
            : workout
    );

    await updateDoc(planRef, { workouts: updatedWorkouts });
}

export async function addExercise(userId: string, planId: string, workoutId: string, newExercise: Exercise) {
    const planRef = doc(db, "users", userId, "trainingPlans", planId);
    const planSnap = await getDoc(planRef);

    if (!planSnap.exists()) throw new Error("Training plan non trovato");

    const plan = planSnap.data() as TrainingPlan;
    const updatedWorkouts = plan.workouts.map((workout) =>
        workout.id === workoutId ? { ...workout, exercises: [...workout.exercises, newExercise] } : workout
    );

    await updateDoc(planRef, { workouts: updatedWorkouts });
}

export async function deleteExercise(userId: string, planId: string, workoutId: string, exerciseId: string) {
    const planRef = doc(db, "users", userId, "trainingPlans", planId);
    const planSnap = await getDoc(planRef);

    if (!planSnap.exists()) throw new Error("Training plan non trovato");

    const plan = planSnap.data() as TrainingPlan;
    const updatedWorkouts = plan.workouts.map((workout) =>
        workout.id === workoutId
            ? { ...workout, exercises: workout.exercises.filter((ex) => ex.id !== exerciseId) }
            : workout
    );

    await updateDoc(planRef, { workouts: updatedWorkouts });
}

export async function addPerformance(userId: string, planId: string, workoutId: string, exerciseId: string, newPerformance: PerformanceEntry) {
    const planRef = doc(db, "users", userId, "trainingPlans", planId);
    const planSnap = await getDoc(planRef);

    if (!planSnap.exists()) throw new Error("Training plan non trovato");

    const plan = planSnap.data() as TrainingPlan;
    const updatedWorkouts = plan.workouts.map((workout) =>
        workout.id === workoutId
            ? {
                  ...workout,
                  exercises: workout.exercises.map((ex) =>
                      ex.id === exerciseId
                          ? { ...ex, performances: [...ex.performances, newPerformance] }
                          : ex
                  ),
              }
            : workout
    );

    await updateDoc(planRef, { workouts: updatedWorkouts });
}

export async function updatePerformance(userId: string, planId: string, workoutId: string, exerciseId: string, updatedPerformance: PerformanceEntry) {
    const planRef = doc(db, "users", userId, "trainingPlans", planId);
    const planSnap = await getDoc(planRef);

    if (!planSnap.exists()) throw new Error("Training plan non trovato");

    const plan = planSnap.data() as TrainingPlan;
    const updatedWorkouts = plan.workouts.map((workout) =>
        workout.id === workoutId
            ? {
                  ...workout,
                  exercises: workout.exercises.map((ex) =>
                      ex.id === exerciseId
                          ? {
                                ...ex,
                                performances: ex.performances.map((p) =>
                                    p.id === updatedPerformance.id ? updatedPerformance : p
                                ),
                            }
                          : ex
                  ),
              }
            : workout
    );

    await updateDoc(planRef, { workouts: updatedWorkouts });
}

export async function deletePerformance(userId: string, planId: string, workoutId: string, exerciseId: string, performanceId: string) {
    const planRef = doc(db, "users", userId, "trainingPlans", planId);
    const planSnap = await getDoc(planRef);

    if (!planSnap.exists()) throw new Error("Training plan non trovato");

    const plan = planSnap.data() as TrainingPlan;
    const updatedWorkouts = plan.workouts.map((workout) =>
        workout.id === workoutId
            ? {
                  ...workout,
                  exercises: workout.exercises.map((ex) =>
                      ex.id === exerciseId
                          ? {
                                ...ex,
                                performances: ex.performances.filter((p) => p.id !== performanceId),
                            }
                          : ex
                  ),
              }
            : workout
    );

    await updateDoc(planRef, { workouts: updatedWorkouts });
}