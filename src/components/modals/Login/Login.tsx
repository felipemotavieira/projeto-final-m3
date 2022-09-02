import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Image,
  FormErrorMessage,
  Flex,
  Box,
  useToast,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserContext } from "../../../context/Context";

interface ILoginData {
  email: string;
  password: string;
}
export const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSubmitLogin } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const handleClick = () => setShow(!show);
  const toast = useToast();

  const formSchema = yup.object().shape({
    email: yup.string().required("E-mail necessário").email("E-mail inválido"),
    password: yup.string().required("Senha obrigatória").min(6),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginData>({
    resolver: yupResolver(formSchema),
  });

  const handleSuccess = () => {
    navigate("/dashboard");
    toast({
      title: "Login realizado com sucesso!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const submitLogin = async (data: ILoginData) => {
    let verify = await onSubmitLogin(data);

    verify
      ? handleSuccess()
      : toast({
          title: "E-mail ou senha incorretos",
          status: "error",
          duration: 9000,
          isClosable: true,
        });
  };

  return (
    <>
      {localStorage.getItem("@TOKEN") ? (
        <Button
          boxShadow="2xl"
          w="250px"
          h="60px"
          borderRadius="30px"
          color="white"
          backgroundColor="#21BA71"
          _hover={{ backgroundColor: "#3fc4a1" }}
          _active={{ backgroundColor: "#21BA71" }}
          onClick={onOpen}
        >
          Login
        </Button>
      ) : (
        <Button
          background="#2B2945"
          box-shadow="0px 4px 27px 1px rgba(0, 0, 0, 0.12)"
          border-radius="23px"
          color="#FFFFFF"
          onClick={onOpen}
        >
          Login
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          borderRadius={["60px 60px 0px 0px", "40px", "40px", "40px"]}
          h={[
            "713px",
            errors?.password?.message || errors?.email?.message
              ? "470px"
              : "440px",
          ]}
          mb={["auto"]}
          mt={["130px", "none"]}
        >
          <Box
            mt="20px"
            display="flex"
            flexDirection="column"
            marginTop={["130px", "0"]}
            h={["713px"]}
          >
            <Flex w="100%" align="center" direction="column" mt="10px">
              <Image src="./icone.png" w={[0, "50px"]} h={[0, "60px"]}></Image>
              <ModalHeader fontSize="3xl">Login</ModalHeader>
            </Flex>

            <ModalBody>
              <ModalCloseButton />

              <form onSubmit={handleSubmit(submitLogin)}>
                <FormControl isInvalid={!!errors?.email?.message}>
                  <FormLabel>E-mail</FormLabel>
                  <Input
                    borderRadius="20px"
                    p="25px"
                    backgroundColor="#F0F0F0"
                    type="text"
                    variant="flushed"
                    id="email"
                    {...register("email")}
                  />
                  <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
                </FormControl>

                <FormControl my="20px" isInvalid={!!errors?.password?.message}>
                  <FormLabel>Senha</FormLabel>
                  <InputGroup>
                    <Input
                      borderRadius="20px"
                      p="25px"
                      backgroundColor="#F0F0F0"
                      variant="flushed"
                      type={show ? "text" : "password"}
                      id="password"
                      {...register("password")}
                    />

                    <InputRightElement width="4.5rem">
                      <Button
                        backgroundColor="none"
                        h="1.75rem"
                        size="sm"
                        onClick={handleClick}
                      >
                        {show ? (
                          <Image src="./aberto.png" w="25px" h="25px"></Image>
                        ) : (
                          <Image src="./olho.png" w="25px" h="25px"></Image>
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors?.password?.message}
                  </FormErrorMessage>
                </FormControl>

                <Flex justify="center">
                  <Button
                    borderRadius="20px"
                    p="25px"
                    w="500px"
                    type="submit"
                    backgroundColor="#21BA71"
                    color="white"
                  >
                    Entrar
                  </Button>
                </Flex>
              </form>
            </ModalBody>
          </Box>
        </ModalContent>
      </Modal>
    </>
  );
};
