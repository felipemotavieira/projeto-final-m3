import { Header } from "../Header/Header";
import { UserContext } from "../../../../context/Context";
import React, { useContext, useEffect, useState } from "react";
import {
  Box, Button, Collapse, Fade, Heading, ScaleFade, Slide, useDisclosure
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
  const { isOpen, onToggle } = useDisclosure()
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
  return (
    <Box>
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
      
      <Fade in={isOpen}>
          <Box
            display="flex" 
            flexDirection="column"
            alignItems="center" 
            justifyContent="center"
            zIndex={10}
            w="100vw"
            h="max-content"
            color='white'
            mt='4'
            bg='rgba(33, 186, 113, 1)'
            rounded='md'
            shadow='md'
          >
            <div>
              <p>Felipe Vieira</p>
              <p>Tech Lead</p>
            </div>
            
            <div>
              <p>Jorge Kimura</p>
              <p>Scrum Master</p>
            </div>

            <div>
              <p>Lívia Oliveira</p>
              <p>Quality Assurance</p>
            </div>

            <div>
              <p>Maria Belchior</p>
              <p>Quality Assurance</p>
            </div>

            <div>
              <p>Naiane Reis</p>
              <p>Quality Assurance</p>
            </div>
          </Box>
        </Fade>
      <Box gap={5} h="50px" mt="auto" display="flex" alignItems="center" justifyContent="center" bg="rgba(33, 186, 113, 1)">
        Todos os direitos reservados
        <Button _hover={{ bg: "#4ac087" }} bg="#21a968" h="20px" fontSize="15px" p="5px" onClick={onToggle}>Visualizar/Fechar</Button>
        
      </Box>
      
        
    </Box>


    
  );
};



