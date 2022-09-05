import { Box, Button, Flex, Input, Spacer, Menu, MenuButton, MenuList, Avatar, MenuItem, Image, useDisclosure } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { CityRegister } from "../../../modals/CityRegister/CityRegister";
import Logout from '../../../../assets/logout.svg'
import Person from '../../../../assets/person-icon.svg' 
import NoPhoto from '../../../../assets/no-photo.png' 
import { useContext } from "react";
import { UserContext } from '../../../../context/Context' 
import { SearchCity } from "../../../modals/SearchCity";
import { AddPost } from "../../../modals/AddPost";

export const Header = () => {

  const { user, token } = useContext(UserContext)
 
  const navigate = useNavigate();

  const toUserPage = () => {
    navigate('/profile', {replace: true})
  }

  const leave = () => {
    localStorage.clear()
    navigate('/', {replace: true})
  }

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
          <SearchCity/>
        </Flex>
        <Spacer />
        {
          token ?
          <Flex>
            <AddPost />
            <CityRegister/>
            <Menu>
                <MenuButton>
                  <Avatar name='User Photo' src={user.userPhoto ? user.userPhoto : NoPhoto} />
                </MenuButton>
                <MenuList minW='70px' h='120px'>
                  <MenuItem w='100%' mb='10px'>
                    <Button onClickCapture={toUserPage} w='100%' h='35px' colorScheme='green'> <Image src={Person} h='24px' pr='10px'/> Perfil </Button>
                  </MenuItem>
                  <MenuItem>
                    <Button onClickCapture={leave} w='100%' h='35px' colorScheme='red'>
                    <Image src={Logout} h='24px' pr='10px'/>
                      Sair
                    </Button>
                  </MenuItem>
                </MenuList>
              </Menu>   
          </Flex>
          : 
          <>
          <Button 
          // onClickCapture={leave} abrir modal de login
          w='100%' h='35px' colorScheme='blue'>Entrar</Button>
          <Button
          //  onClickCapture={leave} abrir modal de cadastro
           w='100%' h='35px' colorScheme='blue'>Cadastrar-se</Button>
          </>
        }
      </Flex>
    </>
  );
};
