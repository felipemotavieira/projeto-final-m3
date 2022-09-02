import {  Box, Heading, Image, ListItem, UnorderedList, Text } from "@chakra-ui/react";

export const DashboardMain = () => {
  return (
  <>
  
  <UnorderedList display="flex" justifyContent="center" margin="0px">
    <ListItem borderRadius="20px" listStyleType="none" backgroundColor="#fff" w={["100%","85%","75%","60%"]} h="max-content" display="flex" justifyContent="start" alignItems="center">
      <Box display="flex" alignItems="center"  gap={10} flexDirection="row" w="95%" >
        <Image borderRadius="20px 0 0px 20px" w={[0,0,"50%"]} h={[0,0,"350px"]} src="./imagemTeste.jpg"></Image>

        <Box display="flex" flexDirection="column" gap={3}> 
          <Box display="flex" flexDirection="row" alignItems="center" gap={5}>
            <Image w="15%" h="100%" borderRadius="100%" src="./perfilTeste.png"></Image>
            <Box>
              <Heading as='h1' fontSize="20px">Justin Bieber</Heading>
              <Heading as='h3' fontSize={["20px","20px","0"]}>Manaus-AM</Heading>
            </Box>
          </Box>

          <Image borderRadius="20px" w={["100%","100%",0]} h={["100%","100%",0]} src="./imagemTeste.jpg"></Image>

          <Heading as='h2' size='sm'>Cidade muito quente</Heading>
          <Text> Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat obcaecati harum quas, alias aut vero? Voluptatem veritatis repudiandae, mollitia consequatur aperiam repellendus tempore eveniet eligendi. Perspiciatis ad nemo omnis veniam?</Text>
          <Heading as='h3' fontSize={[0,0,"20px"]} >Manaus-AM</Heading>
        </Box>
      </Box>
    </ListItem>
  </UnorderedList>
  </>
  )

};
