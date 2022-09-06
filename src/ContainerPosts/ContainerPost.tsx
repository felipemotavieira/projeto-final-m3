import {
  Box,
  Flex,
  Button,
  Text,
  Heading,
  Image,
  Avatar,
  WrapItem,
  Wrap,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction, useState, useContext } from "react";
import { ModalDelete as Modal } from "../components/modals/ModalDelete/ModalDelete";
import { FormEditarPost } from "../components/FormEditPost/FormEditePost";
import { UserContext } from "../context/Context";
import {ButtonsModal} from "../components/ButtonsModal/ButtonsModal"
interface Idata {
  title: string;
  message: string;
  photo: string;
  cidade: string | Promise<string>;
  id?: string;
  photoUser?: string;
  nameUser?: string;
  estado: string;
  userId?: string;
}

interface IData{
cityId: string,
cityName: string,
description: string,
postImage: string,
state: string,
title: string,
}

function ContainerPost({
  title,
  message,
  photo,
  cidade,
  estado,
  id,
  photoUser,
  nameUser,
  userId,
}: Idata) {
  const [isOpenEdite, setIsOpenEdite] = useState<
    boolean | Dispatch<SetStateAction<boolean>>
  >(false);

  const { user, deletePost , patchPost } = useContext(UserContext);

  const [isOpenDelete, setIsOpenDelete] = useState<
    boolean | Dispatch<SetStateAction<boolean>>
  >(false);

  const handleEdite = () => {
    setIsOpenEdite(true);
  };
  const handleDeleta = () => {
    setIsOpenDelete(true);
  };

  const delPost = () => {
    deletePost(`${id}`)
    setIsOpenDelete(false);
  };

const editePost = (data: IData) =>{
  console.log(data)
}

  return (
    <>
      {isOpenDelete && (
        <Modal
          title={"Corfimação de exclusão"}
          message={"Você tem certeza de que deseja excluir? "}
          functionAction={delPost}
          setModalOpen={setIsOpenDelete}
        >
          <ButtonsModal
            titlebtn={"Confirmar"}
            type={"prosseguir"}
            functionOnclick={delPost}
          />
        </Modal>
      )}

      {isOpenEdite && (
        <Modal
          title={"Edição de post"}
          setModalOpen={setIsOpenEdite}
          functionAction={editePost}
        >
          <FormEditarPost id ={id}></FormEditarPost>
        </Modal>
      )}

      <Flex
        margin={"25px"}
        backgroundColor="#ffffff"
        maxWidth="892px"
        width="100%"
        borderRadius="25px"
        flexDirection="column"
        boxSizing={"border-box"}
      >
        <Box display="flex" gap={10} flexDirection="row" w="95%">
          <Image
            borderRadius="20px 0 0px 20px"
            w={[0, 0, "50%"]}
            h={[0, 0, "350px"]}
            src={photo}
          ></Image>

          <Box
            display="flex"
            flexDirection="column"
            gap={3}
            width={"100%"}
            padding={"20px"}
          >
            <Box
              width={"100%"}
              display="flex"
              flexDirection="row"
              alignItems="center"
              gap={3}
            >
              <Wrap>
                <WrapItem>
                  <Avatar src={photoUser} />
                </WrapItem>
              </Wrap>

              <Box>
                <Heading as="h1" fontSize="20px">
                  {nameUser}
                </Heading>
                <Heading
                  as="h3"
                  fontSize={["18px", "18px", "0"]}
                  fontWeight="500"
                ></Heading>
              </Box>
            </Box>

            <Image
              borderRadius="20px"
              maxW={"600px"}
              w={["100%", "100%", 0]}
              h={["100%", "100%", 0]}
              src={photo}
            ></Image>

            <Heading as="h2" fontSize={"18px"}>
              {title}
            </Heading>
            <Text>{message}</Text>
            <Heading as="h5" fontSize={[0, 0, "18px"]} fontWeight={"500"}>
              {`${cidade}-${estado}`}
            </Heading>

            {user.id == userId && (
              <Flex width={"100%"} display="flex" gap={3}>
                <Button backgroundColor={"#2B2945"} onClick={handleEdite}>
                  <EditIcon color={"white"}></EditIcon>
                </Button>
                <Button backgroundColor={"#EA4141"} onClick={handleDeleta}>
                  <DeleteIcon color={"white"}></DeleteIcon>
                </Button>
              </Flex>
            )}
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default ContainerPost;
