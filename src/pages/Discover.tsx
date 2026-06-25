import { Link } from "react-router-dom";
import type { User } from "../types/User";
import { useEffect, useState } from "react";
import type { Project } from "../types/Project";
import styled from "styled-components";
import { theme } from "../styles/theme";

const SearchBar = styled.div`
  display: flex;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.lg};
  flex-wrap: wrap;
`

const SearchInput = styled.input`
  flex: 1;
  min-width: 200px;
  padding: ${theme.spacing.sm};
  border: none;
  border-radius: 6px;
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-size: 1rem;
`

const FilterSelect = styled.select`
  padding: ${theme.spacing.sm};
  border: none;
  border-radius: 6px;
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-size: 1rem;
`

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};
`

const DevCard = styled.div`
  background: ${theme.colors.surface};
  border-radius: 8px;
  padding: ${theme.spacing.lg};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: ${theme.spacing.sm};
`

const DevAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`

const ViewButton = styled(Link)`
  background: ${theme.colors.primary};
  color: ${theme.colors.text};
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 6px;
  text-decoration: none;
  &:hover { filter: brightness(1.2); }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: ${theme.spacing.md};
  margin-top: ${theme.spacing.lg};
`

const PageButton = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.text};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 6px;
  cursor: pointer;
  &:hover { filter: brightness(1.2); }
`

function Discover() {

    useEffect(() => {
        document.title = "DevHub • Comunidade";
    }, []);

    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const projects = JSON.parse(localStorage.getItem("projects") || "[]");
    const techOptions = ["React", "TypeScript", "JavaScript", "Node", "PHP", "Python"];

    const [search, setSearch] = useState("");
    const [techFilter, setTechFilter] = useState("");
    const [page, setPage] = useState(1);

    const perPage = 10;
    const start = (page - 1) * perPage;

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
        setPage(1);
    }

    const handleTechFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setTechFilter(event.target.value);
        setPage(1);
    }

    const nextPage = () => {
        setPage(page + 1);
    }

    const previousPage = () => {
        setPage(page - 1);
    }

    const filteredUsers = users.filter((user: User) => {
        const textInput = search.toLowerCase();

        const nameMatch = user.name.toLowerCase().includes(textInput);
        const titleMatch = (user.title || "").toLowerCase().includes(textInput);

        const userProjects = projects.filter((proj: Project) => proj.userId === user.id);
        const techMatch = userProjects.some((proj: Project) => (
            proj.technologies.some(tech => tech.toLowerCase().includes(textInput))
        ));

        const techFilterMatch = techFilter === "" || userProjects.some((proj: Project) => (
            proj.technologies.some(tech => tech.toLowerCase() === techFilter.toLowerCase())
        )); 

        return (nameMatch || titleMatch || techMatch) && techFilterMatch;
    });

    const paginatedUsers = filteredUsers.slice(start, start + perPage);
    const totalPages = Math.ceil(filteredUsers.length / perPage);


    return (
        <>
            <h1>Comunidade</h1>
            
            <SearchBar>
                <SearchInput type="text" onChange={handleSearch} value={search} />
                <FilterSelect value={techFilter} onChange={handleTechFilter}>
                    <option value="">Todas as tecnologias</option>
                    {techOptions.map(tech => (
                        <option key={tech} value={tech}>{tech}</option>
                    ))}
                </FilterSelect>
            </SearchBar>
            
            {paginatedUsers.length === 0 ? (
                <h2>Nenhum portfólio encontrado</h2>
            ) : (
                <>
                    <ResultsGrid>
                        {paginatedUsers.map((user: User) => (
                            <DevCard key={user.id}>
                                {user.photo && <DevAvatar src={user.photo} alt={user.name}/>}
                                <h3>{user.name}</h3>
                                <h4>{user.title}</h4>
                                <ViewButton to={`/portfolio/${user.id}`}>Ver Portfólio</ViewButton>
                            </DevCard>
                        ))}
                    </ResultsGrid>
                    <Pagination>
                        {page !== 1 && <PageButton onClick={previousPage}>Página anterior</PageButton>}
                        {page < totalPages && <PageButton onClick={nextPage}>Próxima página</PageButton>}
                    </Pagination>
                </>
            )}
        </>
    )
}

export default Discover;