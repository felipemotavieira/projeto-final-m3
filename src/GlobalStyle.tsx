import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,500;0,700;1,400;1,500;1,700&family=Noto+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,500;1,600;1,700;1,800;1,900&display=swap');
  
 *{
  font-family: 'DM Sans', sans-serif;;
 }

.App {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #F5F5F5;
  flex-direction: column;
  overflow: hidden;
}

.loader {
  width: 48px;
  height: 48px;
  display: block;
  margin: 20px auto;
  box-sizing: border-box;
  position: relative;
  position: fixed;
  top: 42%;
}
.loader::after {
  content: '';  
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  left: 0;
  bottom: 0;
  position: absolute;
  border-radius: 50% 50% 0;
  border: 15px solid #21BA71;
  transform: rotate(45deg) translate(0, 0);
  box-sizing: border-box;
  animation: animMarker 0.4s ease-in-out infinite alternate;  
}
.loader::before {
  content: '';  
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  top: 150%;
  width: 24px;
  height: 4px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.2);
  animation: animShadow 0.4s ease-in-out infinite alternate;
  
}

@keyframes animMarker {
  0% {
    transform: rotate(45deg) translate(5px, 5px);
  }
  100% {
    transform: rotate(45deg) translate(-5px, -5px);
  }
}

@keyframes animShadow {
  0% {
    transform: scale(0.5);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes slideB {

  0% {
    -webkit-transform: translateY(-110px);
            transform: translateY(-110px);
            opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
            opacity: 1;
  }
}


@keyframes slideB {

0% {
  -webkit-transform: translateY(-110px);
          transform: translateY(-110px);
          opacity: 0;
}
100% {
  -webkit-transform: translateY(0);
          transform: translateY(0);
          opacity: 1;
}
}

@keyframes slideT {

0% {
  -webkit-transform: translateY(110px);
          transform: translateY(110px);
          opacity: 0;
}
100% {
  -webkit-transform: translateY(0px);
          transform: translateY(0px);
          opacity: 1;
}
}

@keyframes Font {

0% {
          opacity: 0;
}
100% {
          opacity: 1;
}
}

  
`;

export default GlobalStyle;
