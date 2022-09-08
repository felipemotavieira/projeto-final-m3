import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  useDisclosure,
  FormControl,
  FormLabel,
  Text,
  Flex,
  Box,
  Input,
  Textarea,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import ExternalAPI from "../../../services/ExternalAPI/ExternalAPI";
import { UserContext } from "../../../context/Context";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Logo } from "../../Logo/Logo";
import { AiOutlinePlus } from "react-icons/ai";

interface Item {
  id: number;
  nome: string;
  microregiao: any;
  regiaoimediata: any;
}

interface IPosts {
  postImage: string;
  title: string;
  description: string;
  cityId: string;
  state: string;
  cityName: Promise<string>;
  category: null;
  likes: null;
  saved: null;
  comments: null;
  userId?: string;
  id?: string;
}

export const AddPost = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cities, setCities] = useState<Item[]>([]);
  const { addPost } = useContext(UserContext);
  const userId = localStorage.getItem("@USERID");

  const formSchema = yup.object({
    postImage: yup.string().required("Url da imagem é obrigatório"),
    title: yup.string().required("Título é obrigatório"),
    description: yup.string().required("Descrição é obrigatório"),
    state: yup.string().required("Estado é obrigatório"),
    cityId: yup.string().required("Cidade é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPosts>({
    resolver: yupResolver(formSchema),
  });

  const handleOnChange = (uf: string) => {
    uf === "Escolha o estado"
      ? setCities([])
      : ExternalAPI.get(`estados/${uf}/municipios`, {
          params: {
            orderBy: "nome",
          },
        })
          .then((response) => {
            setCities(response.data);
          })
          .catch((error) => console.log(error));
  };

  const captureCityValue = async (cityId: string) => {
    const response = await ExternalAPI.get(`/municipios/${cityId}`);
    return response.data.nome;
  };

  const handleAddPost = async (data: IPosts) => {
    if (userId) {
      data.userId = userId;
      data.cityName = await captureCityValue(data.cityId);
    }
    addPost(data);
  };

  return (
    <>
      <Button
        bg="rgba(43, 41, 69, 1)"
        transition="0.3s"
        _hover={{ transform: "scale(1.2)", transition: "all 0.5s" }}
        _active={{ bg: "rgba(43, 41, 69, 1)" }}
        color="#fff"
        onClick={onOpen}
        p="0px"
        w={["30px", "30px", "100px"]}
        h={["30px", "30px", "30px"]}
      >
        <AiOutlinePlus />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Flex
            backgroundColor="#FFFFFF"
            maxWidth="435px"
            width="100%"
            padding="50px"
            borderRadius="25px"
            position="fixed"
            zIndex="500"
            flexDirection="column"
            top="2vh"
          >
            <Flex justify="flex-end">
              <Flex width={"100%"} justify="center">
                <Logo />
              </Flex>
            </Flex>
            <Text
              mb="10px"
              textAlign={"center"}
              fontWeight={"700"}
              fontSize={"25px"}
            >
              Adicione uma postagem
            </Text>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit(handleAddPost)}>
                <FormControl
                  mb="10px"
                  width="100%"
                  isInvalid={!!errors?.postImage?.message}
                >
                  <FormLabel>Imagem</FormLabel>
                  <Input
                    {...register("postImage")}
                    width="100%"
                    backgroundColor="#dedede"
                    borderRadius="42px"
                    height="50px"
                    type="text"
                    placeholder="URL da imagem"
                    padding=" 0 25px"
                  />
                  <FormErrorMessage>
                    {errors?.postImage?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mb="10px" isInvalid={!!errors?.title?.message}>
                  <FormLabel>Título</FormLabel>
                  <Input
                    {...register("title")}
                    width="100%"
                    backgroundColor="#dedede"
                    borderRadius="42px"
                    height="50px"
                    type="text"
                    placeholder="Título da postagem"
                    padding=" 0 25px"
                  />
                  <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
                </FormControl>

                <FormControl
                  mb="10px"
                  isInvalid={!!errors?.description?.message}
                >
                  <FormLabel>Descrição</FormLabel>
                  <Textarea
                    {...register("description")}
                    id="descricao"
                    width="100%"
                    backgroundColor="#dedede"
                    borderRadius="22px"
                    height="50px"
                    placeholder="Digite aqui a descrição..."
                    padding=" 10px 25px"
                  />
                  <FormErrorMessage>
                    {errors.description?.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl mb="10px">
                  <FormLabel>Adicionar estado (UF)</FormLabel>
                  <Select
                    {...register("state")}
                    onChange={(e) => handleOnChange(e.target.value)}
                    width="100%"
                    backgroundColor="#dedede"
                    borderRadius="42px"
                    height="50px"
                    id="estado"
                  >
                    <option value="">Escolha o estado</option>
                    <option value="AC">Acre</option>
                    <option value="AL">Alagoas</option>
                    <option value="AP">Amapá</option>
                    <option value="AM">Amazonas</option>
                    <option value="BA">Bahia</option>
                    <option value="CE">Ceará</option>
                    <option value="DF">Distrito Federal</option>
                    <option value="ES">Espírito Santo</option>
                    <option value="GO">Goiás</option>
                    <option value="MA">Maranhão</option>
                    <option value="MT">Mato Grosso</option>
                    <option value="MS">Mato Grosso do Sul</option>
                    <option value="MG">Minas Gerais</option>
                    <option value="PA">Pará</option>
                    <option value="PB">Paraíba</option>
                    <option value="PR">Paraná</option>
                    <option value="PE">Pernambuco</option>
                    <option value="PI">Piauí</option>
                    <option value="RJ">Rio de Janeiro</option>
                    <option value="RN">Rio Grande do Norte</option>
                    <option value="RS">Rio Grande do Sul</option>
                    <option value="RO">Rondônia</option>
                    <option value="RR">Roraima</option>
                    <option value="SC">Santa Catarina</option>
                    <option value="SP">São Paulo</option>
                    <option value="SE">Sergipe</option>
                    <option value="TO">Tocantins</option>
                  </Select>
                </FormControl>

                <FormLabel>Adicionar cidade</FormLabel>
                {cities.length > 0 ? (
                  <Select
                    {...register("cityId")}
                    width="100%"
                    backgroundColor="#dedede"
                    borderRadius="42px"
                    height="50px"
                    id="cidade"
                  >
                    {cities.map((elem) => {
                      return (
                        <option value={elem.id} key={elem.id}>
                          {elem.nome}
                        </option>
                      );
                    })}
                  </Select>
                ) : (
                  <Select isDisabled={true} placeholder="Cidades"></Select>
                )}

                <Button
                  type="submit"
                  width="100%"
                  height="50px"
                  borderRadius="25px"
                  color="white"
                  mt="20px"
                  backgroundColor="#21BA71"
                  _hover={{ backgroundColor: "#3fc4a1" }}
                  _active={{ backgroundColor: "#21BA71" }}
                  colorScheme="blue"
                  mr={3}
                  onClick={() => {
                    onClose();
                    setCities([]);
                  }}
                >
                  Adicionar
                </Button>
              </form>
            </ModalBody>
          </Flex>
        </ModalContent>
        <Box
          width={"100%"}
          minH={"100%"}
          position={"fixed"}
          opacity={"0.15"}
          backgroundColor={"black"}
        >
          dfdf
        </Box>
      </Modal>
    </>
  );
};
