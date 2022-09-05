import {
    Button,
} from "@chakra-ui/react";

interface IbuttonsModal {
    type: string;
    titlebtn: string;
    functionOnclick?:(dataF:any) => void;
  }

export const ButtonsModal = ({titlebtn, type, functionOnclick}:IbuttonsModal) => {
    let backgroundColor;

    if(type ==='prosseguir'){
        backgroundColor= "#21BA71"
    }else if(type === "cancelar"){
        backgroundColor="#EA4141"
    }else{
        backgroundColor="#180548"
    }
        
    return (

        <Button
            onClick={functionOnclick}
            width="100%"
            borderRadius="25px"
            height="50px"
            backgroundColor={backgroundColor}
            color="white"
            type="submit"
            mt="20px"
        >
            {titlebtn}
        </Button>
   
    )
};


