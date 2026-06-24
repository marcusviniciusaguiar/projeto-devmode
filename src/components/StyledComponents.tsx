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
