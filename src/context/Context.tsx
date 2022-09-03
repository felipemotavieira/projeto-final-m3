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

interface IUsersId {
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
  usersId: IUsersId;
  getUsers: () => Promise<any>;
  getUsersId: () => Promise<any>;
  patchUser: (data: IUserData) => Promise<boolean>;
  deleteUser: () => Promise<any>;
  onSubmitRegister: (data: ISubmitData) => Promise<boolean>;
  onSubmitLogin: (data: ILoginData) => Promise<boolean>;
  posts: IPosts[];
  getPosts: () => Promise<any>;
  getPostsId: () => Promise<any>;
  patchPost: (data: IPostData) => Promise<boolean>;
  deletePost: () => Promise<any>;
  token: string | null;
}

export const UserContext = createContext<IUserProviderData>(
  {} as IUserProviderData
);

export const Context = ({ children }: IContextProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [usersId, setUsersId] = useState<IUsersId>({} as IUsersId);
  const [users, setUsers] = useState<IUsers[]>([]);
  const [posts, setPosts] = useState<IPosts[]>([]);
  const token = localStorage.getItem("@TOKEN");
  const userId = localStorage.getItem("@USERID");

  useEffect(() => {
    token &&
      InternalAPI.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          console.log(response);
          setUser(response.data);
        })
        .catch((error: any) => {
          console.log(error);
        });
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
        setUser(response.data.user);
        localStorage.setItem("@TOKEN", response.data.accessToken);
        localStorage.setItem("@USERID", response.data.user.id);
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

  const getUsersId = async () => {
    const userId = localStorage.getItem("@USERID");
    const response = await InternalAPI.get(`/users/${userId}`)
      .then((response) => {
        setUsersId(response.data);
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
        usersId,
        getUsers,
        getUsersId,
        patchUser,
        deleteUser,
        onSubmitRegister,
        onSubmitLogin,
        posts,
        getPosts,
        getPostsId,
        patchPost,
        deletePost,
        token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
