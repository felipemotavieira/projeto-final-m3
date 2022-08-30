import { useContext } from "react";
import { Context } from "../../../context/Context";

export const LandingPage = () => {
  
  const {
    setIsOpenModalLogin,
    setIsOpenModalRegister,
    isOpenModalLogin,
    isOpenModalRegister,
  } = useContext(Context);
  console.log(isOpenModalLogin);
  return (
    <div className="App">
      <h1>teste</h1>
      <button onClick={() => setIsOpenModalLogin(true)}>login</button>
      <button onClick={() => setIsOpenModalRegister(true)}>register</button>

      {isOpenModalLogin && <h1>true LOGIN</h1>}

      {isOpenModalRegister && <h1>true REGISTER</h1>}
    </div>
  );
};
