import { createContext, useState } from "react";
import * as UserActions from "./actions/user-action";
import Cookies from "js-cookie"; 


export const UserContext = createContext();

export default function UserProvider({ children }) {
  const [loading, setLoading] = useState(false);

  function addUser(newValues) {
    setLoading(true);
    return UserActions.addUser(newValues)
      .then((newUser) => {
        setLoading(false);
        return newUser;
      })
      .catch((err) => {
        setLoading(false);
        throw err;
      });
  }

  function loginUser(credentials) {
    setLoading(true);
    return UserActions.loginUser(credentials)
      .then((response) => {
        const { token } = response;
        Cookies.set("JWT", token, { expires: 0.5, secure: true, sameSite: "strict" }); 
        setLoading(false);
        return response;
      })
      .catch((err) => {
        setLoading(false);
        throw err;
      });
  }

  return (
    <UserContext.Provider value={{ addUser, loginUser, loading }}>
      {children}
    </UserContext.Provider>
  );
}





