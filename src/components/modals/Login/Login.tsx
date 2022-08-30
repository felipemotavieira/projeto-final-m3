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
} from "@chakra-ui/react";
import { useState } from "react";
import * as yup from "yup";
import { useForm } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";

interface ILoginData {
  email: string;
  password: string;
}

export const Login = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  return (
    <>
      <Button onClick={onOpen}>Login</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Login</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <FormControl>
                <FormLabel>E-mail</FormLabel>
                <Input type="email" variant="flushed" />
              </FormControl>
              <FormControl>
                <FormLabel>Senha</FormLabel>
                <InputGroup>
                  <Input
                    variant="flushed"
                    type={show ? "text" : "password"}
                    placeholder="Enter password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                      {show ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
