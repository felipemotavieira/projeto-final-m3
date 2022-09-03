import {
  Button,
  Flex,
  Heading,
  Select,
  FormControl,
  FormLabel,
  Input
} from "@chakra-ui/react";
import { useState, MouseEvent, Dispatch, SetStateAction } from "react";
import { ProfileForm } from "./styles";
import { ModalDeleteProfile } from "../../modals/ModalDeleteProfile/ModalDeleteProfile";
import { ModalEditarProfile } from "../../modals/ModalEditarProfile/ModalEditarProfile";

interface ImodalDeleteOpen {
  setModalDeleteOpen: Dispatch<SetStateAction<boolean>>;
}

function ProfileMain() {
  const [modalDeleteOpen, setModalDeleteOpen] = useState<ImodalDeleteOpen | boolean>(false)
  const [modalEditeOpen, setModalEditeOpen] = useState<ImodalDeleteOpen | boolean>(false)

  const handleToEditeProfile = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("edite")
    setModalEditeOpen(true)
  }
  const handleToDeleteProfile = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    console.log("deletar perfil")
    setModalDeleteOpen(true)
  }

  return (
    <Flex
      width="100%"
      maxWidth="780px"
      flexDirection="column"
      alignItems="center"
    >

      {
        modalDeleteOpen && <ModalDeleteProfile setModalDeleteOpen={setModalDeleteOpen} modalDeleteOpen={modalDeleteOpen} />
      }
      {
        modalEditeOpen && <ModalEditarProfile setModalEditeOpen={setModalEditeOpen} modalEditeOpen={modalEditeOpen} />
      }

      <ProfileForm>
        <Heading size="lg" as="h4">
          Usuário
        </Heading>
        <FormControl width="100%">
          <FormLabel>Nome</FormLabel>
          <Input
            width="100%"
            backgroundColor="#dedede"
            borderRadius="42px"
            height="50px"
            type="text"
            value="adicionar no javascript"
            padding=" 0 25px"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Foto Perfil</FormLabel>
          <Input
            width="100%"
            backgroundColor="#dedede"
            borderRadius="42px"
            height="50px"
            type="text"
            value="adicionar no javascript"
            padding=" 0 25px"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            width="100%"
            backgroundColor="#dedede"
            borderRadius="42px"
            height="50px"
            type="text"
            value="adicionar no javascript"
            padding=" 0 25px"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Cidades que gostária de conhecer</FormLabel>
          <Select
            width="100%"
            backgroundColor="#dedede"
            borderRadius="42px"
            height="50px"
            value="adicionar no javascript"
          >
            <option value="adicionar">
              Adicionar funcionalidade no javascript
            </option>
            {/* {
              array?.map(ele => <option value={}>{}</option>)

            } */}
          </Select>
        </FormControl>
        <Flex
          className="containerBtn"
          justify="space-between"
          gap={"40px"}
          width="100%"
          wrap="wrap"
        >
          <Button
            onClick={handleToEditeProfile}
            className="btnPerfil"
            width="90%"
            maxWidth="258px"
            borderRadius="25px"
            height="50px"
            backgroundColor="#2B2945"
            color="white"
            mt={4}
            type="submit"
          >
            Editar
          </Button>
          <div className="border"></div>
          <Button
            onClick={handleToDeleteProfile}
            className="btnPerfil first"
            borderRadius="25px"
            height="50px"
            width="90%"
            color="white"
            maxWidth="258px"
            backgroundColor="#EA4141"
            mt={4}
          >
            Deletar
          </Button>
        </Flex>
      </ProfileForm>
    </Flex>
  );
}

export default ProfileMain;
