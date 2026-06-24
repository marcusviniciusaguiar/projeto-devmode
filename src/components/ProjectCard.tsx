import styled from "styled-components";
import type { Project } from "../types/Project";
import { Link } from "react-router-dom";
import { theme } from "../styles/theme";
import { useState, type ReactNode } from "react";
import Modal from "./Modal";
import { Button } from "./StyledComponents";
import { useFavorites } from "../contexts/FavoritesContext";
import { useAuth } from "../contexts/AuthContext";

const Card = styled.div<{ $borderColor: string }>`
  background: ${theme.colors.surface};
  border-radius: 8px;
  padding: ${theme.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.sm};
  border-left: 4px solid ${props => props.$borderColor};
`
const Thumb = styled.img`
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 6px;
`
const statusColor = {
  "Concluído": theme.colors.status.completed,
  "Em Progresso": theme.colors.status.inProgress,
  "Planejado": theme.colors.status.planned,
}

const Badge = styled.span<{ $color: string }>`
  align-self: flex-start;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: 4px;
  font-size: 0.85rem;
  background: ${props => props.$color};
  color: ${theme.colors.background};
`

interface ProjectCardProps {
    project: Project;
    onDeleteProject?: (id: string) => void;
    children?: ReactNode;
}

function ProjectCard({ project, onDeleteProject, children }: ProjectCardProps) {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const { favorites, toggleFavorite } = useFavorites();
    const { user } = useAuth();

    const closeModal = () => {
        setModalOpen(false);
    }

    const isFavorite = favorites.includes(project.id);
    
    return (
        <Card $borderColor={statusColor[project.status]}>
            <h2>{project.title}</h2>
            {user ? (
            <button onClick={() => toggleFavorite(project.id)}>{isFavorite ? <span>♥</span> : <span>♡</span>}</button>
            ) : (
            <span>Faça login para favoritar</span>
            )}

            { project.imageUrl && <Thumb src={project.imageUrl} alt={project.title}/>}

            {onDeleteProject ? (
                <>
                    <Link to={`/portfolio/${project.userId}`}>Visualizar projeto no perfil público</Link>
                    <Link to={`/projects/${project.id}/edit`}>Editar</Link>
                    <button onClick={() => setModalOpen(true)}>Excluir</button>

                    <Modal isOpen={modalOpen} onClose={closeModal}>
                        <h3>Tem certeza que quer excluir este projeto?</h3>
                        <p>{project.title} sairá de sua lista de projetos.</p>
                        <p>Essa ação é irreversível.</p>
                        <Button onClick={closeModal}>Cancelar</Button>
                        <Button onClick={() => {onDeleteProject(project.id); closeModal();}}>Deletar permanentemente</Button>
                    </Modal>
                </>
                ) : null
            }


            <p>{project.description.length > 150 ? project.description.slice(0,150) + "..." : project.description}</p>
            
            <Badge $color={statusColor[project.status]}>{project.status}</Badge>
            
            {project.completedDate && 
                <p>Data de conclusão: {project.completedDate}</p>
            }

            <h4>Tecnologias usadas</h4>
            <ul>
                {project.technologies.map(tech => (
                    <li key={tech}>{tech}</li>
                ))}
            </ul>
            {children}
        </Card>
    )
}

export default ProjectCard;