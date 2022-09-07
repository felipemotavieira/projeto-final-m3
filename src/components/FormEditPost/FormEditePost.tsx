import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Select,
  Button,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import ExternalAPI from "../../services/ExternalAPI/ExternalAPI";
import { useState, useContext } from "react";
import { UserContext } from "../../context/Context";

interface IEditeData {
  cityId: string;
  cityName: string;
  description: string;
  postImage: string;
  state: string;
  title: string;
}

interface Idata {
  id: any;
}

interface Item {
  id: string;
  nome: string;
  microregiao: any;
  regiaoimediata: any;
}

export const FormEditarPost = (data: Idata) => {
  const { id } = data;
  const { user, patchPost } = useContext(UserContext);

  const formSchema = yup.object().shape({
    email: yup.string().email("E-mail inválido"),
    describe: yup.string(),
  });

  const [cities, setCities] = useState<Item[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditeData>({
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

  const editarProfile = (dados: any) => {
    for (const property in dados) {
      if (
        dados[property].trim() === "" ||
        dados[property].trim() === undefined
      ) {
        delete dados[property];
      } else {
        dados.userId = user.id;
      }
    }
    patchPost({ ...dados }, id);
  };

  return (
    <>
      <form onSubmit={handleSubmit(editarProfile)}>
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
          <FormErrorMessage>{errors?.postImage?.message}</FormErrorMessage>
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

        <FormControl mb="10px" isInvalid={!!errors?.description?.message}>
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

        <FormControl>
          <FormLabel>Adicionar cidade</FormLabel>
          {cities.length > 0 ? (
            <Select
              {...register("cityName")}
              width="100%"
              backgroundColor="#dedede"
              borderRadius="42px"
              height="50px"
              id="cidade"
            >
              {cities.map((elem) => {
                return (
                  <option value={elem.nome} key={elem.id}>
                    {elem.nome}
                  </option>
                );
              })}
            </Select>
          ) : (
            <Select isDisabled={true} placeholder="Cidades"></Select>
          )}
        </FormControl>
        <Button
          width="100%"
          borderRadius="25px"
          height="50px"
          color="white"
          type="submit"
          mt="20px"
          backgroundColor="#21BA71"
        >
          Editar
        </Button>
      </form>
    </>
  );
};
