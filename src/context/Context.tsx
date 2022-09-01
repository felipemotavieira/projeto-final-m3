import { createContext, ReactNode, useEffect, useState } from "react";
import InternalAPI from "../services/InternalAPI/InternalAPI";

interface IContextProviderProps {
  children: ReactNode;
}

interface ISubmitData {
  email: string;
  password: string;
  name: string;
}

interface ILoginData {
  email: string;
  password: string;
}

interface IUser {
  email: string;
  name: string;
  userPhoto: string;
  locations: object[];
  id: number;
}

interface IUserProviderData {
  user: IUser;
  onSubmitRegister: (data: ISubmitData) => Promise<boolean>;
  onSubmitLogin: (data: ILoginData) => Promise<boolean>;
}

export const UserContext = createContext<IUserProviderData>(
  {} as IUserProviderData
);

export const Context = ({ children }: IContextProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);

  useEffect(() => {
    let token = localStorage.getItem("@TOKEN");
    token
      ? InternalAPI.get("/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => setUser(response.data))
          .catch((error: any) => {
            console.log(error);
          })
      : localStorage.clear();
  }, []);

  const onSubmitRegister = async (data: ISubmitData | boolean) => {
    const response = await InternalAPI.post("/register", data)
      .then(() => true)
      .catch(() => false);
    return response;
  };

  const onSubmitLogin = async (data: ILoginData | boolean) => {
    const response = await InternalAPI.post("/login", data)
      .then((response) => {
        setUser(response.data);
        localStorage.setItem("@TOKEN", response.data);
        localStorage.setItem("@USERID", response.data);
        return true;
      })
      .catch((error: any) => {
        console.log(error);
        return false;
      });
    return response;
  };

  return (
    <UserContext.Provider value={{ user, onSubmitRegister, onSubmitLogin }}>
      {children}
    </UserContext.Provider>
  );
};

export default Context;
