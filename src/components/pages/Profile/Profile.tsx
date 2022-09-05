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
  const { user } = useContext(UserContext);
  
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
  });
 
  return (
    <>
      <Header/>
      <ProfileMain data={data} />
      
      <ModalInfo />
      
      <ContainerPost id= {1} title="Olá" message="The quick brown fox jumps over the lazy dog is an
              English-language sentence that contains all of the
              letters of the English alphabet. Owing to its existence, Chakra
              was created." 
              photo="https://veja.abril.com.br/wp-content/uploads/2019/12/amazonia-floresta-coraccca7ao.jpg.jpg"
              localization="Manaus-Amazona"
              />
    </>
  );
};
