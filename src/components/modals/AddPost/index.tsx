import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Select,
    useDisclosure,
  } from "@chakra-ui/react";
import { useContext, useState } from "react";
import ExternalAPI from "../../../services/ExternalAPI/ExternalAPI";
import { UserContext } from "../../../context/Context";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

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
    const {posts, addPost} = useContext(UserContext)
    // const [postsFiltered, setPostsFiltered] = useState<IPosts[]>([])
    const userId = localStorage.getItem('@USERID')
    
    const formSchema = yup.object({
        postImage: yup.string().required('Url da imagem é obrigatório'),
        title: yup.string().required('Título é obrigatório'),
        description: yup.string().required('Descrição é obrigatório'),
        state: yup.string().required('Estado é obrigatório'),
        cityId: yup.string().required('Cidade é obrigatório'),
    })
    
    const { register, handleSubmit, formState: {errors} } = useForm<IPosts>({
        resolver: yupResolver(formSchema)
    });

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

    const captureCityValue = async (cityId: string) => {
        const response = await ExternalAPI.get(`/municipios/${cityId}`)
        return response.data.nome
    }
    
    const handleAddPost = async (data: IPosts) => {
        if (userId){
            data.userId = userId
            data.cityName = await captureCityValue(data.cityId)
        }
        addPost(data)
    };

    return (
      <>
        <Button onClick={onOpen}>
            +</Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Encontrar destino</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handleSubmit(handleAddPost)}>
                <input type="text" placeholder='foto' {...register('postImage')}/>
                <p>{errors.postImage?.message}</p>
                <input type="text" placeholder='título' {...register('title')}/>
                <p>{errors.title?.message}</p>
                <input type="text" placeholder='descrição' {...register('description')}/>
                <p>{errors.description?.message}</p>
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
  