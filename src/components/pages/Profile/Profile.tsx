import { SetStateAction, useContext, useEffect, useState } from "react";
import ProfileMain from "../../../components/modals/ProfileMain/ProfileMain";
import ModalInfo from "../../modals/ModalInfo/ModalInfo";
import InternalAPI from "../../../services/InternalAPI/InternalAPI";
import { UserContext } from "../../../context/Context";

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
      <div>Header em construção </div>
      <ProfileMain data={data} />
      <ModalInfo />
    </>
  );
};
