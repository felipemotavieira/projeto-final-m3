import { Header } from "../Header/Header";
import { UserContext } from "../../../../context/Context";
import { useContext, useEffect } from "react";
import { Box, Button, Image, Link, ScaleFade, Text, UnorderedList, useDisclosure } from "@chakra-ui/react";
import ContainerPost from "../../../../ContainerPosts/ContainerPost";
import InternalAPI from "../../../../services/InternalAPI/InternalAPI";
import { AiFillLinkedin, AiOutlineGithub } from 'react-icons/ai';

export const DashboardMain = () => {
  const { isOpen, onToggle } = useDisclosure()
  const {
    users,
    user,
    posts,
    getPosts,
    token,
    postsFiltered,
    setPostsFiltered,
    setPosts,
    cityPost,
    setCityPost,
    loading,
    getUsers,
    setLoading,
  } = useContext(UserContext);

  const { cityId } = user;

  useEffect(() => {
    getPosts();
    getUsers();

    const getPostsCity = async (id: string) => {
      // encontrar post de cidades
      const response = await InternalAPI.get(`/posts/`, {
        params: {
          cityId: id,
        },
      })
        .then((response) => {
          setCityPost(response.data)
          setLoading(false)
        })
        .catch((error: any) => {
          console.log(error);
          
        });
      return response;
    };

    if (cityId) {
      // cidade definida
      getPostsCity(cityId);
      setPostsFiltered([]);
    } else {
      // sem cidade definida
      setPosts([]);
      setPostsFiltered([]);
      setCityPost([...posts]);
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Header />

      {loading ? (
        <span>Carregando...</span>
      ) : postsFiltered.length > 0 ? (
        postsFiltered.map((post) => {
          console.log(post);
          const filterUser = users.find((user) => user.id === post.userId);
          return (
            <ContainerPost
              nameUser={filterUser?.name}
              id={post.id}
              title={post.title}
              message={post.description}
              photo={post.postImage}
              cidade={post.cityName}
              estado={post.state}
              photoUser={filterUser?.userPhoto}
              userId={post.userId}
            />
          );
        })
      ) : cityPost.length && token ? ( // usuario logado e com cidade
        cityPost.map((post) => {
          const filterUser = users.find((user) => user.id === post.userId);
          return (
            <ContainerPost
              nameUser={filterUser?.name}
              id={post.id}
              title={post.title}
              message={post.description}
              photo={post.postImage}
              cidade={post.cityName}
              estado={post.state}
              photoUser={filterUser?.userPhoto}
              userId={post.userId}
            />
          );
        })
      ) : posts.length > 0 ? (
        posts.map((post) => {
          let filterUser = users.find((user) => user.id === post.userId);
          return (
            <ContainerPost
              nameUser={filterUser?.name}
              id={post.id}
              title={post.title}
              message={post.description}
              photo={post.postImage}
              cidade={post.cityName}
              estado={post.state}
              photoUser={filterUser?.userPhoto}
              userId={post.userId}
            />
          );
        })
      ) : (
        <Box w="50vw" h="80vh" mb="auto">
          <Image src="./Atenção.png"></Image>
        </Box>
      )}

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
              <Box display={"flex"} justifyContent="space-between">
                <Text fontSize={["15px", "15px", "18px"]} w="130px">Felipe Vieira</Text>
                <Text fontSize={["15px", "15px", "18px"]} w="150px">Tech Lead</Text>
                <Link href='https://www.linkedin.com/in/felipe-mota-vieira-4b084a235/' isExternal>
                  <AiFillLinkedin size="30px" />
                </Link>
                <Link href='https://github.com/felipemotavieira' isExternal>
                  <AiOutlineGithub size="30px" />
                </Link>
              </Box>

              <Box display={"flex"} justifyContent="space-between">
                <Text w="130px" fontSize={["15px", "15px", "18px"]}>Jorge Kimura</Text>
                <Text w="150px" fontSize={["15px", "15px", "18px"]}>Scrum Master</Text>
                <Link href='https://www.linkedin.com/in/jorge-kimura/' isExternal>
                  <AiFillLinkedin size="30px" />
                </Link>
                <Link href='https://github.com/jorgekimura2001' isExternal>
                  <AiOutlineGithub size="30px" />
                </Link>
              </Box>

              <Box display={"flex"} justifyContent="space-between">
                <Text w="130px" fontSize={["15px", "15px", "18px"]}>Lívia Oliveira</Text>
                <Text w="150px" fontSize={["15px", "15px", "18px"]}>Quality Assurence</Text>
                <Link href='https://www.linkedin.com/in/l%C3%ADvia-silva-de-oliveira-367612227/' isExternal>
                  <AiFillLinkedin size="30px" />
                </Link>
                <Link href='https://github.com/liviabsl' isExternal>
                  <AiOutlineGithub size="30px" />
                </Link>
              </Box>

              <Box display={"flex"} justifyContent="space-between">
                <Text w="130px" fontSize={["15px", "15px", "18px"]}>Maria Belchior</Text>
                <Text w="150px" fontSize={["15px", "15px", "18px"]}>Quality Assurence</Text>
                <Link href='https://www.linkedin.com/in/maria-belchior-26434a13b/' isExternal>
                  <AiFillLinkedin size="30px" />
                </Link>
                <Link href='https://github.com/mariaritabelchior' isExternal>
                  <AiOutlineGithub size="30px" />
                </Link>
              </Box>

              <Box display={"flex"} justifyContent="space-between">
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
          <Button borderRadius="none" w="100vw" bg="rgba(33, 186, 113, 1)" _hover={{bg:"rgba(33, 186, 113, 1)"}} color="#FFF" onClick={onToggle} fontSize="15px">Todos os direitos reservados. Clique!</Button>
    </>
  );
};