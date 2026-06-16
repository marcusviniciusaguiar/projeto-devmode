import { createContext, useState, type ReactNode } from "react";
import type { User } from "../types/User";

interface AuthContextInterface {
    user: User | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

const authContext = createContext<AuthContextInterface | null>(null);

function AuthProvider({ children }: {children: ReactNode}) {

    const [user, setUser] = useState<User | null>(null);

    const login = (email: string, password: string) => {

        const usersArray = JSON.parse(localStorage.getItem("users") || "[]");

        const usersArrayResponse = usersArray.find((localUser) => localUser.email === email && localUser.password === password);

        if(!usersArrayResponse) return false;

        setUser(usersArrayResponse);

        return true;
    }

    const logout = () => setUser(null);


    return (
        <authContext.Provider value={{user, login, logout}}>
            {children}
        </authContext.Provider>
    )

}

export default AuthProvider;