import { Button, Flex, Heading, Image, Img, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Login } from "../../modals/Login/Login";
import { Register } from "../../modals/Register/Register";

export const LandingPage = () => {
  const navigate = useNavigate();

  const handleToDashboard = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <div className="App">

      <Flex
        h="100%"
        w={["100%", "80%", "80%", "80%"]}
        justify={["center", "space-around"]}
      >
        <Flex direction="column" gap="7" w="500px" h="100%" justify="center">
          <Flex gap="3" align="center" justify={["center", "start"]}>
            <Image
              src="./icone.png"
              w={["60px", "80px", "80px", "80px"]}
              h={["80px", "90px", "110px", "110px"]}
              mt={["10px", 0]}
            ></Image>
            <Heading as="h1" fontSize={["50px"]}>
              Checkin
            </Heading>
          </Flex>

          <Img
            src="./imagemMobile.png"
            w={["100vw", "0", "0", "0"]}
            h={["300px", "0", "0", "0px"]}
          ></Img>

          <Flex justify={["center", "start"]}>
            <Heading as="h3" size="lg">
              Quer viajar?
            </Heading>
          </Flex>
          <Flex justify={["center", "start"]}>
            <Text
              textAlign={["center", "start"]}
              w={["250px", "300px"]}
              justifyContent={"center"}
              fontSize={["2xl", "lg"]}
            >
              Conheça lugares diferentes através de pessoas que já foram
            </Text>
          </Flex>
          <Flex justify={["center", "start"]}>
            <Login />
          </Flex>
          <Flex justify={["center", "start"]}>
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

          <Flex justify={["center", "start"]}>
            <Text textAlign={["center", "start"]} w="max-content">
              Ainda não tem conta?
              <Register />
            </Text>
          </Flex>
        </Flex>

        <Flex align="center">
          <Img src="./image.png" w={["0","0", "350px", "450px"]} h={["0", "0", "470px", "600px"]}></Img>

        </Flex>
      </Flex>
    </div>
  );
};
