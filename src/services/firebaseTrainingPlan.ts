import { collection, deleteDoc, doc, Firestore, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { TrainingPlan } from "../interfaces/trainginPlan";
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