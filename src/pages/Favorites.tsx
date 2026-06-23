import styled from "styled-components";
import { useFavorites } from "../contexts/FavoritesContext";
import { useProjects } from "../contexts/ProjectContext";
import { theme } from "../styles/theme";
import ProjectCard from "../components/ProjectCard";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};
`

function Favorites() {
    
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