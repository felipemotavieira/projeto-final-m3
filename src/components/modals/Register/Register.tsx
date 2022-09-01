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

  async function submitRegister(data: ISubmitData) {
    console.log(data);
    let verify = await onSubmitRegister(data);

    verify ? handleSuccess() : console.log(verify);
  }

  return (
    <>
      <Button
        color="black"
        _hover={{ color: "#21a968" }}
        bg="none"
        onClick={onOpen}
      >
        Cadastre-se aqui
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Registre-se!</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(submitRegister)}>
              <FormControl isInvalid={!!errors?.name?.message}>
                <FormLabel>Nome</FormLabel>
                <Input
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
                    placeholder="Enter password"
                    id="password"
                    {...register("password")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
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
                <FormErrorMessage>{errors?.password?.message}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors?.confirmPassword?.message}>
                <FormLabel>Confirmar senha</FormLabel>
                <InputGroup>
                  <Input
                    variant="flushed"
                    type={showConfirm ? "text" : "password"}
                    placeholder="Enter password"
                    id="confirmPassword"
                    {...register("confirmPassword")}
                  />
                  <InputRightElement width="4.5rem">
                    <Button
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
              <Button type="submit">Cadastre-se!</Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
