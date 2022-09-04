import styled, { keyframes } from "styled-components";

interface Ivalue {
  valueScroll: number;
}

const svganimation = keyframes`
 0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const JanelaMobile = styled.div<Ivalue>`
  max-width: 460px;
  width: 100%;
  display: none;
  height: 460px;
  margin: 0px 0;
  align-items: center;
  animation: ${svganimation} 1s forwards;
  transform: translateX(${(props) => -props.valueScroll * 0.4}px);


  @media(max-width: 760px) {
    display: flex;
    margin: 0 auto
  }

  svg{
    width: inherit;
    height: 1500px;
    path{
      width: 300px;
    }
    mask{
      mask-type:alpha;
    }
   

  }
`;
