import styled from "styled-components";
import { theme } from "../styles/theme";

const PageFooter = styled.footer`
        background: ${theme.colors.surface};
        padding: ${theme.spacing.md};
        text-align: center;
        margin-top: ${theme.spacing.xl};
    `

function Footer() {
    return (
        <PageFooter>
            <p>Todos os direitos reservados © 2026 DevHub</p>
        </PageFooter>
    )
}

export default Footer;