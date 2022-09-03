import ContainerModal from "../../ContainerModal/ContainerModal";
import { ButtonsModal } from "../../ButtonsModal/ButtonsModal";
import { Text } from "@chakra-ui/react";

export const ModalDeleteProfile = (data: any) => {
  const { modalDeleteOpen, setModalDeleteOpen } = data;

  const closeModalDelete = () => {
    setModalDeleteOpen(false);
  };

  const DeleteProfile = () => {
    console.log("excluiu");
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
              functionOnclick={DeleteProfile}
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
