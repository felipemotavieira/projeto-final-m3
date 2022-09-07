import styled from "styled-components"; 

export const HeaderTotal = styled.div`
    position: fixed;
    z-index: 1;
`


export const HeaderCinza = styled.div`
    background-color: rgba(240, 240, 240, 1);
    width: 100vw;
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    gap: 5px;

    >img{
        cursor: pointer;
        width: 35px;
        height: 100%;
        @media only screen and (min-width: 768px){
            width: 50px;
            height: 100%;
        }
    }

    >p{
        font-size: 25px;
        font-family: 'Poppins', sans-serif;
        @media only screen and (min-width: 768px){
            font-size: 30px;
        }
    }
`

export const HeaderVerde = styled.div`
    background-color: rgba(33, 186, 113, 1);
    width: 100vw;
    height: 10vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
    @media only screen and (min-width: 768px){
        justify-content: space-evenly;
    }

    >header{
        
        align-items: center;
        justify-content: space-evenly;
        display: flex;
        width: 100%;
        max-width: 892px;
        @media only screen and (min-width: 768px){
            justify-content: space-between;
        }

        >div{
        display: flex;
        align-items: center;
        

        >p{
            font-size: 20px;
            color: #fff;
            @media only screen and (min-width: 768px){
                font-size: 25px;
            }
        }
    }

    div{
        gap: 15px;
        @media only screen and (min-width: 768px){
            gap: 30px;
        }
    }
    }

   
`