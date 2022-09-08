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
  FormErrorMessage,
  useToast,
  Image,
  Flex,
  Box,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { UserContext } from "../../../context/Context";

interface ISubmitData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

export const Register = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { onSubmitRegister } = useContext(UserContext);
  const toast = useToast();

  const formSchema = yup.object().shape({
    name: yup.string().required("Nome necessário"),
    email: yup.string().required("E-mail necessário").email("E-mail inválido"),
    password: yup
      .string()
      .matches(
        /(^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*_-])).{8,}$/,
        "Sua senha deve conter, ao menos, 1 letra maiúscula, 1 letra minúscula, 1 número, 1 caracter especial e 8 dígitos"
      )
      .required("Senha obrigatória"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas devem ser idênticas")
      .required("Obrigatório confirmar sua senha"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ISubmitData>({
    resolver: yupResolver(formSchema),
  });

  const handleSuccess = () => {
    onClose();
    toast({
      title: "Cadastro realizado com sucesso!",
      status: "success",
      duration: 9000,
      isClosable: true,
    });
  };

  const submitRegister = async (data: ISubmitData) => {
    let verify = await onSubmitRegister(data);

    verify ? handleSuccess() : console.log(verify);
  };

  return (
    <>
      <Button
        color="black"
        _hover={{ color: "#21a968" }}
        bg="none"
        onClick={onOpen}
      >
        Ainda não possui uma conta? Cadastre-se aqui
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          display="flex"
          justifyContent="center"
          backgroundColor="#fff"
          borderRadius={["60px 60px 0px 0px", "40px", "40px", "40px"]}
          h={[
            "738px",
            errors?.password?.message || errors?.email?.message
              ? "640px"
              : "550px",
          ]}
          mb={["auto"]}
          mt={["105px", "auto"]}
        >
          <Box display="flex" flexDirection="column">
            <Flex w="100%" align="center" direction="column" mt="10px">
              <Image src="./icone.png" w={[0, "40px"]} h={[0, "45px"]}></Image>
              <ModalHeader p="5px" fontSize="2xl">
                Cadastrar-se
              </ModalHeader>
            </Flex>

            <ModalBody>
              <ModalCloseButton />

              <form onSubmit={handleSubmit(submitRegister)}>
                <FormControl isInvalid={!!errors?.name?.message}>
                  <FormLabel>Nome</FormLabel>
                  <Input
                    borderRadius="20px"
                    p="20px"
                    backgroundColor="#F0F0F0"
                    type="text"
                    variant="flushed"
                    id="name"
                    {...register("name")}
                  />
                  <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors?.email?.message}>
                  <FormLabel>E-mail</FormLabel>
                  <Input
                    borderRadius="20px"
                    p="20px"
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
                      p="20px"
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
                        onClick={() => setShow(!show)}
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

                <FormControl
                  my="20px"
                  isInvalid={!!errors?.confirmPassword?.message}
                >
                  <FormLabel>Confirmar senha</FormLabel>
                  <InputGroup>
                    <Input
                      borderRadius="20px"
                      p="20px"
                      backgroundColor="#F0F0F0"
                      variant="flushed"
                      type={showConfirm ? "text" : "password"}
                      id="confirmPassword"
                      {...register("confirmPassword")}
                    />

                    <InputRightElement width="4.5rem">
                      <Button
                        backgroundColor="none"
                        h="1.75rem"
                        size="sm"
                        onClick={() => setShowConfirm(!showConfirm)}
                      >
                        {showConfirm ? (
                          <Image src="./aberto.png" w="25px" h="25px"></Image>
                        ) : (
                          <Image src="./olho.png" w="25px" h="25px"></Image>
                        )}
                      </Button>
                    </InputRightElement>
                  </InputGroup>
                  <FormErrorMessage>
                    {errors?.confirmPassword?.message}
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
