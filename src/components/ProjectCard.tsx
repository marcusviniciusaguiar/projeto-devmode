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

const Title = styled.h3`
  margin: 0;
`

const FavButton = styled.button`
  align-self: flex-end;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: ${theme.colors.primary};
`

const Description = styled.p`
  color: ${theme.colors.text};
  font-size: 0.95rem;
`

const Actions = styled.div`
  display: flex;
  gap: ${theme.spacing.sm};
  flex-wrap: wrap;
`

const ActionButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.text};
  border: none;
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: 6px;
  cursor: pointer;
  text-decoration: none;
  font-size: 0.85rem;
  &:hover { filter: brightness(1.2); }
`

const TechUl = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: ${theme.spacing.xs};
`

const TechLi = styled.li`
  background: ${theme.colors.background};
  padding: ${theme.spacing.xs} ${theme.spacing.sm};
  border-radius: 4px;
  font-size: 0.8rem;
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

        <Title>{project.title}</Title>

        {user ? (
          <FavButton onClick={() => toggleFavorite(project.id)}>{isFavorite ? <span>♥</span> : <span>♡</span>}</FavButton>
        ) : (
          <span>Faça login para favoritar</span>
        )}

        {project.imageUrl && <Thumb src={project.imageUrl} alt={project.title}/>}

        {onDeleteProject ? (
          <>
            <Actions>
              <ActionButton as={Link} to={`/portfolio/${project.userId}`}>Ver projeto</ActionButton>
              <ActionButton as={Link} to={`/projects/${project.id}/edit`}>Editar</ActionButton>
              <ActionButton as="button" onClick={() => setModalOpen(true)}>Excluir</ActionButton>
            </Actions>


            <Modal isOpen={modalOpen} onClose={closeModal}>
              <h3>Tem certeza que quer excluir este projeto?</h3>
              <p>{project.title} sairá de sua lista de projetos.</p>
              <p>Essa ação é irreversível.</p>

              <Button onClick={closeModal}>Cancelar</Button>
              <Button onClick={() => {onDeleteProject(project.id); closeModal();}}>Deletar permanentemente</Button>
            </Modal>
          </>
        ) : null}

        <Description>{project.description.length > 150 ? project.description.slice(0,150) + "..." : project.description}</Description>
        
        <Badge $color={statusColor[project.status]}>{project.status}</Badge>
        
        {project.completedDate && 
          <p>Data de conclusão: {project.completedDate}</p>
        }
        
        <TechUl>
          {project.technologies.map(tech => (
            <TechLi key={tech}>{tech}</TechLi>
          ))}
        </TechUl>

        {children}
        
      </Card>
    )
}

export default ProjectCard;