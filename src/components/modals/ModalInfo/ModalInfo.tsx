import {
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import logo from "../../../assets/Icon_info.svg"

function modalInfo(){  
 const message = "Adicione um post para se conectar com mais pessoas  e ajudá-los a encontrar o melhor destino.";
  return (
    <Box maxWidth="892px" height={"85px"} m={"25px"} padding="25px">
      <Flex justify="center" flexDirection="column" alignItems={"center"}>
        <img width={"50px"} alt="icone" src={logo}/>
        <Text fontSize={"16px"} mt= "25px" textAlign={"center"} >
          {message}
        </Text>
      </Flex>
    </Box>
  );
}

export default modalInfo;
