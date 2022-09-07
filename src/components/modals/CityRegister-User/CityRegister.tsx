import {
  Button,
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

export const CityRegisterUser = () => {
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
        console.log(res);
        setUser(res.data)
        onClose();
        toast({
          title: "Cidade definida com sucesso.",
          status: "success",
          duration: 1500,
          isClosable: true,
        });
        // setLoading(true);
        // setTimeout(() => {
        //   setCityPost([]);
        //   const filter = posts.filter((post) => post.cityId == res.data.cityId); //[] ou [{...}, {...}]
        //   setCityPost([...filter]);
        //   setLoading(false);
        //   console.log(filter);
        //   if (filter.length > 0) {
        //     toast({
        //       title:
        //         "Você está visualizando postagens da cidade que gostaria de conhecer.",
        //       status: "success",
        //       duration: 3500,
        //       isClosable: true,
        //     });
        //   } else {
        //     toast({
        //       title:
        //         "Esta cidade ainda não possui postagens. Você está visualizando postagens de cidades aleatórias.",
        //       status: "warning",
        //       duration: 3500,
        //       isClosable: true,
        //     });
        //   }
        // }, 2000);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Button onClick={onOpen} h='50px'  padding=" 0 25px" bg="rgba(43, 41, 69, 1)" color='white'
      _hover={{ backgroundColor: "#201d5a" }} borderRadius="0 42px 42px 0"
      >Cadastrar</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Para onde gostaria de ir?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(addCity)}>
              <Select
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
                <Select {...register("cityId")}>
                  {cities.map((elem) => (
                    <option value={elem.id} key={elem.id}>
                      {elem.nome}
                    </option>
                  ))}
                </Select>
              ) : (
                <Select isDisabled={true} placeholder="Cidades"></Select>
              )}

              <Button
                type="submit"
                boxShadow="2xl"
                w="250px"
                h="60px"
                borderRadius="30px"
                color="white"
                backgroundColor="#21BA71"
                _hover={{ backgroundColor: "#3fc4a1" }}
                _active={{ backgroundColor: "#21BA71" }}
              >
                Adicionar cidade
              </Button>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
