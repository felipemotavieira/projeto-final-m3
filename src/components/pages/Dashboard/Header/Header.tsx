import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  Image,
  Input,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="App">
      {localStorage.getItem("@TOKEN") ? (

        //NÃO MEXER- SUJEITO A QUEBRAR TUDO

        <Box w="100vw">
          <Flex
            backgroundColor="#F0F0F0"
            h={["10vh","9vh",0,0]}
            w={["100vw", "100vw",0,0]}
            justify="center"
            align="center"
            gap={3}
          >
            <Image src="./icone.png" w={["40px","40px",0,0]} h={["55px","60px",0,0]}></Image>
            <Heading fontSize={["30px","30px",0,0]}>Checkin</Heading>
          </Flex>

          <Box  
            gap={[0,0,20]}
            display="flex"
            justifyContent={["center","center","center"]}
            
            background="#21BA71"
            h={["8vh","8vh","10vh", "11vh"]}
            w={["100vw"]}
            alignItems="center">

              <Box  alignItems="center" justifyContent="center" display="flex" gap={10} w={[0,0,"80%"]} minWidth={[0,0,"80%"]} maxWidth={[0,0,"80%"]} h={[0,0,"70px"]}> 
          
                <Box bg="red" display="flex" gap={["5","5",0]} alignItems="center" w={["100%","100%", "0px"]} >
                  <Box display="flex" w="max-content" alignItems="center" justifyContent="center" gap="5">
                    <Image src="/perfilTeste.png" w={["40px","40px",0,0]} h={["40px","40px",0,0]} borderRadius="100px"></Image>
                    <Heading color="#fff" fontSize={["20px","25px",0,0]} >Péricles</Heading>
                    <Image src="./icone+.png" w={["30px","35px",0,0]} h={["30px","35px",0,0]}></Image>
                    <Image src="./iconeaviao.png" w={["30px","35px",0,0]} h={["30px","35px",0,0]}></Image>
                  
                  </Box>

                  
                </Box> 

          

              
                  
                <Box display="flex" alignItems="center" w={[0,0,"max-content"]} gap={3}>
                  <Image src="./iconebranco.png" w={[0,0,"30px","50px"]} h={[0,0,"40px","60px"]}></Image>
                  <Text fontSize={[0,0,"20px","30px"]} color="#fff">Checkin</Text>
                  
                </Box>

                <FormControl display="flex" alignItems="center" justifyContent={"center"} w={[0,0,"400px"]} h={[0,0,"70px"]} border="none" gap={3}>
                  <Input fontSize={[0,0,"10px","15px"]} placeholder="Digite sua pesquisa" border={"none"} bg={["none","none","#fff"]} w={[0,0,"200px","300px"]} display={["visible", "visible", "hidden"]}></Input>
                  <Button w={[0,0,"70px","75px"]} borderRadius="15px" border="none" bg={["none","none","rgba(43, 41, 69, 1)"]} color="#fff" fontSize={[0,0,"13px","15px"]}>Pesquisar</Button>
                </FormControl> 

                
                
                <Box display="flex" w={[0,0,"200px"]} h={[0,0,"70px"]} alignItems="center" gap={[0,0,3,5]}>
                <Image src="./icone+.png" w={[0,0,"40px","40px"]} h={[0,0,"40px","40px"]}></Image>
                <Image src="./iconeaviao.png" w={[0,0,"40px","40px"]} h={[0,0,"40px","40px"]}></Image>
                <Image src="./perfilTeste.png" w={[0,0,"40px","40px"]} borderRadius="100%" h={[0,0,"40px","40px"]}></Image>
                </Box>
              </Box>

          </Box>

          <FormControl p="5px" display="flex" alignItems={"center"} justifyContent="center" gap={5} mt="10px" w={["100vw","100vw",0]}>
            <Input bg="#fff" borderRadius="20px" visibility={["visible", "visible", "hidden"]} h={["40px","50px",0,0]} w={["350px", "400px", 0]} placeholder="Pesquisar destino..."></Input>
            <Image src="./iconelupa.png" w={["30px","40px"]} h={["30px","40px",0,0]}></Image>
          </FormControl> 

          
        </Box>





      ) : (
        <Text>Não logado</Text>
      )}
      
    </div>
  );
};
