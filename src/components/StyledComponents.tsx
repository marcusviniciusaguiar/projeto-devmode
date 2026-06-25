import styled from "styled-components"
import { theme } from "../styles/theme"

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
  max-width: 400px;
  margin: 0 auto;
`

export const Field = styled.label`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.xs};
`

export const Input = styled.input`
  padding: ${theme.spacing.sm};
  border: none;
  border-radius: 6px;
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-size: 1rem;
`

export const Button = styled.button`
  background: ${theme.colors.primary};
  color: ${theme.colors.text};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.md};
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  transition: filter 0.2s;
  &:hover { filter: brightness(1.2); }
`

export const Select = styled.select`
  padding: ${theme.spacing.sm};
  border: none;
  border-radius: 6px;
  background: ${theme.colors.surface};
  color: ${theme.colors.text};
  font-size: 1rem;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);  /* até 768px: 2 colunas (tablet) */
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;             /* até 480px: 1 coluna (mobile) */
  }
`
