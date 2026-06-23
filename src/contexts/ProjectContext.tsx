import { useContext, createContext, useState, type ReactNode } from "react";
import type { Project } from "../types/Project";
import { useAuth } from "./AuthContext";
import type { ProjectFormData } from "../components/ProjectForm";

interface ProjectContextInterface {
    projects: Project[];
    addProject: (data: ProjectFormData) => void;
    deleteProject: (id: string) => void;
    updateProject: (project: Project) => void;
}

const projectContext = createContext<ProjectContextInterface | null>(null);

function ProjectProvider({ children }: {children: ReactNode}) {

    const [projects, setProjects] = useState<Project[]>(JSON.parse(localStorage.getItem("projects") || "[]"));
    const { user } = useAuth();

    const addProject = (data: ProjectFormData) => {

        if(!user) return;

        const project: Project = {
            ...data,
            id: Date.now().toString(),
            userId: user.id,
            createdAt: Date.now().toString()
        }

        

        const newProjectsArray = [project, ...projects];

        setProjects(newProjectsArray);

        localStorage.setItem("projects", JSON.stringify(newProjectsArray));
    }

    const updateProject = (project: Project) => {

        const newProjectsArray = projects.map((proj: Project) => {
            if(proj.id === project.id) {
                return project;
            }
            return proj;
        })

        setProjects(newProjectsArray);

        localStorage.setItem("projects", JSON.stringify(newProjectsArray));
    }

    const deleteProject = (id: string) => {

        const newProjectsArray = projects.filter((proj: Project) => proj.id !== id);

        setProjects(newProjectsArray);

        localStorage.setItem("projects", JSON.stringify(newProjectsArray));
    }

    return (
        <projectContext.Provider value={{projects, addProject, updateProject, deleteProject}}>
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