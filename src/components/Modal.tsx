import styled from "styled-components";
import { theme } from "../styles/theme";
import type { ReactNode } from "react";

const Overlay = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`

const Box = styled.div`
  background: ${theme.colors.surface};
  padding: ${theme.spacing.lg};
  border-radius: 8px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.md};
`

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

function Modal({isOpen, onClose, children }: ModalProps) {
    if (!isOpen) return null;

    return (
        <Overlay onClick={onClose}>
            <Box onClick={e => e.stopPropagation()}>
                {children}
            </Box>
        </Overlay>
  
        )
}

export default Modal;