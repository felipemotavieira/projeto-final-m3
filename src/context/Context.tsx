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

interface ILocal {
  cityId: string;
  state: string;
  cityName: string;
}

interface IPosts {
  postImage: string;
  title: string;
  description: string;
  localization: ILocal[];
  category: null;
  likes: null;
  saved: null;
  comments: null;
  userId: number;
  id?: number;
}

interface IUserProviderData {
  user: IUser;
  posts: IPosts[];
  getPosts: () => Promise<any>;
  onSubmitRegister: (data: ISubmitData) => Promise<boolean>;
  onSubmitLogin: (data: ILoginData) => Promise<boolean>;
}

export const UserContext = createContext<IUserProviderData>(
  {} as IUserProviderData
);

export const Context = ({ children }: IContextProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [posts, setPosts] = useState<IPosts[]>([]);

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
    console.log(data);
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

  const getPosts = async () => {
    const response = await InternalAPI.get("/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return response;
  };

  return (
    <UserContext.Provider
      value={{ user, posts, getPosts, onSubmitRegister, onSubmitLogin }}
    >
      {children}
    </UserContext.Provider>
  );
};
