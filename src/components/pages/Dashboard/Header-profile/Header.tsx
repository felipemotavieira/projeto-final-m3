import { useNavigate } from "react-router-dom";
import { CityRegister } from "../../../modals/CityRegister/CityRegister";
import Logout from "../../../../assets/logout.svg";
import NoPhoto from "../../../../assets/no-photo.png";
import { useContext } from "react";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  Avatar,
  MenuItem,
  Image,
} from "@chakra-ui/react";
import { UserContext } from "../../../../context/Context";
import { AddPost } from "../../../modals/AddPost";
import { HeaderCinza, HeaderVerde } from "../Header/header";


export const HeaderProfile = () => {
  const { user, token } = useContext(UserContext);
  const navigate = useNavigate();

  const leave = () => {
    localStorage.clear();
    navigate("/", { replace: true });
  };

  const dashboard = () => {
    navigate("/dashboard", { replace: true });
  };

  return (
    <>
      {token && (
        //NÃO MEXER- SUJEITO A QUEBRAR TUDO
        <>
          <HeaderCinza>
            <img onClick={dashboard} src="./icone.png" alt="Logo" />
            <p>Checkin</p>
          </HeaderCinza>
          <HeaderVerde>
            <header>
              <div>
                <Menu>
                  <MenuButton>
                    <Avatar
                      name="User Photo"
                      w={["40px","40px", "50px"]}
                      h={["40px","40px", "50px"]}
                      src={user.userPhoto ? user.userPhoto : NoPhoto}
                    />
                  </MenuButton>
                  <MenuList minW="70px" h="70px">
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
              </div>
            </header>
          </HeaderVerde>
        </>
      )}
    </>
  );
};
