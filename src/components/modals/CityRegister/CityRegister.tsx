import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
  FormControl,
  FormLabel,
  Text,
  Flex,
  Box,
} from "@chakra-ui/react";
import {
  SetStateAction,
  useContext,
  useEffect,
  useState,
  Dispatch,
} from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../context/Context";
import ExternalAPI from "../../../services/ExternalAPI/ExternalAPI";
import InternalAPI from "../../../services/InternalAPI/InternalAPI";
import Logo from "../../Logo/Logo";
import { GiCommercialAirplane } from "react-icons/gi";


interface Item {
  id: number;
  nome: string;
  microregiao: any;
  regiaoimediata: any;
}

interface ICityData {
  cityId: string;
  state: string;
  userId?: string;
  cityName: Promise<string>;
}

export const CityRegister = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cities, setCities] = useState<Item[]>([]);
  const [locations, setLocations] = useState<ICityData[]>([]);
  const { register, handleSubmit } = useForm<ICityData>();
  const { user, setLoading, setCityPost, posts, setUser } = useContext(UserContext);
  let userId = localStorage.getItem("@USERID");
  let token = localStorage.getItem("@TOKEN");
  const toast = useToast();

  const handleOnChange = (uf: string) => {
    uf === "Escolha o estado"
      ? setCities([])
      : ExternalAPI.get(`estados/${uf}/municipios`)
          .then((response) => {
            setCities(response.data);
          })
          .catch((error) => console.log(error));
  };

  useEffect(() => {
    InternalAPI.get(`/users/${userId}`)
      .then((res) => {
        setLocations(res.data.cityId);
      })
      .catch((err) => console.log(err));
  }, []);

  const captureCityValue = async (cityId: string) => {
    const response = await ExternalAPI.get(`/municipios/${cityId}`);
    return response.data.nome;
  };

  const addCity = async (data: ICityData) => {
    if (userId) {
      data.userId = userId;
      data.cityName = await captureCityValue(data.cityId);
    }
    handleSubmitCity(data);
  };

  const handleSubmitCity = async (data: ICityData) => {
    InternalAPI.patch(`/users/${userId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setUser(res.data);
        onClose();
        toast({
          title: "Cidade definida com sucesso.",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
        setLoading(true);
        setCityPost([]);
        setTimeout(() => {
          const filter = posts.filter((post) => post.cityId == res.data.cityId); //[] ou [{...}, {...}]
          setCityPost([...filter]);
          setLoading(false);
          console.log(filter);
          if (filter.length > 0) {
            toast({
              title:
                "Você está visualizando postagens da cidade que gostaria de conhecer.",
              status: "success",
              duration: 3500,
              isClosable: true,
            });
          } else {
            toast({
              title:
                "Esta cidade ainda não possui postagens. Você está visualizando postagens de cidades aleatórias.",
              status: "warning",
              duration: 3500,
              isClosable: true,
            });
          }
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button bg="rgba(43, 41, 69, 1)" color="#fff" p="0px" w={["30px","30px","100px"]} h={["30px","30px","30px"]} onClick={onOpen}>
        {" "}
        <GiCommercialAirplane />{" "}
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
              Para onde gostaria de ir?
            </Text>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit(addCity)}>
                <FormControl mb="10px" width="100%">
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
                <FormControl>
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
                      {cities.map((elem) => (
                        <option value={elem.id} key={elem.id}>
                          {elem.nome}
                        </option>
                      ))}
                    </Select>
                  ) : (
                    <Select isDisabled={true} placeholder="Cidades"></Select>
                  )}
                </FormControl>
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
