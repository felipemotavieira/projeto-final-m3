import { Header } from "../Header/Header";
import { UserContext } from "../../../../context/Context";
import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  
} from "@chakra-ui/react";
import InternalAPI from "../../../../services/InternalAPI/InternalAPI";

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

export const DashboardMain = () => {
  const { users, user, posts, getPosts, token, postsFiltered, setPostsFiltered, setPosts } = useContext(UserContext)
  const [cityPost, setCityPost] = useState<IPostData[]>([]) 
  const [loading, setLoading] = useState<boolean>(true)

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
          setPostsFiltered([])
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
    } 
    else{ // sem cidade definida 
      if(postsFiltered.length > 0){
        setCityPost([])
        setPosts([])
      }
      else{
        setCityPost([...posts])
      }
      setLoading(false)
    }
  },[])

  console.log(cityPost)
  console.log(posts)

  return (
    <Box>
      <>
      {/* fazer verificação se o token existe se existe faz o headerLogin se não faz o Header (sem login) */}
      <Header />
      { // não esta renderizando a postagens pesquisadas !! -- talvez seja preciso tirar vou falar com o Vilson
        postsFiltered.length > 0 && 
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
      }
      { 
        loading ? <span>Carregando...</span> 
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
    </Box>
  );
};
