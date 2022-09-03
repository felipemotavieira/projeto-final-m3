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

interface IUserData {
  email: string;
  name: string;
  userPhoto: string;
  locations: object[];
  id: number;
}

interface ILocalData {
  cityId: string;
  state: string;
  cityName: string;
}

interface IPostData {
  postImage: string;
  title: string;
  description: string;
  localization: ILocalData;
  category: null;
  likes: null;
  saved: null;
  comments: null;
  userId: number;
  id?: number;
}

interface IUsers {
  email: string;
  name: string;
  userPhoto: string;
  locations: object[];
  id: number;
}

interface IUserId {
  email: string;
  name: string;
  userPhoto: string;
  locations: object[];
  id: number;
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
  localization: ILocal;
  category: null;
  likes: null;
  saved: null;
  comments: null;
  userId: number;
  id?: number;
}

interface IUserProviderData {
  user: IUser;
  users: IUsers[];
  userId: IUserId;
  getUsers: () => Promise<any>;
  getUserId: () => Promise<any>;
  patchUser: (data: IUserData) => Promise<boolean>;
  deleteUser: () => Promise<any>;
  onSubmitRegister: (data: ISubmitData) => Promise<boolean>;
  onSubmitLogin: (data: ILoginData) => Promise<boolean>;
  posts: IPosts[];
  getPosts: () => Promise<any>;
  getPostsId: () => Promise<any>;
  patchPost: (data: IPostData) => Promise<boolean>;
  deletePost: () => Promise<any>;
}

export const UserContext = createContext<IUserProviderData>(
  {} as IUserProviderData
);

export const Context = ({ children }: IContextProviderProps) => {
  const [user, setUser] = useState<IUsers>({} as IUsers);
  const [userId, setUserId] = useState<IUserId>({} as IUserId);
  const [users, setUsers] = useState<IUsers[]>([]);
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
    const response = await InternalAPI.get(`/posts`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return response;
  };

  const getPostsId = async () => {
    const userId = localStorage.getItem("@USERID");
    const response = await InternalAPI.get(`/posts?userId=${userId}`)
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return response;
  };

  const getUsers = async () => {
    const response = await InternalAPI.get(`/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return response;
  };

  const getUserId = async () => {
    const userId = localStorage.getItem("@USERID");
    const response = await InternalAPI.get(`/users/${userId}`)
      .then((response) => {
        setUserId(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return response;
  };

  const patchUser = async (data: IUserData | boolean) => {
    const userId = localStorage.getItem("@USERID");
    const response = await InternalAPI.patch(`/users/${userId}`, data)
      .then(() => true)
      .catch(() => false);
    return response;
  };

  const deleteUser = async () => {
    const userId = localStorage.getItem("@USERID");
    const response = await InternalAPI.delete(`/users/${userId}`)
      .then(() => true)
      .catch(() => false);
    return response;
  };

  const patchPost = async (data: IPostData | boolean) => {
    const userId = localStorage.getItem("@USERID");
    const response = await InternalAPI.patch(`/posts/${userId}`, data)
      .then(() => true)
      .catch(() => false);
    return response;
  };

  const deletePost = async () => {
    const userId = localStorage.getItem("@USERID");
    const response = await InternalAPI.delete(`/posts/${userId}`)
      .then(() => true)
      .catch(() => false);
    return response;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        users,
        userId,
        getUsers,
        getUserId,
        patchUser,
        deleteUser,
        onSubmitRegister,
        onSubmitLogin,
        posts,
        getPosts,
        getPostsId,
        patchPost,
        deletePost,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
