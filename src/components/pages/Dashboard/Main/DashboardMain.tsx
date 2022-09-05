import { Header } from "../Header/Header";
import { UserContext } from "../../../../context/Context";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
} from "@chakra-ui/react";
import InternalAPI from "../../../../services/InternalAPI/InternalAPI";
import { useNavigate } from "react-router-dom";

interface IPostData {
  postImage: string;
  title: string;
  description: string;
  cityId: string;
  state: string;
  cityName: Promise<string> | string;
  category: null;
  likes: null;
  saved: null;
  comments: null;
  userId?: string;
  id?: string;
}

// import { ButtonsModal } from "../../../ButtonsModal/ButtonsModal";

export const DashboardMain = () => {
  const { users, user, posts, getPosts, token, postsFiltered, setPostsFiltered, setPosts, cityPost, setCityPost, loading, setLoading } = useContext(UserContext)

  const {cityId} = user

  useEffect(()=> {

    getPosts()
   
    const getPostsCity = async (id: string) => { // encontrar post de cidades
      const response = await InternalAPI.get(`/posts/`, {
        params:{
          cityId: id
        }
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

    if(cityId){ // cidade definida
      getPostsCity(cityId)
      setPostsFiltered([])
    } 
    else{ // sem cidade definida 
        setPosts([])
        setPostsFiltered([])
        setCityPost([...posts])
      setLoading(false)
    }
  },[])

  const navigate = useNavigate();

  const handleToProfile = () => {
    navigate("/profile", { replace: true });
  };

  return (
    <Box>
      <>
      {/* fazer verificação se o token existe se existe faz o headerLogin se não faz o Header (sem login) */}
      <Header />
      
      { 
        loading ? <span>Carregando...</span> 
        :      
        postsFiltered.length > 0 ?
        postsFiltered.map(post => {
          console.log(post)
          const filterUser = users.find((user) => user.id === post.userId);
          return <div key={post.id}>
            <img src={post.postImage} alt="Imagem da postagem" />
            <img src={filterUser?.userPhoto} alt="Foto de perfil" />
            <h3>{filterUser?.name}</h3>
            <h3>{post.title}</h3>
            <h3>{post.description}</h3>
            <h3><>
            {post.cityName} - {post.state}
            </>
            </h3>
        </div>}) 
        :
        cityPost.length && token ?  // usuario logado e com cidade 
        cityPost.map(post => {
          const filterUser = users.find((user) => user.id === post.userId);
          return <div key={post.id}>
            <img src={post.postImage} alt="Imagem da postagem" />
            <img src={filterUser?.userPhoto} alt="Foto de perfil" />
            <h3>{filterUser?.name}</h3>
            <h3>{post.title}</h3>
            <h3>{post.description}</h3>
            <h3><>
            {post.cityName} - {post.state}
            </>
            </h3>
        </div>}) 
        : 
        posts.map(post => { // usuario deslogado ou usario logado e sem cidade
          const filterUser = users.find((user) => user.id === post.userId);
          return <div key={post.id}>
            <img src={post.postImage} alt="Imagem da postagem" />
            <img src={filterUser?.userPhoto} alt="Foto de perfil" />
            <h3>{filterUser?.name}</h3>
            <h3>{post.title}</h3>
            <h3>{post.description}</h3>
            <h3><>
            {post.cityName} - {post.state}
            </>
            </h3>
        </div>}) 
      } 
      </>
      <>
      </>
    {/* <Box display="flex" flexDirection="column" gap={5}>
      <Header />

      <UnorderedList
        gap={5}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        margin="0px"
      >
        {posts.length > 0 ? (
          posts.map((post) => (
            <ListItem
              borderRadius="20px"
              listStyleType="none"
              backgroundColor="#fff"
              w={["100%", "85%", "75%", "60%"]}
              h="max-content"
              display="flex"
              justifyContent="start"
              alignItems="center"
            >
              <Box
                display="flex"
                alignItems="center"
                gap={10}
                flexDirection="row"
                w="95%"
              >
                <Image
                  borderRadius="20px 0 0px 20px"
                  w={[0, 0, "50%"]}
                  h={[0, 0, "350px"]}
                  src={post.postImage}
                ></Image>

                <Box display="flex" flexDirection="column" gap={3}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    alignItems="center"
                    gap={5}
                  >
                    <Image
                      w="15%"
                      h="100%"
                      borderRadius="100%"
                      src={"imagem user"}
                    ></Image>
                    <Box>
                      <Heading as="h1" fontSize="20px">
                        {"nome"}
                      </Heading>
                      <Heading as="h3" fontSize={["20px", "20px", "0"]}>
                        {"cidade"}-{"estado"}
                      </Heading>
                    </Box>
                  </Box>

                  <Image
                    borderRadius="20px"
                    w={["100%", "100%", 0]}
                    h={["100%", "100%", 0]}
                    src={post.postImage}
                  ></Image>

                  <Heading as="h2" size="sm">
                    {post.title}
                  </Heading>
                  <Text>{post.description}</Text>
                  <Heading as="h3" fontSize={[0, 0, "20px"]}>
                    {"cidade"}-{"estado"}
                  </Heading>
                </Box>
              </Box>
            </ListItem>
          ))
        ) : (
          <Box w="50vw" h="80vh" mb="auto">
            <Image src="./Atenção.png"></Image>
          </Box>
        )}
      </UnorderedList> */}
    </Box>
  );
};
