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

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(submitLogin)}>
              <FormControl isInvalid={!!errors?.email?.message}>
                <FormLabel>E-mail</FormLabel>
                <Input
                  type="text"
                  variant="flushed"
                  id="email"
                  {...register("email")}
                />
                <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors?.password?.message}>
                <FormLabel>Senha</FormLabel>
                <InputGroup>
                  <Input
                    variant="flushed"
                    type={show ? "text" : "password"}
                    id="password"
                    {...register("password")}
                  />

                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? (
                        <Image src="./aberto.png" w="25px" h="25px"></Image>
                      ) : (
                        <Image src="./olho.png" w="25px" h="25px"></Image>
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>

              <Button type="submit">Entrar</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
