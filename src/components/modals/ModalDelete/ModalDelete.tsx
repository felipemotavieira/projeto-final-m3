import ContainerModal from "../../ContainerModal/ContainerModal";
import { ButtonsModal } from "../../ButtonsModal/ButtonsModal";
import { Text } from "@chakra-ui/react";
import { Dispatch, SetStateAction, ReactNode } from "react";

interface Idata {
  setModalOpen: Dispatch<
    SetStateAction<boolean | Dispatch<SetStateAction<boolean>>>
  >;
  title: string;
  message?: string;
  message2?: string;
  message3?: string;
  functionAction?: (dataF: any) => void;
  children?: ReactNode;
}

export const ModalDelete = ({
  setModalOpen,
  title,
  message,
  message2,
  message3,
  children,
}: Idata) => {
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <>
        <ContainerModal title={title} functionClose={closeModal}>
          
          {message && (
            <Text mt="20px" fontSize={"18px"}>
              {message}
            </Text>
          )}

          {message2 && (
            <Text mt="20px" fontSize={"15px"}>
              {message2}
            </Text>
          )}
          
          {message3 && (
            <Text mt="20px" fontSize={"15px"}>
              {message3}
            </Text>
          )}
          {children}
          <ButtonsModal
            titlebtn={"Cancelar"}
            type={"cancelar"}
            functionOnclick={closeModal}
          />
        </ContainerModal>
      </>
    </>
  );
};
