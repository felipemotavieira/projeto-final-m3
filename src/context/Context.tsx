import { useDisclosure } from "@chakra-ui/react";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
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
  cityId: string;
  state: string;
  cityName: string;
  id: string;
}

interface IPostData {
  postImage: string;
  title: string;
  description: string;
  cityId: string;
  state: string;
  cityName: Promise<string> | string;
  category: null;
  likes: null;
  saved: null;
  comments: null;
  userId?: string;
  id?: string;
}

interface IUsers {
  email: string;
  name: string;
  userPhoto: string;
  cityId: string;
  state: string;
  cityName: string;
  id: string;
}

interface IUsersId {
  email: string;
  name: string;
  userPhoto: string;
  cityId: string;
  state: string;
  cityName: string;
  id: string;
}

interface IUser {
  email: string;
  name: string;
  userPhoto: string;
  cityId: string;
  state: string;
  cityName: string;
  id: string;
}

interface IPosts {
  postImage: string;
  title: string;
  description: string;
  cityId: string;
  state: string;
  cityName: Promise<string> | string;
  category: null;
  likes: null;
  saved: null;
  comments: null;
  id?: string;
  userId: string;
}

interface IUserProviderData {
  user: IUser;
  users: IUsers[];
  usersId: IUsersId;
  getUsers: () => Promise<any>;
  getUsersId: (id: number) => Promise<any>;
  patchUser: (data: IUserData) => Promise<boolean>;
  deleteUser: () => Promise<any>;
  onSubmitRegister: (data: ISubmitData) => Promise<boolean>;
  onSubmitLogin: (data: ILoginData) => Promise<boolean>;
  onSubmitLoginDash: (data: ILoginData) => Promise<boolean>;
  posts: IPosts[];
  getPosts: () => Promise<any>;
  getPostsId: () => Promise<any>;
  patchPost: (data: IPostData | boolean, id: string) => Promise<boolean>;
  addPost: (data: IPostData) => Promise<boolean>;
  deletePost: (id: string) => Promise<any>;
  token: string | null;
  searchCityPost: (id: string) => void;
  postsFiltered: IPosts[];
  setPostsFiltered: Dispatch<SetStateAction<IPosts[]>>;
  setPosts: Dispatch<SetStateAction<IPosts[]>>;
  cityPost: IPostData[];
  setCityPost: Dispatch<SetStateAction<IPostData[]>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  // getPostsCity: (id: string) => void;
}

export const UserContext = createContext<IUserProviderData>(
  {} as IUserProviderData
);

export const Context = ({ children }: IContextProviderProps) => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [usersId, setUsersId] = useState<IUsersId>({} as IUsersId);
  const [users, setUsers] = useState<IUsers[]>([]);
  const [posts, setPosts] = useState<IPosts[]>([]);
  const [postsFiltered, setPostsFiltered] = useState<IPosts[]>([]);
  const [cityPost, setCityPost] = useState<IPostData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = localStorage.getItem("@TOKEN");
  const userId = localStorage.getItem("@USERID");

  useEffect(() => {
    //autologin

    token &&
      InternalAPI.get(`/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          setUser(response.data);
          if (response.data.cityId) {
            const getPostsCity = async (id: string) => {
              // encontrar post de cidades
              const response = await InternalAPI.get(`/posts/`, {
                params: {
                  cityId: id,
                },
              })
                .then((response) => {
                  setCityPost(response.data);
                  setLoading(false);
                })
                .catch((error: any) => {
                  console.log(error);
                  setLoading(false);
                });
              return response;
            };

            if (response.data.cityId) {
              // cidade definida
              getPostsCity(response.data.cityId);
              setPostsFiltered([]);
            } else {
              // sem cidade definida
              setPosts([]);
              setPostsFiltered([]);
              setCityPost([...posts]);
              setLoading(false);
            }
          }
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

  const onSubmitLoginDash = async (data: ILoginData | boolean) => {
    const response = await InternalAPI.post("/login", data)
      .then((response) => {
        setUser(response.data.user);
        localStorage.setItem("@TOKEN", response.data.accessToken);
        localStorage.setItem("@USERID", response.data.user.id);
        window.location.reload()
        return true;
      })
      .catch((error: any) => {
        console.log(error);
        return false;
      });
    return response;
  };

  const getPosts = async () => {
    // listar todos os posts
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
    // encontrar posts do usuário
    const userId = localStorage.getItem("@USERID");
    const response = await InternalAPI.get(`/posts`, {
      params: {
        userId: userId,
      },
    })
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return response;
  };

  // função para pesquisar cidade
  const searchCityPost = (id: string) => {
    getPosts();
    const cityFilter = posts.filter((post) => post.cityId == id); // [] ou [{...}, {...}]
    setPostsFiltered(cityFilter);
  };

  const getUsers = async () => {
    // listar usuarios
    const response = await InternalAPI.get(`/users`)
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return response;
  };

  const getUsersId = async (id: number) => {
    const response = await InternalAPI.get(`/users/${id}`)
      .then((response) => {
        setUsersId(response.data);
      })
      .catch((error: any) => {
        console.log(error);
      });
    return response;
  };

  // // editar info de usuário
  const patchUser = async (data: IUser | boolean) => {
    InternalAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await InternalAPI.patch(`users/${userId}`, data)
      .then(() => true)
      .catch(() => false);
    return response;
  };

  // deletar usuario
  const deleteUser = async () => {
    InternalAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await InternalAPI.delete(`/users/${userId}`)
      .then(() => true)
      .catch(() => false);
    return response;
  };

  // fazer nova postagem
  const addPost = async (data: IPostData | boolean) => {
    const token = localStorage.getItem("TOKEN");
    InternalAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await InternalAPI.post(`/posts/`, data) // adicionar post
      .then(() => true)
      .catch(() => false);
    return response;
  };

  //editar post
  const patchPost = async (data: IPostData | boolean, id: string) => {
    const token = localStorage.getItem("TOKEN");
    InternalAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await InternalAPI.patch(`/posts/${id}`, data)
      .then(() => true)
      .catch(() => false);
    return response;
  };

  // Deletar post
  const deletePost = async (id: string) => {
    const token = localStorage.getItem("TOKEN");
    InternalAPI.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await InternalAPI.delete(`posts/${id}`)
      .then(() => true)
      .catch(() => false);
    return response;
  };

  // procurar se o usuario tem cidades

  useEffect(() => {
    const { cityId } = user;
    if (cityId) {
      const getPostsCity = async (id: string) => {
        // encontrar post de cidades
        const response = await InternalAPI.get(`/posts/`, {
          params: {
            cityId: id,
          },
        })
          .then((response) => {
            setCityPost(response.data);
            setLoading(false)
            window.location.reload()
          })
            .catch((error: any) => {
              console.log(error);
              setLoading(false)
    
            });
          return response;
        }; 
      
        if(cityId){ // cidade definida
          getPostsCity(cityId)
          setPostsFiltered([])
        } 
        else{ // sem cidade definida 
            setPosts([])
            setPostsFiltered([])
            setCityPost([...posts])
            setLoading(false)
        }
    }
  }, []);

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
        onSubmitLoginDash,
        getPosts,
        posts,
        getPostsId,
        patchPost,
        deletePost,
        addPost,
        token,
        searchCityPost,
        postsFiltered,
        setPostsFiltered,
        setPosts,
        setCityPost,
        cityPost,
        loading,
        setLoading,

      }}
    >
      {children}
    </UserContext.Provider>
  );
};
