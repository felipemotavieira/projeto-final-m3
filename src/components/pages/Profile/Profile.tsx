import { useContext, useEffect } from "react";
import ProfileMain from "../../../components/modals/ProfileMain/ProfileMain";
import ModalInfo from "../../modals/ModalInfo/ModalInfo";
import { UserContext } from "../../../context/Context";
import ContainerPost from "../../../ContainerPosts/ContainerPost";
import { HeaderProfile } from "../Dashboard/HeaderProfile/HeaderProfile";
import { filter, Flex, UnorderedList } from "@chakra-ui/react";
import { Rodape } from "../Dashboard/Rodape/rodape";
import { Header } from "../Dashboard/Header/Header";

export interface Idata {
  email: string;
  password: string;
  userPhoto?: string;
  name: string;
  id: number;
}

export const Profile = () => {
  const { users, user, getPosts, posts, getUsers } = useContext(UserContext);

  useEffect(() => {
    getPosts();
    getUsers();
  }, [posts, user]);

  return (
    <>
      <HeaderProfile />
      <ProfileMain />
      <UnorderedList
        display={"flex"}
        justifyContent={"center"}
        flexDirection={"column"}
        marginBottom={"50px"}
      >
        {posts.filter((post) => post.userId == user.id).length > 0 ? (
          posts
            .filter((post) => post.userId == user.id)
            .map((post) => {
              const filter = users.find((user) => {
                return user.id == post.userId;
              });
              return (
                <ContainerPost
                  key={post.id}
                  nameUser={filter?.name}
                  id={post.id}
                  title={post.title}
                  message={post.description}
                  photo={post.postImage}
                  cidade={post.cityName}
                  estado={post.state}
                  photoUser={filter?.userPhoto}
                  userId={post.userId}
                />
              );
            })
        ) : (
          <ModalInfo />
        )}
      </UnorderedList>

      <Rodape />
    </>
  );
};
