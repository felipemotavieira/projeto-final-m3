import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Select,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { SetStateAction, useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../context/Context";
import ExternalAPI from "../../../services/ExternalAPI/ExternalAPI";
import InternalAPI from "../../../services/InternalAPI/InternalAPI";

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
  const { user } = useContext(UserContext);
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
        console.log(res);
        onClose();
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button onClick={onOpen}>Cadastrar Cidade</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          borderRadius={["60px 60px 0px 0px", "40px", "40px", "40px"]}
          mb={["auto"]}
          mt={["130px", "none"]}
        >
          <ModalHeader>Para onde gostaria de ir?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(addCity)}>
              <Select
                borderRadius="20px"
                pb="8px"
                pt="8px"
                {...register("state")}
                onChange={(e) => handleOnChange(e.target.value)}
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
              {cities.length > 0 ? (
                <Select
                  borderRadius="20px"
                  pb="8px"
                  pt="8px"
                  {...register("cityId")}
                >
                  {cities.map((elem) => (
                    <option value={elem.id} key={elem.id}>
                      {elem.nome}
                    </option>
                  ))}
                </Select>
              ) : (
                <Select
                  borderRadius="20px"
                  pb="8px"
                  pt="8px"
                  isDisabled={true}
                  placeholder="Cidades"
                ></Select>
              )}
              <Flex justify="center">
                <Button
                  type="submit"
                  boxShadow="2xl"
                  w="100%"
                  h="60px"
                  pb="6px"
                  pt="6px"
                  borderRadius="30px"
                  color="white"
                  backgroundColor="#21BA71"
                  _hover={{ backgroundColor: "#3fc4a1" }}
                  _active={{ backgroundColor: "#21BA71" }}
                >
                  Adicionar cidade
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
