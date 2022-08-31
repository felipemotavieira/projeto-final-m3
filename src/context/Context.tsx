import { ReactNode, useEffect, useState } from "react";

interface IContextProviderProps {
  children: ReactNode;
}

interface IUser {
  id: string;
  name: string;
  email: string;
  course_module: string;
  bio: string;
  contact: string;
  created_at: string;
  updated_at: string;
  techs: Array<Object>;
  works: Array<Object>;
  avatar_url: string;
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
      ? api
          .get("/profile", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((response) => {
            setUser(response.data);
          })
          .catch((error) => {
            console.log(error);
          })
      : localStorage.clear();
  }, []);

  const onSubmitRegister = async (data: ISubmitData | boolean) => {
    const response = await api
      .post("/users", data)
      .then(() => true)
      .catch(() => false);
    return response;
  };

  const onSubmitLogin = async (data: ILoginData | boolean) => {
    const response = await api
      .post("/sessions", data)
      .then((response) => {
        setUser(response.data.user);
        localStorage.setItem("@TOKEN", response.data.token);
        localStorage.setItem("@USERID", response.data.user.id);
        return true;
      })
      .catch((error) => {
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
