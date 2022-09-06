import { SetStateAction, useContext, useEffect, useState } from "react";
import ProfileMain from "../../../components/modals/ProfileMain/ProfileMain";
import ModalInfo from "../../modals/ModalInfo/ModalInfo";
import InternalAPI from "../../../services/InternalAPI/InternalAPI";
import { UserContext } from "../../../context/Context";
import { Header } from "../Dashboard/Header/Header";
import ContainerPost from "../../../ContainerPosts/ContainerPost";

export interface Idata {
  email: string;
  password: string;
  userPhoto?: string;
  name: string;
  id: number;
}

export const Profile = () => {
  const [data, setData] = useState<Idata>({} as Idata);
  const { users, user, getPosts, posts, getUsers } = useContext(UserContext);

  useEffect(() => {
    getPosts();
    getUsers();
  }, []);

  useEffect(() => {
    let token = localStorage.getItem("@TOKEN");
    token
      ? InternalAPI.get(`/users/${user.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response: { data: SetStateAction<Idata> }) =>
            setData(response.data)
          )
          .catch((error: any) => {
            console.log(error);
          })
      : localStorage.clear();
  }, []);

  return (
    <>
      <Header />
      <ProfileMain data={data} />

      {posts ? (
        posts
          .filter((post) => post.userId === user.id)
          .map((post) => {
            let filter = users.find((user) => user.id === post.userId);
            return (
              <ContainerPost
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
