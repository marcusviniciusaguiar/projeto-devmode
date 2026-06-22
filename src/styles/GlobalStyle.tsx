import { createGlobalStyle } from "styled-components";
import { theme } from "./theme";

export const GlobalStyle = createGlobalStyle`
    *, *::before, *::after {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }
    
    body {
        background: ${theme.colors.background};
        color: ${theme.colors.text};
        font-family: sans-serif;
    }
`