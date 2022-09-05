import { CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, Box, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import Logo from '../Logo/Logo'

interface IContainerProps {
  functionClose: () => void;
  title: string;
  children: ReactNode;
}

function ContainerModal({ functionClose, title, children }: IContainerProps) {
  return (
    <>
      <Flex
        backgroundColor="#FFFFFF"
        maxWidth="435px"
        width="100%"
        padding="50px"
        borderRadius="25px"
        position="absolute"
        zIndex="500"
        flexDirection="column"
      >
        <Flex justify="flex-end">
        <Flex width={"100%"} justify="center"><Logo/></Flex>
          
          <Button position={"relative"} width={"30px"} onClick={functionClose} background="none">
            <CloseIcon></CloseIcon>
          </Button>
        </Flex>

        <Text mb="10px" textAlign={"center"} fontWeight={"700"} fontSize={"25px"}>
          {title}
        </Text>
        
        {children}

      </Flex>
      <Box
        width={"100%"}
        minH={"100%"}
        position={"fixed"}
        backgroundColor={"black"}
        opacity="0.15"
      ></Box>
    </>
  );
}

export default ContainerModal;
