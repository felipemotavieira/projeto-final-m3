import { SetStateAction, useContext, useEffect, useState } from "react";
import ProfileMain from "../../../components/modals/ProfileMain/ProfileMain";
import ModalInfo from "../../modals/ModalInfo/ModalInfo";
import InternalAPI from "../../../services/InternalAPI/InternalAPI";
import { UserContext } from "../../../context/Context";
import ContainerPost from "../../../ContainerPosts/ContainerPost";
import { HeaderProfile } from "../Dashboard/Header-profile/Header";
import NoPhoto from "../../../assets/no-photo.png";
import { filter } from "@chakra-ui/react";

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
  }, []);

//  const filtered = posts.filter(post => post.userId == user.id)

  return (
    <>
      <HeaderProfile />
      <ProfileMain  />

      {
        posts.filter((post) => post.userId == user.id).length > 0 ? (
        posts
          .filter((post) => post.userId == user.id)
          .map((post) => {
            const filter = users.find((user) => {
              return user.id == post.userId
            });
              return (
                <ContainerPost key={post.id}
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
    </>
  );
};
