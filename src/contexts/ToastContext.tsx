import { createContext, useContext, useState, type ReactNode } from "react";
import Toast from "../components/Toast";

interface ToastContextInterface {
    message: string;
    showToast: (message: string) => void;
}

const toastContext = createContext<ToastContextInterface | null>(null);

function ToastProvider({ children }: { children: ReactNode }) {

    const [message, setMessage] = useState("");

    const showToast = (message: string) => {
        setMessage(message);
        setTimeout(() => setMessage(""), 3000);
    }

    return (
        <toastContext.Provider value={{message, showToast}}>
            <Toast />
            {children}
        </toastContext.Provider>
    )
}

export function useToast() {
    const context = useContext(toastContext);

    if(!context) {
        throw new Error("Erro ao utilizar contexto, utilize dentro do Provider.");
    }

    return context;
}


export default ToastProvider;