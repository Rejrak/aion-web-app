import { auth } from "../config/FirebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";

import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { db } from "../config/FirebaseConfig"; 
import { User, userFromFirestore } from "../interfaces/User";

export const signUpUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const getUsers = async (): Promise<User[]> => {
  try {
    const querySnapshot = await getDocs(collection(db, "exerciseTypes"));
    return querySnapshot.docs.map((doc) => ({ userId: doc.id, ...doc.data() })) as User[];
  }catch (error) {
    throw error;
  }
}

export const getUserById = async (userName: string): Promise<User> => {
  try {
    const userRef = doc(db, "users", userName);
    const docSnapshot = await getDoc(userRef);

    if (!docSnapshot.exists()) {
      throw new Error("User not found");
    }

    const userData = docSnapshot.data();
    if (!userData) {
      throw new Error("Invalid user data");
    }

    // Mappiamo i dati nel nostro modello User
    const user: User = userFromFirestore(userData);

    return user;
  } catch (error) {
    throw error;
  }
};

export const signInUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    throw error;
  }
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};