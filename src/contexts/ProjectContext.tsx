import { useContext, createContext, useState, type ReactNode } from "react";
import type { Project } from "../types/Project";
import { useAuth } from "./AuthContext";

interface ProjectContextInterface {
    projects: Project[];
    addProject: (title: string, description: string, technologies: string[]) => void;
    deleteProject: (id: string) => void;
}

const projectContext = createContext<ProjectContextInterface | null>(null);

function ProjectProvider({ children }: {children: ReactNode}) {

    const [projects, setProjects] = useState<Project[]>(JSON.parse(localStorage.getItem("projects") || "[]"));
    const { user } = useAuth();

    const addProject = (title: string, description: string, technologies: string[]) => {

        if(!user) return;

        const project: Project = {
            id: Date.now().toString(),
            userId: user.id,
            title: title,
            description: description,
            technologies: technologies,
            imageUrl: "",
            status: "Planejado",
            createdAt: Date.now().toString()
        }

        

        const newProjectsArray = [...projects, project];

        setProjects(newProjectsArray);

        localStorage.setItem("projects", JSON.stringify(newProjectsArray));

    }

    const deleteProject = (id: string) => {

        const newProjectsArray = projects.filter((proj: Project) => proj.id !== id);

        setProjects(newProjectsArray);

        localStorage.setItem("projects", JSON.stringify(newProjectsArray));

    }

    return (
        <projectContext.Provider value={{projects, addProject, deleteProject}}>
            {children}
        </projectContext.Provider>
    )
}

export function useProjects() {
    const context = useContext(projectContext);

    if(!context) {
        throw new Error("Erro ao utilizar contexto, utilize dentro do Provider.");
    }

    return context;
}

export default ProjectProvider;