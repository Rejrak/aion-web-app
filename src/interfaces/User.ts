export interface User {
    userId: string;
    password: string;
    admin: boolean;
    name: string;
}

export interface UserContextType {
    user: User | null;
    loginUserContext: (user: User) => void;
    logoutUserContext: () => void;
}
  
export const userToFirestore = (user: User) => ({
    userId: user.userId,
    password: user.password,
    admin: user.admin,
    name: user.name,
});

// Funzione per creare un oggetto User da Firestore
export const userFromFirestore = (data: any): User => ({
    userId: data.userId,
    password: data.password,
    admin: data.admin,
    name: data.name,
});