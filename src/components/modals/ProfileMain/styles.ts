import styled from "styled-components";

export const ProfileForm = styled.form`
  max-width: 100%;
  width: 100%;
  background-color: #FFFFFF ;
  border-radius: 42px;
  padding: 30px 50px;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap:15px;

  @media(max-width: 700px) {
    form{
      border-radius: 0;
    }
   
    .containerBtn{
        justify-content: center;
        width: 100%;
        max-width: none;
    .btnPerfil{
        max-width: none;
        width: 100%;
    }
    .btnPerfil:last-child{
        margin-top: 0;
    }
    .border{
      width: 95%;
      border-top: solid 2px black;
    }
    }
  }

`;