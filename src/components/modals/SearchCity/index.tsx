import {
    Button,
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    useDisclosure,
    useToast,
  } from "@chakra-ui/react";
  import { useContext, useState } from "react";
  import { useForm } from "react-hook-form";
  import ExternalAPI from "../../../services/ExternalAPI/ExternalAPI";
  import SearchIcon from '../../../assets/search-icon.svg'
import { UserContext } from "../../../context/Context";
  
  interface Item {
    id: number;
    nome: string;
    microregiao: any;
    regiaoimediata: any;
  }
  
  interface ICityData {
    state: string;
    cityId: string // id da cidade da para fazer uma requisição na api do IBGE e trazer o nome da cidade
  }
  
  export const SearchCity = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [cities, setCities] = useState<Item[]>([]);
    const { register, handleSubmit } = useForm<ICityData>();
    const {posts, getPosts, searchCityPost, postsFiltered} = useContext(UserContext)

    const handleOnChange = (uf: string) => {
      uf === "Escolha o estado"
        ? setCities([])
        : ExternalAPI.get(`estados/${uf}/municipios`, {
            params: {
                orderBy: 'nome'
            }
        })
            .then((response) => {
              setCities(response.data);
            })
            .catch((error) => console.log(error));
    };
  
    const handleSubmitCity = (data: ICityData) => {
        if(data.cityId){
            searchCityPost(data.cityId);
            onClose()
        }
    };

    return (
      <>
        <Button onClick={onOpen}><Image src={SearchIcon} h='24px' pr='10px'/>
            Pesquisar</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Encontrar destino</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit(handleSubmitCity)}>
                <Select {...register('state')} onChange={(e) => handleOnChange(e.target.value)}>
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
                    {cities.map((elem) => {
                      return <option value={elem.id} key={elem.id}>
                        {elem.nome}
                      </option>
                    })}
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
                  Pesquisar cidade
                </Button>
              </form>
            </ModalBody>
            <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => {
                onClose()
                setCities([])
                }}>
              Cancelar
            </Button>
          </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  };
  