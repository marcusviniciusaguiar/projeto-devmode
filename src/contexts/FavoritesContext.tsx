import { createContext, useContext, useState, type ReactNode } from "react";

interface FavoritesContextInterface  {
    favorites: string[];
    toggleFavorite: (projectId: string) => void;
}

const favoritesContext = createContext<FavoritesContextInterface | null>(null);

function FavoritesProvider({ children }: {children: ReactNode}) {

    const [favorites, setFavorites] = useState<string[]>(JSON.parse(localStorage.getItem("favorites") || "[]"));

    const toggleFavorite = (projectId: string) => {
        const isFavorite = favorites.includes(projectId);

        if(!isFavorite) {
            const newFavorites = [projectId, ...favorites];
            setFavorites(newFavorites);
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
        } else {
            const newFavorites = favorites.filter(fav => fav !== projectId);
            setFavorites(newFavorites);
            localStorage.setItem("favorites", JSON.stringify(newFavorites));
        }

    }

    return (
        <favoritesContext.Provider value={{favorites, toggleFavorite}}>
            {children}
        </favoritesContext.Provider>
    )
}

export function useFavorites() {
    const context = useContext(favoritesContext);

    if(!context) {
        throw new Error("Erro ao utilizar contexto, utilize dentro do Provider.");
    }

    return context;
}

export default FavoritesProvider;