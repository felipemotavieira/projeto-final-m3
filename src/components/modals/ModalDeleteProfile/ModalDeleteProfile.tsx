import ContainerModal from "../../ContainerModal/ContainerModal";
import { ButtonsModal } from "../../ButtonsModal/ButtonsModal";
import { Text } from "@chakra-ui/react";
import { useContext } from "react";
import { UserContext } from "../../../context/Context";
import InternalAPI from "../../../services/InternalAPI/InternalAPI";
import { useNavigate } from "react-router-dom";

export const ModalDeleteProfile = (data: any) => {
  const { modalDeleteOpen, setModalDeleteOpen } = data;
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  let token = localStorage.getItem("@TOKEN");
  const closeModalDelete = () => {
    setModalDeleteOpen(false);
  };

  const deleteProfile = () => {
    InternalAPI.delete(`/users/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {modalDeleteOpen && (
        <>
          <ContainerModal
            title="Confirmação de exclusão"
            functionClose={closeModalDelete}
          >
            <Text mt="18px" fontWeight={"600"} fontSize={"20px"}>
              Você tem certeza de que deseja exluir?
            </Text>
            <Text mt="20px" fontSize={"15px"}>
              Não é possível recuperar novamente
            </Text>
            <ButtonsModal
              titlebtn={"Confirmar"}
              type={"prosseguir"}
              functionOnclick={deleteProfile}
            />
            <ButtonsModal
              titlebtn={"Cancelar"}
              type={"cancelar"}
              functionOnclick={closeModalDelete}
            />
          </ContainerModal>
        </>
      )}
    </>
  );
};
