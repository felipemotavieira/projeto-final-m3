import { useNavigate } from "react-router-dom";
import { CityRegister } from "../../../modals/CityRegister/CityRegister";
import Logout from "../../../../assets/logout.svg";
import Person from "../../../../assets/person-icon.svg";
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
import { SearchCity } from "../../../modals/SearchCity";
import { AddPost } from "../../../modals/AddPost";
import { RegisterDash } from "../../../modals/Register-dash/Register";
import { Login } from "../../../modals/Login/Login";

export const Header = () => {
 
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();
  const toUserPage = () => {
    navigate("/profile", { replace: true });
  };
  const leave = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };
 
  return (
    <>
      {localStorage.getItem("@TOKEN") ? (
        //NÃO MEXER- SUJEITO A QUEBRAR TUDO
        <Box w="100vw">
          <Flex
            backgroundColor="#F0F0F0"
            h={["10vh", "9vh", 0, 0]}
            w={["100vw", "100vw", 0, 0]}
            justify="center"
            align="center"
            gap={3}
          >
            <Image src="./icone.png" w={["40px","40px",0,0]} h={["50px","50px",0,0]}></Image>
            <Heading fontSize={["30px","30px",0,0]}>Checkin</Heading>
          </Flex>
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
                <Box display="flex" alignItems="center" w={[0,0,"max-content"]} gap={3}>
                  <Image src="./iconebranco.png" w={[0,0,"30px","40px"]} h={[0,0,"40px","50px"]}></Image>
                  <Text fontSize={[0,0,"20px","30px"]} color="#fff">Checkin</Text>
                </Box>
                {/* Botão de pesquisa */}
                <Box display="flex" alignItems="center" justifyContent={"center"} w={[0,0,"400px"]} h={[0,0,"70px"]} border="none" gap={3}>
                  <SearchCity/>
                </ Box> 
                {/* Botão de fazer postagem e de adicionar cidade bem como icone do usuario */}
                <Box display="flex" w={[0,0,"200px"]} h={[0,0,"70px"]} alignItems="center" gap={[0,0,3,5]}>
                  <AddPost />
                  <CityRegister/>
                  <Menu>
                      <MenuButton display={["none","none","flex"]}>
                          <Avatar name='User Photo' w="40px" h="40px" src={user.userPhoto ? user.userPhoto : NoPhoto} />
                      </MenuButton>
                      <MenuList minW='70px' h='120px'>
                        <MenuItem w='100%' mb='10px'>
                          <Button onClickCapture={toUserPage} w='100%' h='35px' colorScheme='green'> <Image src={Person} h='24px' pr='10px'/> Perfil </Button>
                        </MenuItem>
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
      ) : (
        <Box w="100vw">
          <Box  
            gap={[0,0,20]}
            display="flex"
            justifyContent={"center"}
            background="#21BA71"
            h={["8vh", "8vh", "10vh", "11vh"]}
            w={["100vw"]}
            maxW="100vw"
            alignItems="center">

              <Box alignItems="center" justifyContent="center" display={["flex"]} gap={10} w={[0,0,"80%"]} minWidth={[0,0,"80%"]} maxWidth={[0,0,"80%"]} h={[0,0,"70px"]}> 
                <Box display={["flex","flex","none"]} justifyContent="center" gap={["5","5",0]} alignItems="center" minW="100vw" >                  
                </Box> 

                {/* Logo */}
                <Box display="flex" alignItems="center" w={[0,0,"max-content"]} gap={3}>
                  <Image src="./iconebranco.png" w={[0,0,"30px","40px"]} h={[0,0,"40px","50px"]}></Image>
                  <Text fontSize={[0,0,"20px","30px"]} color="#fff">Checkin</Text>
                </Box>

                {/* Botão de pesquisa */}
                <Box display="flex" alignItems="center" justifyContent={"center"} w={[0,0,"400px"]} h={[0,0,"70px"]} border="none" gap={3}>
                  <Button onClick={() => console.log('olá mundo')} justifyContent={"space-between"} w="200px" bg="#fff" color="#666666" gap={5} fontSize={[0,0,"15px"]} display={["none", "none", "flex"]}>Pesquisar <Image src="./iconelupa.png" border="none" w={[0,0,"30px","30px"]} h={[0,0,"30px","30px"]}></Image></Button>
                </ Box> 

                {/* Botões cadastro e login */}
                <Box display={["none", "none", "flex"]} w={[0,0,"200px"]} h={[0,0,"70px"]} alignItems="center" gap={[0,0,3,5]}>
                  <Login bg='blue' w="width" h="height" borderRadius="" text="text_login"/>
                  <RegisterDash/>
                </Box>
              </Box>
          </Box>
        </Box>
      )}
      </>
)};
