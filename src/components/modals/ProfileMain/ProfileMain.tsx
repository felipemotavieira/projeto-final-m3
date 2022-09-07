import {
  Button,
  Flex,
  Heading,
  Select,
  FormControl,
  FormLabel,
  Input,
  Box
} from "@chakra-ui/react";
import { useState, MouseEvent, Dispatch, SetStateAction, useContext, useEffect} from "react";
import { ProfileForm } from "./styles";
import { ModalEditarProfile } from "../../modals/ModalEditarProfile/ModalEditarProfile";
import {ModalDelete} from "../ModalDelete/ModalDelete"
import { UserContext } from "../../../context/Context";
import { CityRegister } from "../CityRegister/CityRegister";
import { CityRegisterUser } from "../CityRegister-User/CityRegister";


function ProfileMain() {
   const {user, deleteUser, getUsers, users} = useContext(UserContext);
  
   useEffect(() => {
    console.log(user)
   }, [user])

  const [modalDeleteOpen, setModalDeleteOpen] = useState< boolean| Dispatch<SetStateAction<boolean>>>(false)
  const [modalEditeOpen, setModalEditeOpen] = useState< boolean| Dispatch<SetStateAction<boolean>>>(false)

  const handleToEditeProfile = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setModalEditeOpen(true)
    getUsers()
  }
  const handleToDeleteProfile = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setModalDeleteOpen(true)
  }

  return (
    <Flex
      width="100%"
      maxWidth="892px"
      flexDirection="column"
      alignItems="center"
    >
     
      {
        modalDeleteOpen && <ModalDelete setModalOpen ={setModalDeleteOpen}  title={"Confirmação de Exclusão"} message={"Você tem certeza de que deseja exluir?"} message2={"Não é possível recuperar novamente"}>
         <Button
            onClick={deleteUser}
            width="100%"
            borderRadius="25px"
            height="50px"
            color="white"
            type="submit"
            mt="20px"
            backgroundColor= "#21BA71" 
          >
            Excluir
          </Button>
        </ModalDelete>
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
            value={user.name}
            // onChange={()=> {}}
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
            padding=" 0 25px"
            placeholder= { !user.userPhoto ? "Adicione uma URL para completar o seu perfil": ''}
            value={ user.userPhoto? user.userPhoto :''}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            width="100%"
            backgroundColor="#dedede"
            borderRadius="42px"
            height="50px"
            value={user.email}
            padding=" 0 25px"
          />
        </FormControl>
        <FormControl>
          <FormLabel>Cidade que gostaria de conhecer</FormLabel>
          <Box backgroundColor="#dedede"
          borderRadius="42px" 
          display='flex'
          justifyContent='space-between'
          
          >
          <Input
            width="85%"
            outline='hidden'
            border='none'
            borderRadius="42px 0 0 42px"
            _focus={{border: 'none', outline: 'none'}}
            _active={{border: 'none', outline: 'none'}}
            height="50px"
            placeholder= { !user.cityName ? "Adicione uma cidade que gostaria de conhecer": ''}
            value={user.cityName}
            padding=" 0 25px"
          />
          <CityRegisterUser />
          </Box>
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
