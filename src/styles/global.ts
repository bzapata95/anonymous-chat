import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    background: #0E0E10 ;
    -webkit-font-smoothing: antialiased;
    color: #E5E5E5;
  }

  body, input, button {
    font: 16px "Poppins", sans-serif;
  }

  input::placeholder {
    color: #47464C
  }

  button {
    cursor: pointer;
  }
`;
