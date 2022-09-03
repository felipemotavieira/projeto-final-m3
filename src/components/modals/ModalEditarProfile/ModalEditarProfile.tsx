import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import ContainerModal from "../../ContainerModal/ContainerModal";
import { ButtonsModal } from "../../ButtonsModal/ButtonsModal";

export const ModalEditarProfile = (data: any) => {
  const { modalEditeOpen, setModalEditeOpen } = data;

  const closeModalEditar = () => {
    setModalEditeOpen(false);
  };

  const editarProfile = () => {
    console.log("editou");
  };

  return (
    <>
      {modalEditeOpen && (
        <>
          <ContainerModal
            functionClose={closeModalEditar}
            title={"Edite suas informações"}
          >
            <FormControl mb="10px" width="100%">
              <FormLabel>Nome</FormLabel>
              <Input
                width="100%"
                backgroundColor="#dedede"
                borderRadius="42px"
                height="50px"
                type="text"
                placeholder="Seu nome"
                padding=" 0 25px"
              />
            </FormControl>
            <FormControl mb="10px">
              <FormLabel>Foto Perfil</FormLabel>
              <Input
                width="100%"
                backgroundColor="#dedede"
                borderRadius="42px"
                height="50px"
                type="text"
                placeholder="URL da imagem"
                padding=" 0 25px"
              />
            </FormControl>
            <FormControl mb="10px">
              <FormLabel>Email</FormLabel>
              <Input
                width="100%"
                backgroundColor="#dedede"
                borderRadius="42px"
                height="50px"
                type="text"
                placeholder="exemplo@email.com"
                padding=" 0 25px"
              />
            </FormControl>
            <ButtonsModal
              titlebtn="Editar"
              type="prosseguir"
              functionOnclick={editarProfile}
            ></ButtonsModal>
            <ButtonsModal
              titlebtn="Cancelar"
              type="cancelar"
              functionOnclick={closeModalEditar}
            ></ButtonsModal>
          </ContainerModal>
        </>
      )}
    </>
  );
};
