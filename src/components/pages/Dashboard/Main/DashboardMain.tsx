import { Header } from "../Header/Header";
import { UserContext } from "../../../../context/Context";
import { useContext, useEffect } from "react";
import {Box, UnorderedList} from "@chakra-ui/react";
import ContainerPost from "../../../../ContainerPosts/ContainerPost";
import InternalAPI from "../../../../services/InternalAPI/InternalAPI";
import { Rodape } from "../Rodape/rodape";

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
          setCityPost(response.data);
          setTimeout(() => {
            setLoading(false);
          }, 2000);
        })
        .catch((error: any) => {
          console.log(error);
        });
      return response;
    };

    if (cityId && token) {
      // cidade definida
      getPostsCity(cityId);
      // setPostsFiltered([]);
    } else {
      // sem cidade definida
      setPosts([]);
      // setPostsFiltered([]);
      setCityPost([...posts]);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  }, []);

  return (
    <>
      <Header />

      {loading ? (
        <span className="loader"></span>
      ) : postsFiltered.length > 0 ? (
        
        postsFiltered.map((post) => {
          console.log(post);
          const filterUser = users.find((user) => user.id == post.userId);
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
          const filterUser = users.find((user) => user.id == post.userId);
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
        <UnorderedList mt="150px" mr="20px" mb="20px" w="100%" max-width= "892px" h="max-content" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        {posts.map((post) => {
          let filterUser = users.find((user) => user.id == post.userId);
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
        })}
        </UnorderedList>
      ) : (
        <Box w="50vw" h="80vh" mb="auto">
          <span className="loader"></span>
        </Box>
      )}

      <Rodape/>
    </>
  );
};
