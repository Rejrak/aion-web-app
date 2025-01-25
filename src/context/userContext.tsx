import { createContext, useState, ReactNode, useContext } from 'react';
import { User, UserContextType } from '../interfaces/User';

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({children}: {children: ReactNode} ) => {
    const [user, setUser] = useState<User | null>(null);

    const loginUserContext = (user: User) => {
        setUser(user);
    };

    const logoutUserContext = () => {
        setUser(null);
    };

    return (
        <UserContext.Provider value={{user, loginUserContext, logoutUserContext}}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = () => {
    const context = useContext(UserContext);
    if(!context){
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}