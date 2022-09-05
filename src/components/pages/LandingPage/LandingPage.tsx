import { Button, Flex, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Login } from "../../modals/Login/Login";
import { Register } from "../../modals/Register/Register";
import AnimationWindows from "../../Animation/AnimationWindows";
import Logo from "../../Logo/Logo"
import AnimationMobile from "../../AnimationMobile/AnimationMobile";
import { useState } from "react";

export const LandingPage = () => {
  const navigate = useNavigate();


  const handleToDashboard = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    
      <Flex
        minHeight="inherit"
        w={["100%", "100%", "80%", "80%"]}
        justify={["center", "center", "space-around"]}
        maxW="1300px"
        alignItems={"center"}
      >
        <Flex
          direction="column"
          gap="7"
          w={["500px", "800px", "600px"]}
          h="100%"
          justify="center"
        >
          <Flex gap="3" align="center" justify={["center", "center", "start"]}>
            <Logo/>
            <Heading as="h1" fontSize={["50px"]}>
              Checkin
            </Heading>
          </Flex>

          <AnimationMobile/>
          

          <Flex justify={["center", "center", "start"]}>
            <Heading as="h3" size="lg">
              Quer viajar?
            </Heading>
          </Flex>
          <Flex justify={["center", "center", "start"]}>
            <Text
              textAlign={["center", "center", "start"]}
              w={["250px", "300px"]}
              justifyContent={"center"}
              fontSize={["2xl", "lg"]}
            >
              Conheça lugares diferentes através de pessoas que já foram
            </Text>
          </Flex>
          <Flex justify={["center", "center", "start"]}>
            <Login bg={undefined} borderRadius="btn_land"/>
          </Flex>
          <Flex justify={["center", "center", "start"]}>
            <Button
              onClick={handleToDashboard}
              boxShadow="2xl"
              width="250px"
              h="60px"
              borderRadius="30px"
              color="white"
              backgroundColor="#21BA71"
              _hover={{ backgroundColor: "#3fc4a1" }}
              _active={{ backgroundColor: "#21BA71" }}
            >
              Explorar
            </Button>
          </Flex>

          <Flex justify={["center", "center", "start"]}>
            <Text textAlign={["center", "start"]} w="max-content">
              <Register />
            </Text>
          </Flex>
        </Flex>
        
          <Flex align="center">
            <AnimationWindows />
          </Flex>
        
       
      </Flex>
    
  );
};
