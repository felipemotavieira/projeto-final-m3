import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
  Select,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

interface IEditeData {
  name?: string;
  email?: string;
  userPhoto?: string;
  describe?: string;
  estado?: string;
  cidade?:string;
}

export const FormEditarPost = (data: any) => {
  const formSchema = yup.object().shape({
    email: yup.string().email("E-mail inválido"),
    describe: yup.string()
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IEditeData>({
    resolver: yupResolver(formSchema),
  });

  const editarProfile = (data: any) => {
    for (const property in data) {
      if (data[property].trim() === "" || data[property].trim() === undefined) {
        delete data[property];
      }
    }
    // colocar api
    console.log(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(editarProfile)}>
        <FormControl mb="10px" width="100%" isInvalid={!!errors?.name?.message}>
          <FormLabel>Foto</FormLabel>
          <Input
            {...register("name")}
            width="100%"
            backgroundColor="#dedede"
            borderRadius="42px"
            height="50px"
            type="text"
            placeholder="Seu nome"
            padding=" 0 25px"
          />
          <FormErrorMessage>{errors?.name?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb="10px" isInvalid={!!errors?.userPhoto?.message}>
          <FormLabel>Título</FormLabel>
          <Input
            {...register("userPhoto")}
            width="100%"
            backgroundColor="#dedede"
            borderRadius="42px"
            height="50px"
            type="text"
            placeholder="URL da imagem"
            padding=" 0 25px"
          />
          <FormErrorMessage>{errors?.userPhoto?.message}</FormErrorMessage>
        </FormControl>

        <FormControl mb="10px" isInvalid={!!errors?.describe?.message}>
          <FormLabel>Descrição</FormLabel>
          <Textarea
          {...register("describe")}
          id ="descricao"
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
            width="100%"
            backgroundColor="#dedede"
            borderRadius="42px"
            height="50px"
            id ="estado"
          >
            <option value="adicionar">
              Adicionar estado (UF)
            </option>
          </Select>
        </FormControl>

        <FormControl>
        <FormLabel>Adicionar cidade</FormLabel>
          <Select
            width="100%"
            backgroundColor="#dedede"
            borderRadius="42px"
            height="50px"
            id ="estado"
          >
            <option value="adicionar">
              Adicionar cidade
            </option>

          </Select>
        </FormControl>

      </form>
    </>
  );
};
