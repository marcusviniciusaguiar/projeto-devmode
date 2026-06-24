import styled from "styled-components";
import { theme } from "../styles/theme";
import { useToast } from "../contexts/ToastContext";

const ToastBox = styled.div`
  position: fixed;
  bottom: ${theme.spacing.lg};
  right: ${theme.spacing.lg};
  background: ${theme.colors.primary};
  color: ${theme.colors.text};
  padding: ${theme.spacing.md};
  border-radius: 6px;
  z-index: 1000;
`

function Toast() {

    const { message } = useToast();

    if(!message) return null;

    return (
        <ToastBox>
            {message}
        </ToastBox>
    )
}

export default Toast;