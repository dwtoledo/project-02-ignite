import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`

  :root {
    --white: #fff;
    --gray-100: #121214;
    --gray-200: #202024;
    --gray-300: #323238;  
    --gray-400: #7C7C8A;
    --gray-500: #8D8D99;
    --gray-600: #C4C4CC;
    --gray-700: #E1E1E6;
    --green: #00875F;
    --green-dark: #015F43;
    --green-light: #00B37E;
    --red: #f03847;
    --red-dark: #940b16;
  }

  body {
    background-color: var(--gray-200);
    color: var(--gray-700);
    -webkit-font-smoothing: antialiased;
  }

  body, input, textarea, button {
    font-family: 'Ubuntu', sans-serif;
    font-weight: 400;
    font-size: 1rem;
  }
`