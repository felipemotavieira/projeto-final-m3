import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Select,
  useDisclosure,
  Flex,
  Text,
} from "@chakra-ui/react";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import ExternalAPI from "../../../services/ExternalAPI/ExternalAPI";
import { UserContext } from "../../../context/Context";
import { FiSearch } from "react-icons/fi";
import { Logo } from "../../Logo/Logo";

interface Item {
  id: number;
  nome: string;
  microregiao: any;
  regiaoimediata: any;
}

interface ICityData {
  state: string;
  cityId: string;
}

export const SearchCity = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cities, setCities] = useState<Item[]>([]);
  const { register, handleSubmit } = useForm<ICityData>();
  const { searchCityPost } =
    useContext(UserContext);

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

  const handleSubmitCity = (data: ICityData) => {
    if (data.cityId) {
      searchCityPost(data.cityId);
      onClose();
    }
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
        <FiSearch />
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
              Encontre seu destino
            </Text>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit(handleSubmitCity)}>
                <Select
                  borderRadius="15px"
                  mb="15px"
                  bg={"rgba(240, 240, 240, 1)"}
                  {...register("state")}
                  onChange={(e) => handleOnChange(e.target.value)}
                >
                  <option value="">Escolha o estado</option>
                  <option value="AC">Acre</option>
                  <option value="AL">Alagoas</option>
                  <option value="AP">Amap??</option>
                  <option value="AM">Amazonas</option>
                  <option value="BA">Bahia</option>
                  <option value="CE">Cear??</option>
                  <option value="DF">Distrito Federal</option>
                  <option value="ES">Esp??rito Santo</option>
                  <option value="GO">Goi??s</option>
                  <option value="MA">Maranh??o</option>
                  <option value="MT">Mato Grosso</option>
                  <option value="MS">Mato Grosso do Sul</option>
                  <option value="MG">Minas Gerais</option>
                  <option value="PA">Par??</option>
                  <option value="PB">Para??ba</option>
                  <option value="PR">Paran??</option>
                  <option value="PE">Pernambuco</option>
                  <option value="PI">Piau??</option>
                  <option value="RJ">Rio de Janeiro</option>
                  <option value="RN">Rio Grande do Norte</option>
                  <option value="RS">Rio Grande do Sul</option>
                  <option value="RO">Rond??nia</option>
                  <option value="RR">Roraima</option>
                  <option value="SC">Santa Catarina</option>
                  <option value="SP">S??o Paulo</option>
                  <option value="SE">Sergipe</option>
                  <option value="TO">Tocantins</option>
                </Select>
                {cities.length > 0 ? (
                  <Select
                    borderRadius="15px"
                    bg={"rgba(240, 240, 240, 1)"}
                    {...register("cityId")}
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
                  boxShadow="2xl"
                  mt="15px"
                  borderRadius="30px"
                  color="white"
                  backgroundColor="#21BA71"
                  _hover={{ backgroundColor: "#3FC4A1" }}
                  _active={{ backgroundColor: "#21BA71" }}
                  onClick={() => {
                    onClose();
                    setCities([]);
                  }}
                >
                  Pesquisar cidade
                </Button>
              </form>
            </ModalBody>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};
