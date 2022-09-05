import { Header } from "../Header/Header";
import { UserContext } from "../../../../context/Context";
import { useContext, useEffect } from "react";
import {
  Box,
  Image,
  UnorderedList,
  
} from "@chakra-ui/react";
import ContainerPost from "../../../../ContainerPosts/ContainerPost";

export const DashboardMain = () => {
  const { users, getUsers, posts, getPosts } = useContext(UserContext);

  useEffect(() => {
    getPosts();
    getUsers();
    // eslint-disable-next-line
  }, []);

  return (
    <Box display="flex" flexDirection="column" gap={5}>
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
      </UnorderedList>
    </Box>
  );
};
