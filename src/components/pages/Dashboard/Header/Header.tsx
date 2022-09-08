import { useNavigate } from "react-router-dom";
import Logout from "../../../../assets/logout.svg";
import Person from "../../../../assets/person-icon.svg";
import NoPhoto from "../../../../assets/no-photo.png";
import { useContext } from "react";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  Image,
  Flex,
  Text,
} from "@chakra-ui/react";
import { UserContext } from "../../../../context/Context";
import { SearchCity } from "../../../modals/SearchCity";
import { AddPost } from "../../../modals/AddPost";
import { CityRegister } from "../../../modals/CityRegister/CityRegister";
import { HeaderCinza, HeaderVerde, HeaderTotal } from "./headerStyled";
import { ModalLoginHeader } from "./ModalLoginHeader";
import { ModalRegisterLogin } from "./ModalRegisterHeader";
import { Logo } from "../../../Logo/Logo";

export const Header = () => {
  const { user, setCityPost, setPostsFiltered } = useContext(UserContext);
  const navigate = useNavigate();
  const toUserPage = () => {
    navigate("/profile", { replace: true });
  };
  const leave = () => {
    localStorage.clear();
    navigate("/", { replace: true });
    setCityPost([]);
    setPostsFiltered([]);
  };

  return (
    <>
      {localStorage.getItem("@TOKEN") ? (
        <HeaderTotal>
          <HeaderCinza>
            <div className="containerLogoPerfil">
              <div>
                <figure>
                  <Logo></Logo>
                </figure>
                <p>Checkin</p>
              </div>

              <div>
                <Menu>
                  <MenuButton>
                    <Flex>
                      <Text fontWeight={600} fontSize={"15px"}>
                        {user.name}
                      </Text>
                      <Avatar
                        marginLeft={"15px"}
                        name="User Photo"
                        w={["50px", "50px", "50px"]}
                        h={["50px", "50px", "50px"]}
                        src={user.userPhoto ? user.userPhoto : NoPhoto}
                      />
                    </Flex>
                  </MenuButton>
                  <MenuList
                    display={"flex"}
                    flexDirection={"column"}
                    minW="70px"
                    h="120px"
                  >
                    <MenuItem w="100%" mb="10px">
                      <Button
                        onClickCapture={toUserPage}
                        w="100%"
                        h="35px"
                        colorScheme="green"
                      >
                        {" "}
                        <Image src={Person} h="24px" pr="10px" /> Perfil{" "}
                      </Button>
                    </MenuItem>
                    <MenuItem>
                      <Button
                        onClickCapture={leave}
                        w="100%"
                        h="35px"
                        colorScheme="red"
                      >
                        <Image src={Logout} h="24px" pr="10px" />
                        Sair
                      </Button>
                    </MenuItem>
                  </MenuList>
                </Menu>
              </div>
            </div>
          </HeaderCinza>
          <HeaderVerde>
            <header>
              <div>
                <AddPost />
                <CityRegister />
                <SearchCity />
              </div>
            </header>
          </HeaderVerde>
        </HeaderTotal>
      ) : (
        <HeaderTotal>
          <HeaderCinza>
            <div className="containerLogoPerfil">
              <div>
                <figure>
                  <Logo></Logo>
                </figure>
                <p>Checkin</p>
              </div>
            </div>
          </HeaderCinza>

          <HeaderVerde>
            <Box
              display="flex"
              justifyContent={["space-evenly", "space-evenly", "space-between"]}
              w="100%"
              maxW={"892px"}
            >
              <ModalLoginHeader />
              <SearchCity />
              <ModalRegisterLogin />
            </Box>
          </HeaderVerde>
        </HeaderTotal>
      )}
    </>
  );
};
