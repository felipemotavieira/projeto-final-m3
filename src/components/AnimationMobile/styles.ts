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

export const JanelaMobile = styled.clipPath<Ivalue>`
  width: 85%;
  margin: 0 auto;
  display: none;
  align-items: center;
  animation: ${svganimation} 1s forwards;
  justify-content: center;
  height: 400px;
  
  @media(max-width: 765px) {
    display: flex;
    align-items: center;
  }

  #cenary{
    width: 100%;
    min-width: 320px;
    max-width: 400px;
    clip-path:circle();
    overflow: hidden;
    #path10{
    animation: ${svganimation} 1.0s forwards;
  }
  #path1{
    transform: translatey(
      ${(props) => (props.valueScroll*0.6)}px
    );
    animation: ${svganimation} 1.1s forwards;
  }
  #path2{
    transform: translatey(
      ${(props) => (props.valueScroll*0.55)}px
    );
    animation: ${svganimation} 1.2s forwards;
  }
  #path3{
    transform: translatey(
      ${(props) => (props.valueScroll*0.50)}px
    );
    animation: ${svganimation} 1s forwards;
  }
  #path4{
    transform: translatey(
      ${(props) => (props.valueScroll*0.45)}px
    );
    animation: ${svganimation} 1.4s forwards;
  }
  #path5{
    transform: translatey(
      ${(props) => (props.valueScroll*0.40)}px
    );
    animation: ${svganimation} 1.5s forwards;
  }
  #path6{
    transform: translatey(
      ${(props) => (props.valueScroll*0.35)}px
    );
    animation: ${svganimation} 1.6s forwards;
  }
  #path7{
    transform: translatey(
      ${(props) => (props.valueScroll*0.30)}px
    );
    
    animation: ${svganimation} 1s forwards;
  }
  #path8{
    transform: translatex(
      ${(props) => (props.valueScroll)}px
    );
    animation: ${svganimation} 2.5s forwards; 
  }

  #path9{
    transform: translatex(
      ${(props) => (props.valueScroll)}px
    );
    animation: ${svganimation} 2.5s forwards; 
  }

  #path10{
    transform: translatex(
      ${(props) => (props.valueScroll)}px
    );
    animation: ${svganimation} 2.5s forwards; 
  }
    
  }

  .mask{
    width: 0;
    height: 0;
  }

  
`;
