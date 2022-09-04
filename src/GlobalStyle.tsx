import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body{
    min-height: 100vh;
    
  }
 .App {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  background-color: #F5F5F5;
  flex-direction: column;
}
  
`;

export default GlobalStyle;
