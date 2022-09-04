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
            <Image src="./icone.png" w={["40px","40px",0,0]} h={["50px","50px",0,0]}></Image>
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
                    <Image p="5px" src="/perfilTeste.png" w={["40px","40px",0,0]} h={["40px","40px",0,0]} borderRadius="100px"></Image>
                    <Heading color="#fff" fontSize={["20px","25px",0,0]} >Péricles</Heading>
                    <Image src="./icone+.png" w={["30px","35px",0,0]} h={["30px","35px",0,0]}></Image>
                    <Image src="./iconeaviao.png" w={["30px","35px",0,0]} h={["30px","35px",0,0]}></Image>
                  
                  </Box>

                  
                </Box> 

          

              
                  
                <Box display="flex" alignItems="center" w={[0,0,"max-content"]} gap={3}>
                  <Image src="./iconebranco.png" w={[0,0,"30px","40px"]} h={[0,0,"40px","50px"]}></Image>
                  <Text fontSize={[0,0,"20px","30px"]} color="#fff">Checkin</Text>
                  
                </Box>

                <Box display="flex" alignItems="center" justifyContent={"center"} w={[0,0,"400px"]} h={[0,0,"70px"]} border="none" gap={3}>
                  <Button justifyContent={"space-between"} w="200px" bg="#fff" color="#666666" gap={5} fontSize={[0,0,"15px"]} display={["none", "none", "flex"]}>Pesquisar <Image src="./iconelupa.png" border="none" w={[0,0,"30px","30px"]} h={[0,0,"30px","30px"]}></Image></Button>
                </ Box> 

                
                
                <Box display="flex" w={[0,0,"200px"]} h={[0,0,"70px"]} alignItems="center" gap={[0,0,3,5]}>
                <Image src="./icone+.png" w={[0,0,"40px","40px"]} h={[0,0,"40px","40px"]}></Image>
                <Image src="./iconeaviao.png" w={[0,0,"40px","40px"]} h={[0,0,"40px","40px"]}></Image>
                <Image src="./perfilTeste.png" w={[0,0,"40px","40px"]} borderRadius="100%" h={[0,0,"40px","40px"]}></Image>
                </Box>
              </Box>

          </Box>

          <Box p="5px" display={["flex","flex","none","none"]} alignItems={"center"} justifyContent="center" gap={5} mt="10px" w={["100vw","100vw",0]}>
            <Button gap={5} bg="#fff" fontSize="15px">Pesquisar<Image src="./iconelupa.png" w={["30px","30px"]} h={["28px","30px",0,0]}></Image></Button>
          </Box> 

          
        </Box>





      ) : (

        <Box w="100vw">
          <Flex
            backgroundColor="#F0F0F0"
            h={["10vh","9vh",0,0]}
            w={["100vw", "100vw",0,0]}
            justify="center"
            align="center"
            gap={3}
          >
            <Image src="./icone.png" w={["40px","40px",0,0]} h={["50px","50px",0,0]}></Image>
            <Heading fontSize={["30px","30px",0,0]}>Checkin</Heading>
          </Flex>

          <Box  
            gap={[0,0,20]}
            display="flex"
            justifyContent={"center"}
            
            background="#21BA71"
            h={["8vh","8vh","10vh", "11vh"]}
            w={["100vw"]}
            maxW="100vw"
            alignItems="center">

              <Box alignItems="center" justifyContent="center" display={["flex"]} gap={10} w={[0,0,"80%"]} minWidth={[0,0,"80%"]} maxWidth={[0,0,"80%"]} h={[0,0,"70px"]}> 
          
                <Box   display={["flex","flex","none"]} justifyContent="center" gap={["5","5",0]} alignItems="center" minW="100vw" >
                  <Box ml={["25%","10%"]} display={["flex","flex","none"]}  alignItems="center"  gap="5">
                    <Button color="#fff" bg="rgba(43, 41, 69, 1)" border="none" w="max-content" h={["30px","35px"]} fontSize={["13px","15px"]} borderRadius="15px">Pesquisar</Button>
                    <Button color="#fff" w="max-content" h={["30px","35px"]} fontSize={["13px","15px"]} bg="rgba(43, 41, 69, 1)" borderRadius="15px">Entrar</Button>
                    <Button color="#fff" w="max-content" h={["30px","35px"]} fontSize={["13px","15px"]} bg="rgba(43, 41, 69, 1)" borderRadius="15px">Cadastrar</Button>
                  
                  </Box>

                  
                </Box> 

          
                <Box display="flex" alignItems="center" w={[0,0,"max-content"]} gap={3}>
                  <Image src="./iconebranco.png" w={[0,0,"30px","40px"]} h={[0,0,"40px","50px"]}></Image>
                  <Text fontSize={[0,0,"20px","30px"]} color="#fff">Checkin</Text>
                  
                </Box>

                <Box display="flex" alignItems="center" justifyContent={"center"} w={[0,0,"400px"]} h={[0,0,"70px"]} border="none" gap={3}>
                  <Button justifyContent={"space-between"} w="200px" bg="#fff" color="#666666" gap={5} fontSize={[0,0,"15px"]} display={["none", "none", "flex"]}>Pesquisar <Image src="./iconelupa.png" border="none" w={[0,0,"30px","30px"]} h={[0,0,"30px","30px"]}></Image></Button>
                </ Box> 

                
                
                <Box display={["none", "none", "flex"]} w={[0,0,"200px"]} h={[0,0,"70px"]} alignItems="center" gap={[0,0,3,5]}>
                <Button color="#fff " bg="rgba(43, 41, 69, 1)" w={[0,0,"100px","100px"]} h={[0,0,"40px","40px"]}>Entrar</Button>
                <Button color="#fff " bg="rgba(43, 41, 69, 1)" w={[0,0,"100px","100px"]} h={[0,0,"40px","40px"]}>Cadastrar</Button>
                
                </Box>
              </Box>

          </Box>

          <Box p="5px" display={["flex","flex","none","none"]} alignItems={"center"} justifyContent="center" gap={5} mt="10px" w={["100vw","100vw",0]}>
            <Button gap={5} bg="#fff" fontSize="15px">Pesquisar<Image src="./iconelupa.png" w={["30px","30px"]} h={["28px","30px",0,0]}></Image></Button>
          </Box> 

          
        </Box>
        
      )}
      
    </div>
  );
};
