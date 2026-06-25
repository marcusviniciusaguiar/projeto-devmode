# DevHub

Plataforma de portfólios para desenvolvedores. Cada usuário pode criar seu perfil, cadastrar projetos, favoritar trabalhos de outros devs, comentar e descobrir novos perfis pela comunidade.

**Deploy:** https://dev-hub-beta-silk.vercel.app

---

## Funcionalidades

- **Autenticação** — cadastro e login com validação de campos (e-mail, senha mínima de 8 caracteres).
- **Perfil** — edição de dados pessoais, biografia, foto, título e links (GitHub e LinkedIn).
- **Projetos** — criação, edição e exclusão (CRUD completo), com modal de confirmação antes de deletar.
- **Portfólio público** — página com os dados do dev e seus projetos, acessível por link.
- **Favoritos** — marque projetos de outros devs e acesse-os numa página dedicada.
- **Comentários** — deixe e remova comentários nos projetos.
- **Comunidade (Discover)** — busca por nome, título ou tecnologia, filtro por stack e paginação.
- **Feedback** — notificações (toasts) em todas as ações.
- **Responsivo** — layout adaptado para desktop, tablet e mobile.

---

## Tecnologias

- **React 19** + **TypeScript**
- **Vite** (build e dev server)
- **React Router** (navegação e rotas protegidas)
- **styled-components** (estilização)
- **localStorage** (persistência de dados no navegador)

---

## Como rodar localmente

Pré-requisitos: [Node.js](https://nodejs.org/) instalado.

```bash
# clonar o repositório
git clone https://github.com/marcusviniciusaguiar/projeto-devmode.git

# entrar na pasta
cd projeto-devmode

# instalar as dependências
npm install

# rodar em modo de desenvolvimento
npm run dev
```

O projeto abre em `http://localhost:5173`.

### Outros comandos

```bash
npm run build     # gera a versão de produção (pasta dist/)
npm run preview   # visualiza a build de produção localmente
```

---

## Estrutura do projeto

```
src/
├── components/    # componentes reutilizáveis (Header, ProjectCard, Modal, Toast...)
├── contexts/      # contextos globais (Auth, Projects, Favorites, Toast)
├── pages/         # páginas da aplicação (Dashboard, Login, Discover...)
├── styles/        # tema e estilos globais
└── types/         # tipos TypeScript (User, Project, Comment)
```

---

Desenvolvido por **Marcus Vinícius**.
