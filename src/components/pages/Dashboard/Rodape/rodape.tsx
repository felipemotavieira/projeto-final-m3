import { Box, Button, Link, ScaleFade, Text, useDisclosure } from "@chakra-ui/react"
import { AiFillLinkedin, AiOutlineGithub } from "react-icons/ai";
export const Rodape = () =>{
    const { isOpen, onToggle } = useDisclosure();

    return(
        <Box position="fixed" bottom={0}>
            <ScaleFade initialScale={0.9} in={isOpen}>
              <Box
                
                color='white'
                mt='0'
                w="100vw"
                borderRadius="20px 20px 0 0"
                bg="rgba(33, 186, 113, 1)"
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                alignItems="center"
                p="10px"
                
              >
                <Box w={["100%", "100%", "70%"]} gap={5} >
                  
                <Box display={"flex"} justifyContent="space-between" transition="0.5s" borderRadius="10px" _hover={{bg:"#1bd279"}}>
                  <Text fontSize={["15px", "15px", "18px"]} w="130px">Felipe Vieira</Text>
                  <Text fontSize={["15px", "15px", "18px"]} w="150px">Tech Lead</Text>
                  <Link href='https://www.linkedin.com/in/felipe-mota-vieira-4b084a235/' isExternal>
                    <AiFillLinkedin size="30px" />
                  </Link>
                  <Link href='https://github.com/felipemotavieira' isExternal>
                    <AiOutlineGithub size="30px" />
                  </Link>
                </Box>

                <Box display={"flex"} justifyContent="space-between" transition="0.5s" borderRadius="10px" _hover={{bg:"#1bd279"}}>
                  <Text w="130px" fontSize={["15px", "15px", "18px"]}>Jorge Kimura</Text>
                  <Text w="150px" fontSize={["15px", "15px", "18px"]}>Scrum Master</Text>
                  <Link href='https://www.linkedin.com/in/jorge-kimura/' isExternal>
                    <AiFillLinkedin size="30px" />
                  </Link>
                  <Link href='https://github.com/jorgekimura2001' isExternal>
                    <AiOutlineGithub size="30px" />
                  </Link>
                </Box>

                <Box display={"flex"} justifyContent="space-between" transition="0.5s" borderRadius="10px" _hover={{bg:"#1bd279"}}>
                  <Text w="130px" fontSize={["15px", "15px", "18px"]}>Lívia Oliveira</Text>
                  <Text w="150px" fontSize={["15px", "15px", "18px"]}>Quality Assurence</Text>
                  <Link href='https://www.linkedin.com/in/l%C3%ADvia-silva-de-oliveira-367612227/' isExternal>
                    <AiFillLinkedin size="30px" />
                  </Link>
                  <Link href='https://github.com/liviabsl' isExternal>
                    <AiOutlineGithub size="30px" />
                  </Link>
                </Box>

                <Box display={"flex"} justifyContent="space-between" transition="0.5s" borderRadius="10px" _hover={{bg:"#1bd279"}}>
                  <Text w="130px" fontSize={["15px", "15px", "18px"]}>Maria Belchior</Text>
                  <Text w="150px" fontSize={["15px", "15px", "18px"]}>Quality Assurence</Text>
                  <Link href='https://www.linkedin.com/in/maria-belchior-26434a13b/' isExternal>
                    <AiFillLinkedin size="30px" />
                  </Link>
                  <Link href='https://github.com/mariaritabelchior' isExternal>
                    <AiOutlineGithub size="30px" />
                  </Link>
                </Box>

                <Box display={"flex"} justifyContent="space-between" transition="0.5s" borderRadius="10px" _hover={{bg:"#1bd279"}}>
                  <Text w="130px" fontSize={["15px", "15px", "18px"]}>Naiane Reis</Text>
                  <Text w="150px" fontSize={["15px", "15px", "18px"]}>Product Owner</Text>
                  <Link href='https://www.linkedin.com/in/naianereis/' isExternal>
                    <AiFillLinkedin size="30px" />
                  </Link>
                  <Link href='https://github.com/NaianeReis27' isExternal>
                    <AiOutlineGithub size="30px" />
                  </Link>
                </Box>
              </Box>
            </Box>

              </ScaleFade>
            <Button
              borderRadius="none"
              w="100vw"
              bg="rgba(33, 186, 113, 1)"
              _hover={{ bg: "rgba(33, 186, 113, 1)" }}
              color="#FFF"
              onClick={onToggle}
              fontSize="15px"
            >
              Todos os direitos reservados. Clique!
            </Button>
          </Box>
    )
}