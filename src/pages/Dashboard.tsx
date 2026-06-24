import { useAuth } from "../contexts/AuthContext";
import { useProjects } from "../contexts/ProjectContext";
import type { Project } from "../types/Project";
import ProjectForm from "../components/ProjectForm";
import ProjectCard from "../components/ProjectCard";
import styled from "styled-components";
import { theme } from "../styles/theme";
import { useEffect } from "react";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};
`

function Dashboard() {

    useEffect(() => {
        document.title = "DevHub • Dashboard";
    }, []);
      
    const { addProject, projects, deleteProject } = useProjects();
    const { user } = useAuth();
    const userProjects = projects.filter((proj) => proj.userId == user?.id)

    return (
        <>
            <h1>Dashboard</h1>
            <h3>Novo projeto</h3>
            <ProjectForm onSubmit={addProject}/>
            <h1>Meus projetos</h1>
            
            <Grid>
                {userProjects.length === 0 ?
                    <p>Você não tem projetos ainda. Crie seu primeiro!</p> 
                :
                    userProjects.map((proj: Project) => {
                        return (
                            <ProjectCard key={proj.id} project={proj} onDeleteProject={deleteProject}/>
                        )
                    })
                }
            </Grid>
                

        </>
    )
}

export default Dashboard;