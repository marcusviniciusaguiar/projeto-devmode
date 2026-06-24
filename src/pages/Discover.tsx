import { Link } from "react-router-dom";
import type { User } from "../types/User";
import { useEffect, useState } from "react";
import type { Project } from "../types/Project";

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

            <input type="text" onChange={handleSearch} value={search} />
            <select value={techFilter} onChange={handleTechFilter}>
                <option value="">Todas as tecnologias</option>
                {techOptions.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                ))}
            </select>

            {paginatedUsers.length === 0 ? (
                <h2>Nenhum portfólio encontrado</h2>
            ) : (
                <>
                    {paginatedUsers.map((user: User) => (
                        <div key={user.id}>
                            <img src={user.photo} alt={user.name} />
                            <h3>{user.name}</h3>
                            <h4>{user.title}</h4>
                            <Link to={`/portfolio/${user.id}`}>Ver Portfólio</Link>
                        </div>
                    ))}
                    {page !== 1 && <button onClick={previousPage}>Página anterior</button>}
                    {page < totalPages && <button onClick={nextPage}>Próxima página</button>}
                </>
            )}
        </>
    )
}

export default Discover;