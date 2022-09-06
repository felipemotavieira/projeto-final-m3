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
import { useState } from "react";
import { useForm } from "react-hook-form";
import ExternalAPI from "../../../services/ExternalAPI/ExternalAPI";

interface Item {
  id: number;
  nome: string;
  microregiao: any;
  regiaoimediata: any;
}

interface ICityData {
  city: string;
}

export const CityRegister = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cities, setCities] = useState<Item[]>([]);
  const { register, handleSubmit } = useForm<ICityData>();
 
  const handleOnChange = (uf: string) => {
    uf === "Escolha o estado"
      ? setCities([])
      : ExternalAPI.get(`estados/${uf}/municipios`)
          .then((response) => {
            setCities(response.data);
          })
          .catch((error) => console.log(error));
  };

  const handleSubmitCity = (data: ICityData) => {
    console.log(data);
  };

  return (
    <>
      <Button onClick={onOpen}>Cadastrar Cidade</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Para onde gostaria de ir?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(handleSubmitCity)}>
              <Select onChange={(e) => handleOnChange(e.target.value)}>
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
                <option value="EX">Estrangeiro</option>
              </Select>
              {cities.length > 0 ? (
                <Select {...register("city")}>
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
