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
import { Dispatch, SetStateAction, useState } from "react";
import { ModalDelete as Modal } from "../components/modals/ModalDelete/ModalDelete";
import { FormEditarPost } from "../components/FormEditPost/FormEditePost";


interface Idata {
  title: string;
  message: string;
  photo: string;
  localization: string;
  id: number;
}

function ContainerPost({ title, message, photo, localization, id }: Idata) {
  const [isOpenEdite, setIsOpenEdite] = useState<
    boolean | Dispatch<SetStateAction<boolean>>
  >(false);
  const [isOpenDelete, setIsOpenDelete] = useState<
    boolean | Dispatch<SetStateAction<boolean>>
  >(false);

  const handleEdite = () => {
    setIsOpenEdite(true)
  };
  const handleDeleta = () => {
    setIsOpenDelete(true)
  };

  const deletePost = () => {
    console.log(id);
  };

  const EditaPost = () => {
    console.log(id);
  };

  return (
    <>
      {isOpenDelete && (
        <Modal
          title={"Corfimação de exclusão"}
          message={"Você tem certeza de que deseja excluir? "}
          functionAction={deletePost}
          setModalOpen={setIsOpenDelete}
        ></Modal>
      )}

      {isOpenEdite && (
        <Modal
          title={"Edição de post"}
          functionAction={EditaPost}
          setModalOpen={setIsOpenEdite}
        >
        <FormEditarPost></FormEditarPost>
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
                  <Avatar src={photo} />
                </WrapItem>
              </Wrap>

              <Box>
                <Heading as="h1" fontSize="20px">
                  {"nome"}
                </Heading>
                <Heading
                  as="h3"
                  fontSize={["18px", "18px", "0"]}
                  fontWeight="500"
                >
                  {localization}
                </Heading>
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
              {"cidade"}-{"estado"}
            </Heading>

            <Flex width={"100%"} display="flex" gap={3}>
              <Button backgroundColor={"#2B2945"} onClick={handleEdite}>
                <EditIcon color={"white"}></EditIcon>
              </Button>
              <Button backgroundColor={"#EA4141"} onClick={handleDeleta}>
                <DeleteIcon color={"white"}></DeleteIcon>
              </Button>
            </Flex>
          </Box>
        </Box>
      </Flex>
    </>
  );
}

export default ContainerPost;