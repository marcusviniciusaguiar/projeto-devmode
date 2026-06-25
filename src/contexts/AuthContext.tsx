import { createContext, useContext, useState, type ReactNode } from "react";
import type { User } from "../types/User";
import { useToast } from "./ToastContext";

interface AuthContextInterface {
    user: User | null;
    login: (email: string, password: string) => boolean;
    updateProfile: (updatedUser: User) => void;
    logout: () => void;
}

const authContext = createContext<AuthContextInterface | null>(null);

function AuthProvider({ children }: {children: ReactNode}) {

    const [user, setUser] = useState<User | null>(JSON.parse(localStorage.getItem("loggedUser") || "null"));
    const { showToast } = useToast();

    const login = (email: string, password: string) => {

        const usersArray = JSON.parse(localStorage.getItem("users") || "[]");

        const usersArrayResponse = usersArray.find((localUser: User) => localUser.email === email && localUser.password === password);

        if(!usersArrayResponse) return false;

        setUser(usersArrayResponse);

        localStorage.setItem("loggedUser", JSON.stringify(usersArrayResponse));

        return true;
    }

    const updateProfile = (updatedUser: User) => {
        
        const users = JSON.parse(localStorage.getItem("users") || "[]");

        const newUsersArray = users.map((user: User) => {
            if(user.id === updatedUser.id) {
                return updatedUser;
            }
            return user;
        })

        localStorage.setItem("users", JSON.stringify(newUsersArray));
        setUser(updatedUser);
        localStorage.setItem("loggedUser", JSON.stringify(updatedUser));
    }

    const logout = () => {
        setUser(null);
        localStorage.removeItem("loggedUser");
        showToast("Logout bem sucedido!")
    }


    return (
        <authContext.Provider value={{user, login, updateProfile, logout}}>
            {children}
        </authContext.Provider>
    )

}

export function useAuth() {
    const context = useContext(authContext);

    if(!context) {
        throw new Error("Erro ao utilizar contexto, utilize dentro do Provider.");
    }

    return context;
}


export default AuthProvider;