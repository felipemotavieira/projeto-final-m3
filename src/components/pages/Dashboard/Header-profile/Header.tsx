import { useNavigate } from "react-router-dom";
import { CityRegister } from "../../../modals/CityRegister/CityRegister";
import Logout from "../../../../assets/logout.svg";
import NoPhoto from "../../../../assets/no-photo.png";
import { useContext } from "react";
import {
  Heading,
  Text,
  Box,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  Image,
} from "@chakra-ui/react";
import { UserContext } from "../../../../context/Context";
import { AddPost } from "../../../modals/AddPost";


export const HeaderProfile = () => {
 
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();

  const leave = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const dashboard = () => {
    navigate("/dashboard", { replace: true });
  }
 
  return (
    <>
      {
      token && (
        //NÃO MEXER- SUJEITO A QUEBRAR TUDO
        <Box w="100vw">
          <Box
            gap={[0, 0, 20]}
            display="flex"
            justifyContent={["center","center","center"]}
            background="#21BA71"
            h={["8vh", "8vh", "10vh", "11vh"]}
            w={["100vw"]}
            alignItems="center">

              <Box  alignItems="center" justifyContent="center" display="flex" gap={10} w={[0,0,"80%"]} minWidth={[0,0,"80%"]} maxWidth={[0,0,"80%"]} h={[0,0,"70px"]}> 
          
                {/* Logo */}
                <Box onClick={dashboard} display="flex" alignItems="center" w={[0,0,"max-content"]} gap={3}>
                  <Image src="./iconebranco.png" w={[0,0,"30px","40px"]} h={[0,0,"40px","50px"]}></Image>
                  <Text fontSize={[0,0,"20px","30px"]} color="#fff">Checkin</Text>
                </Box>
                
                {/* Botão de fazer postagem e de adicionar cidade bem como icone do usuario */}
                <Box display="flex" w={[0,0,"200px"]} h={[0,0,"70px"]} alignItems="center" gap={[0,0,3,5]}>
                  <AddPost />
                  <CityRegister/>
                  <Menu>
                      <MenuButton display={["none","none","flex"]}>
                          <Avatar name='User Photo' w="40px" h="40px" src={user.userPhoto ? user.userPhoto : NoPhoto} />
                      </MenuButton>
                      <MenuList minW='70px' h='70px'>
                        <MenuItem>
                          <Button onClickCapture={leave} w='100%' h='35px' colorScheme='red'>
                              <Image src={Logout} h='24px' pr='10px'/>Sair</Button>
                        </MenuItem>
                      </MenuList>
                    </Menu>
                </Box>
              </Box>
          </Box>
        </Box>
      )}
      </>
)};
