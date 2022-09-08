import styled from "styled-components";

export const HeaderTotal = styled.div`
  position: fixed;
  z-index: 1;
`;

export const HeaderCinza = styled.div`
  background-color: rgba(240, 240, 240, 1);
  width: 100vw;
  height: 8vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px ;
  gap: 15px;
  

  .containerLogoPerfil {
    margin: 0 auto;
    max-width: 891px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    animation: slideB .5s forwards;

    div{
        display: flex;
        align-items: center;
        p{
            font-size: 25px;
            font-weight: 800;
            margin-left: 15px;
        }
    }
    figure {
      cursor: pointer;
      width: 50px;
      img {
        width: 100%;
      }
      > p {
        font-size: 35px;
        font-weight: 800;
        @media only screen and (min-width: 768px) {
          font-size: 30px;
        }
      }
    }
  }
`;

export const HeaderVerde = styled.div`

  background-color: rgba(33, 186, 113, 1);
  width: 100vw;
  height: 8vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 40px ;
  @media only screen and (min-width: 768px) {
    justify-content: space-evenly;
  }

  > header {
    align-items: center;
    justify-content: space-evenly;
    display: flex;
    width: 100%;
    max-width: 892px;
    @media only screen and (min-width: 768px) {
      justify-content: space-between;
    }

    > div {
      display: flex;
      align-items: center;
      > p {
        font-size: 20px;
        color: #fff;
        @media only screen and (min-width: 768px) {
          font-size: 25px;
        }
      }
    }
    
    div {
      gap: 15px;
      @media only screen and (min-width: 768px) {
        gap: 30px;
      }
    }
  }
`;
