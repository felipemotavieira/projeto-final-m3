import { Button, Flex, Heading, Image, Img, Text } from "@chakra-ui/react";
import { Login } from "../../modals/Login/Login";
import { Register } from "../../modals/Register/Register";

export const LandingPage = () => {

  return (
    <div className="App">
      
      <Flex h="100%" justifyContent="space-around">

        <Flex direction="column" gap="7" w="300px" h="100%"  justify="center">

          <Flex gap="3" w="300px" align="center" >
            <Image src="./icone.png"></Image>
            <Heading as="h1">Checkin</Heading>
          </Flex>

          <Heading as='h3' size='lg'>Quer viajar?</Heading>
          <Text   w="300px" >Conheça lugares diferentes através de pessoas que já foram</Text>
          <Login />
          <Button boxShadow='2xl' width="250px" h="60px" borderRadius="30px" colorScheme="whatsapp" color="white">Explorar</Button>

          <Text   w="max-content" >Ainda não tem conta? Cadastre-se <Register /></Text>
        </Flex>

        

        <Flex align="center">
          <Img src="./image.png" w="600px" h="500px"></Img>
        </Flex>

      </Flex>
      
    </div>
  );
};
