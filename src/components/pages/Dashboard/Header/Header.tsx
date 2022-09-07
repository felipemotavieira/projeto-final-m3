import { useNavigate } from "react-router-dom";
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
import { LoginDash } from "../../../modals/LoginDash/Login";
import { CityRegister } from "../../../modals/CityRegister/CityRegister";
import { HeaderCinza, HeaderVerde, HeaderTotal } from "./headerStyled";
import { ModalLoginHeader } from "./ModalLoginHeader";
import { ModalRegisterLogin } from "./ModalRegisterHeader";
import React from "react";

export const Header = () => {
  const { user, token, setCityPost, setPostsFiltered } =
    useContext(UserContext);
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
            <img src="./icone.png" alt="Logo" />
            <p>Checkin</p>
          </HeaderCinza>
          <HeaderVerde>
            <header>
              <div>
                <Menu>
                  <MenuButton>
                    <Avatar
                      name="User Photo"
                      w={["40px", "40px", "50px"]}
                      h={["40px", "40px", "50px"]}
                      src={user.userPhoto ? user.userPhoto : NoPhoto}
                    />
                  </MenuButton>
                  <MenuList minW="70px" h="120px">
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
                <p>{user.name}</p>
              </div>

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
            <img src="./icone.png" alt="Logo" />
            <p>Checkin</p>
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
