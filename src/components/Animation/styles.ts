import styled, { keyframes } from "styled-components";

interface Ivalue {
  valuex: number;
}

const svganimation = keyframes`
 0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Janela = styled.div<Ivalue>`
  margin: 0 auto 0 auto;
  width: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${svganimation} 1s forwards;
  animation: slideT 2s forwards;

  img {
    width: 100%;
  }
  svg {
    position: relative;
    width: 100%;
    top: 50%;
    height: 1500px;
    transform: translateY(${(props) => -props.valuex * 0.4}px);
    z-index: 2;
  }
  div {
    width: 330px;
    height: 450px;
    display: flex;
    z-index: -1;
    align-items: flex-end;
    overflow: hidden;
    position: absolute;
    border-radius: 25%;
  }

  #path2 {
    transition: 0.5s;
    transform: translateY(
      ${(props) => (props.valuex * 0.15 < 160 ? -props.valuex * 0.15 : 150)}px
    );
  }
  #path3 {
    transition: 0.5s;
    transform: translateY(${(props) => -props.valuex * 0.2}px);
  }
  #path4 {
    transition: 0.5s;
    transform: translateY(${(props) => -props.valuex * 0.25}px);
  }
  #path5 {
    transition: 0.5s;
    transform: translateY(${(props) => -props.valuex * 0.3}px);
  }
  #path6 {
    transition: 0.5s;
    transform: translateY(${(props) => -props.valuex * 0.55}px);
  }

  #path7 {
    transition: 0.5s;
    transform: translateY(${(props) => -props.valuex * 0.4}px);
  }
 
  #path09 {
    transform: translateY(${(props) => -props.valuex * 0.2}px);
    transform: translateX(${(props) => props.valuex * 0.1}px);
  }

  #path10 {
    transform: translateY(${(props) => -props.valuex * 0.2}px);
    transform: translateX(${(props) => props.valuex * 0.6}px);
  }
  #path11 {
    transform: translateY(${(props) => -props.valuex * 0.2}px);
    transform: translateX(${(props) => props.valuex * 0.6}px);
  }

  @media(max-width: 760px) {
    display: none;
  }
`;
