import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Button,
    FormErrorMessage,
    Flex,
    Box,
    Select,
  } from "@chakra-ui/react";
  import * as yup from "yup";
  import { useForm } from "react-hook-form";
  import { yupResolver } from "@hookform/resolvers/yup";

export const Post = () => {
  
  interface ISubmitData {
    photo: string;
    title: string;
    description: string;
    state:string;
    city:string
  }
  
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    const formSchema = yup.object().shape({
      photo: yup.string().required("Foto necessária"),
      title: yup.string().required("Título necessário"),
      description: yup.string().required("Descrição obrigatória"),
    });
  
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ISubmitData>({
      resolver: yupResolver(formSchema),
    });
  
    const submitRegister = (data: ISubmitData) => {
      console.log(data);
    };
  
    return (
      <>
        <Button
          color="black"
          _hover={{ color: "#21a968" }}
          bg="none"
          onClick={onOpen}
        >
          Teste post
        </Button>
  
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            display="flex"
            justifyContent="center"
            backgroundColor="#fff"
            borderRadius={["60px 60px 0px 0px", "40px", "40px", "40px"]}
            h={[
              "850px",
              errors?.photo?.message || errors?.photo?.message
                ? "700px"
                : "650px",
            ]}
            mb={["auto"]}
            mt={["105px", "auto"]}
          >
            <Box display="flex" flexDirection="column">
              <Flex w="100%" align="center" direction="column" mt="10px">
                <ModalHeader p="5px" fontSize="2xl">
                  Fazer uma nova postagem
                </ModalHeader>
              </Flex>
  
              <ModalBody>
                <ModalCloseButton />
  
                <form onSubmit={handleSubmit(submitRegister)}>
                  <FormControl isInvalid={!!errors?.photo?.message}>
                    <FormLabel>Foto</FormLabel>
                    <Input
                      borderRadius="20px"
                      p="20px"
                      backgroundColor="#F0F0F0"
                      type="text"
                      variant="flushed"
                      id="photo"
                      {...register("photo")}
                    />
                    <FormErrorMessage>{errors?.photo?.message}</FormErrorMessage>
                  </FormControl>
  
                  <FormControl isInvalid={!!errors?.title?.message}>
                    <FormLabel>Título</FormLabel>
                    <Input
                      borderRadius="20px"
                      p="20px"
                      backgroundColor="#F0F0F0"
                      type="text"
                      variant="flushed"
                      id="title"
                      {...register("title")}
                    />
                    <FormErrorMessage>{errors?.title?.message}</FormErrorMessage>
                  </FormControl>
  
                  <FormControl my="20px" isInvalid={!!errors?.description?.message}>
                    <FormLabel>Descrição</FormLabel>
                    <InputGroup>
                      <Input
                        borderRadius="20px"
                        p="20px"
                        backgroundColor="#F0F0F0"
                        variant="flushed"
                        id="description"
                        {...register("description")}
                      />
  
                    </InputGroup>
                    <FormErrorMessage>
                      {errors?.description?.message}
                    </FormErrorMessage>
                  </FormControl>
  
                  <FormControl
                    my="20px"
                    isInvalid={!!errors?.state?.message}
                  >
                    <FormLabel>Estado</FormLabel>
                    <Select 

                        borderRadius="20px"
                        backgroundColor="#F0F0F0"
                        variant="flushed"
                        id="state"
                        {...register("state")}>
                            
                      <option value='option1'>Option 1</option>
                      <option value='option2'>Option 2</option>
                      <option value='option3'>Option 3</option>
  
                    </Select>
                    <FormErrorMessage>
                      {errors?.state?.message}
                    </FormErrorMessage>
                  </FormControl>

                  <FormControl
                    my="20px"
                    isInvalid={!!errors?.city?.message}
                  >
                    <FormLabel>Cidade</FormLabel>
                    <Select 

                        borderRadius="20px"
                        backgroundColor="#F0F0F0"
                        variant="flushed"
                        id="city"
                        {...register("city")}>
                            
                      <option value='option1'>Option 1</option>
                      <option value='option2'>Option 2</option>
                      <option value='option3'>Option 3</option>
  
                    </Select>
                    <FormErrorMessage>
                      {errors?.city?.message}
                    </FormErrorMessage>
                  </FormControl>
  
                  <Flex direction="column" justify="center" align="center" gap={4}>
                    <Button
                      borderRadius="20px"
                      p="25px"
                      w="400px"
                      type="submit"
                      backgroundColor="#21BA71"
                      color="white"
                    >
                      Postar
                    </Button>

                    <Button
                      borderRadius="20px"
                      p="25px"
                      w="400px"
                      type="submit"
                      backgroundColor="rgba(234, 65, 65, 1)"
                      color="white"
                      onClick={onClose}
                    >
                      Cancelar
                    </Button>
                  </Flex>
                </form>
              </ModalBody>
            </Box>
          </ModalContent>
        </Modal>
      </>
    );
  };
