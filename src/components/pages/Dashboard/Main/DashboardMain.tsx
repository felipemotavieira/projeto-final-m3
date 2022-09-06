import { Header } from "../Header/Header";
import { UserContext } from "../../../../context/Context";
import { useContext, useEffect } from "react";
import { Box, Image} from "@chakra-ui/react";
import ContainerPost from "../../../../ContainerPosts/ContainerPost";
import InternalAPI from "../../../../services/InternalAPI/InternalAPI";

export const DashboardMain = () => {
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
    </>
  );
};
