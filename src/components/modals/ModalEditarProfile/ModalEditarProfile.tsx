import { FormControl, FormLabel, Input, FormErrorMessage} from "@chakra-ui/react";
import ContainerModal from "../../ContainerModal/ContainerModal";
import { ButtonsModal } from "../../ButtonsModal/ButtonsModal";
import InternalAPI from "../../../services/InternalAPI/InternalAPI";
import { useContext } from "react";
import { UserContext } from "../../../context/Context";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";


interface IEditeData{
  name?:string;
  email?: string;
  userPhoto?:string;
  
}

export const ModalEditarProfile = (data: any) => {
  const { modalEditeOpen, setModalEditeOpen } = data;
  const {user} = useContext(UserContext)
  let token = localStorage.getItem("@TOKEN");

  const closeModalEditar = () => {
    setModalEditeOpen(false);
  };

  const formSchema = yup.object().shape({
    email: yup.string().email("E-mail inválido"),
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
      if(data[property].trim() === "" || data[property].trim() === undefined ){
          delete data[property];
      }
    }
           
       InternalAPI.patch(`/users/${user.id}`, data,  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
       .then(res=> closeModalEditar()).catch(err => console.log(err))
  }

  return (
    <>
      {modalEditeOpen && (
        <>
          <ContainerModal
            functionClose={closeModalEditar}
            title={"Edite suas informações"}
          >
            <form onSubmit={handleSubmit(editarProfile)}>
            <FormControl mb="10px" width="100%"
            isInvalid={!!errors?.name?.message}
            >
              <FormLabel>Nome</FormLabel>
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
            <FormControl mb="10px"
            isInvalid={!!errors?.userPhoto?.message}>
              <FormLabel>Foto Perfil</FormLabel>
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
            </FormControl >
            <FormControl mb="10px" isInvalid={!!errors?.email?.message}>
              <FormLabel>Email</FormLabel>
              <Input
                {...register("email")}
                width="100%"
                backgroundColor="#dedede"
                borderRadius="42px"
                height="50px"
                type="text"
                placeholder="exemplo@email.com"
                padding=" 0 25px"
              />
              <FormErrorMessage>{errors?.email?.message}</FormErrorMessage>
            </FormControl>
            <ButtonsModal
              titlebtn="Editar"
              type="prosseguir"
            ></ButtonsModal>
            <ButtonsModal
              titlebtn="Cancelar"
              type="cancelar"
              functionOnclick={closeModalEditar}
            ></ButtonsModal>
            </form>
            
          </ContainerModal>
        </>
      )}
    </>
  );
};
