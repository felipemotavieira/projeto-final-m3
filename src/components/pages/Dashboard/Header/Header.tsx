import { Box, Button, Flex, Input, Spacer } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CityRegister } from "../../../modals/CityRegister/CityRegister";

export const Header = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  return (
    <>
      <Flex
        minWidth="100vw"
        background="#21BA71"
        maxHeight="7vh"
        alignItems="center"
      >
        <Box>
          <h1>LOGO</h1>
        </Box>
        <Spacer />
        <Flex justify-self="center">
          <Input placeholder="Procurar destino" background="#FFFFFF"></Input>
          <Button
            background="#2B2945"
            box-shadow="0px 4px 27px 1px rgba(0, 0, 0, 0.12)"
            border-radius="23px"
            color="#FFFFFF"
          >
            Pesquisar
          </Button>
        </Flex>
        <Spacer />
        <Flex>
          <Button>Add post</Button>
          <CityRegister />
          <Button>+</Button>
        </Flex>
      </Flex>
    </>
  );
};
