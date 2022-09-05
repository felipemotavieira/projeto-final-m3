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
  const { user, getPostsId ,posts } = useContext(UserContext);

  useEffect(() =>{
    getPostsId()
  },[])

  console.log(posts)
  console.log(user,"haushu")
  
  useEffect(() => {
    let token = localStorage.getItem("@TOKEN");
    token?
    InternalAPI.get(`/users/${user.id}`, 
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response: { data: SetStateAction<Idata> }) => setData(response.data))
      .catch((error: any) => {console.log(error)
      })
      : localStorage.clear();
  },[]);
 
  return (
    <>
      <Header/>
      <ProfileMain data={data} />
      
      
      {
        posts ? posts.map(ele=> 
          <ContainerPost 
          photoUser={user.userPhoto}
          nameUser={user.name}
          id = {ele.id} 
          title={ele.title} 
          message = {ele.description}
          photo={ele.postImage}
          cidade= {ele.cityName}
          estado ={ele.state}
          /> )
          :
          <ModalInfo />

      }
      
      
    </>
  );
};
