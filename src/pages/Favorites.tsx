import { useFavorites } from "../contexts/FavoritesContext";
import { useProjects } from "../contexts/ProjectContext";
import ProjectCard from "../components/ProjectCard";
import { useEffect } from "react";
import { Grid } from "../components/StyledComponents";

function Favorites() {
    
    useEffect(() => {
        document.title = "DevHub • Favoritos";
    }, []);
    
    const { favorites } = useFavorites();
    const { projects } = useProjects();

    const userFavorites = projects.filter(proj => favorites.includes(proj.id));

    return (
        <>
            <h1>Favoritos</h1>
            <Grid>
                { userFavorites.length === 0 ? (
                    <p>Você ainda não tem favoritos.</p>
                ) : (
                    userFavorites.map(favorite => {
                        return <ProjectCard key={favorite.id} project={favorite} />
                    })
                )}
            </Grid>
            
        </>
    )
}

export default Favorites;