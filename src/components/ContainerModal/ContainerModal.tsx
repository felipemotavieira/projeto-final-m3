import { CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, Box, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Logo } from "../Logo/Logo";

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
        padding="60px 40px"
        borderRadius="25px"
        position="fixed"
        zIndex="500"
        top="4vh"
        flexDirection="column"
        maxHeight={"90vh"}
        boxShadow={"-4px -7px 40px -11px #00000035"}
      >
        <Flex
          overflow={"auto"}
          flexDirection={"column"}
          css={{
            "&::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          <Button
            zIndex={6000}
            position={"absolute"}
            width={"30px"}
            top={"15px"}
            right={"10px"}
            onClick={functionClose}
            background="none"
            css={{
              "&:hover": {
                background: "none",
              },
            }}
          >
            <CloseIcon></CloseIcon>
          </Button>
          <Flex justify="flex-end" flexDirection={"column"}>
            <Flex width={"100%"} justify="center">
              <Logo />
            </Flex>
          </Flex>

          <Text
            mb="10px"
            textAlign={"center"}
            fontWeight={"700"}
            fontSize={"25px"}
          >
            {title}
          </Text>

          {children}
        </Flex>
      </Flex>

      <Box
        width={"100%"}
        position={"absolute"}
        opacity={"0.15"}
        backgroundColor={"black"}
      ></Box>
    </>
  );
}

export default ContainerModal;
