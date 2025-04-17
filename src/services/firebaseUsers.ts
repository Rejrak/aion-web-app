import { collection, deleteDoc, doc, Firestore, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { User } from "../interfaces/User";
import { db } from "../config/FirebaseConfig";

export async function getUsers(): Promise<User[]> {
    const userRef = collection(db, "users");
    const snapshot = await getDocs(userRef);
    return snapshot.docs.map((doc) => ({
        userId: doc.id,
        ...doc.data(),
    })) as User[];
}