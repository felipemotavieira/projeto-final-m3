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
  Tooltip,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import { Dispatch, SetStateAction, useState, useContext } from "react";
import { ModalDelete as Modal } from "../components/modals/ModalDelete/ModalDelete";
import { FormEditarPost } from "../components/FormEditPost/FormEditePost";
import { UserContext } from "../context/Context";
import { ButtonsModal } from "../components/ButtonsModal/ButtonsModal";
import NoPhoto from "../assets/no-photo.png";
import FavIcon from "../assets/favorite-icon.svg";
import CommentIcon from "../assets/comment-icon.svg";

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

  const { user, deletePost, token } = useContext(UserContext);

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
    deletePost(`${id}`);
    setIsOpenDelete(false);
  };

  return (
    <Box padding={"0px 18px"}>
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
        >
          <FormEditarPost
            setIsOpenEdite={setIsOpenEdite}
            id={id}
          ></FormEditarPost>
        </Modal>
      )}

      <Flex
        animation={"Font  0.5s forwards"}
        margin={"25px 0px"}
        backgroundColor="#ffffff"
        maxWidth="892px"
        width="100%"
        borderRadius="25px"
        flexDirection="column"
        boxSizing={"border-box"}
        transition={"0.5s"}
        _hover={{ boxShadow: "2xl", cursor: "pointer" }}
        overflow ={"hidden"}
      >
        <Box display="flex" gap={10} flexDirection="row" w="95%">
        <Box h={[0, 0, "350px"]} w={[0, 0, "600px"]}  overflow={"hidden"}>
          <Image
          height={"100%"}
          width ={"auto"}
          objectFit="fill"
            src={photo}
          ></Image>
          </Box>

          <Box
            display="flex"
            flexDirection="column"
            justifyContent="space-around"
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
                  <Avatar src={photoUser ? photoUser : NoPhoto} />
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
            <Text minH='50px' lineHeight={"2ch"} noOfLines={4}>{message}</Text>
            <Heading as="h5" fontSize={["18px"]} fontWeight={"500"}>
              {`${cidade} - ${estado}`}
            </Heading>

            {user.id == userId && token ? (
              <Flex width={"100%"} display="flex" gap={3}>
                <Tooltip hasArrow bg="white" label="Editar postagem">
                  <Button
                    backgroundColor={"#2B2945"}
                    transition="0.3s"
                    _hover={{ transform: "scale(1.2)", transition: "all 0.5s" }}
                    _active={{ bg: "#2B2945" }}
                    onClick={handleEdite}
                  >
                    <EditIcon color={"white"}></EditIcon>
                  </Button>
                </Tooltip>
                <Tooltip hasArrow bg="white" label="Apagar postagem">
                  <Button
                    backgroundColor={"#EA4141"}
                    transition="0.3s"
                    _hover={{ transform: "scale(1.2)", transition: "all 0.5s" }}
                    _active={{ bg: "#EA4141" }}
                    onClick={handleDeleta}
                  >
                    <DeleteIcon color={"white"}></DeleteIcon>
                  </Button>
                </Tooltip>
              </Flex>
            ) : (
              <Flex width={"100%"} display="flex" gap={5}>
                <Tooltip hasArrow bg="white" label="Amei!">
                  <Image src={FavIcon} h="28px" w="28px" />
                </Tooltip>
                <Tooltip hasArrow bg="white" label="Comentar">
                  <Image src={CommentIcon} h="28px" w="28px" />
                </Tooltip>
              </Flex>
            )}
          </Box>
        </Box>
      </Flex>
    </Box>
  );
}

export default ContainerPost;