import {
  Button,
  Input,
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
import { CUIAutoComplete } from "chakra-ui-autocomplete";
import { useState } from "react";
import ExternalAPI from "../../../services/ExternalAPI/ExternalAPI";

interface Item {
  id: number;
  nome: string;
  microregiao: any;
  regiaoimediata: any;
}

export const CityRegister = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [cities, setCities] = useState<Item[]>([]);
  const toast = useToast();
  const [pickerItems, setPickerItems] = useState<Item[]>(cities);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const handleCreateItem = (item: Item) => {
    setPickerItems((curr) => [...curr, item]);
    setSelectedItems((curr) => [...curr, item]);
  };

  const handleSelectedItemsChange = (selectedItems?: Item[]) => {
    if (selectedItems) {
      setSelectedItems(selectedItems);
    }
  };

  const handleOnChange = (uf: string) => {
    console.log(uf);
    ExternalAPI.get(`/${uf}/municipios`)
      .then((response) => {
        setCities(response.data);
        console.log(cities);
      })
      .catch((error) => console.log(error));
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
            <form>
              <Select onChange={(e) => handleOnChange(e.target.value)}>
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
              {cities.length > 0 && (
                <CUIAutoComplete
                  label="Choose preferred work locations"
                  placeholder="Type a Country"
                  onCreateItem={handleCreateItem}
                  items={pickerItems}
                  selectedItems={selectedItems}
                  onSelectedItemsChange={(changes) =>
                    handleSelectedItemsChange(changes.selectedItems)
                  }
                />
              )}
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
