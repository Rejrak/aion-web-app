import { addDoc, collection, deleteDoc, doc, getDocs, setDoc } from "firebase/firestore";
import { ExerciseType } from "../interfaces/exerciseType";
import { db } from "../config/FirebaseConfig";


export const getExerciseTypes = async ():Promise<ExerciseType[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "exerciseTypes"));
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as ExerciseType[];
  } catch (error) {
    throw error;
  }
};

export const updateExerciseType = async (exerciseType: ExerciseType) => {
  try {
    await setDoc(doc(db, "exerciseTypes", exerciseType.id), exerciseType);
  } catch (error) {
    throw error;
  }
};

export const addExerciseType = async (exerciseType: ExerciseType) => {
  try {
    await addDoc(collection(db, "exerciseTypes"), exerciseType);
  } catch (error) {
    throw error;
  }
};

export const deleteExerciseType = async (id: string) => {
  try {
    await deleteDoc(doc(db, "exerciseTypes", id));
  } catch (error) {
    throw error;
  }
};