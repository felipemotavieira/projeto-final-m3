import { createContext, ReactNode, useState } from "react";

interface IChildren {
    children : ReactNode
  }

interface IContext {
    isOpenModalLogin: boolean;
    setIsOpenModalLogin: (active: boolean) => void;

    isOpenModalRegister: boolean;
    setIsOpenModalRegister: (active: boolean) => void;
}


export const Context = createContext<IContext>({} as IContext);


export const ContextProvider = ({children}:IChildren) => {
    const [isOpenModalLogin, setIsOpenModalLogin] = useState(false)
    const [isOpenModalRegister, setIsOpenModalRegister] = useState(false)

    return (
        <Context.Provider value={{setIsOpenModalLogin, setIsOpenModalRegister, isOpenModalLogin, isOpenModalRegister}}>
            {children}
        </Context.Provider>
    )

};