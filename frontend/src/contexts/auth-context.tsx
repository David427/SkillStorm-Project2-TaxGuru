import type { User } from "../types";

import {
  Dispatch,
  useState,
  useEffect,
  useContext,
  createContext,
  SetStateAction,
} from "react";

import Cookies from "js-cookie";

interface Authorization {
  jwt: string | null;
  user: User | null;
  username: string | null;
  setJwt: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  setUsername: Dispatch<SetStateAction<string | null>>;
  logout: () => void;
}

const AuthContext = createContext<Authorization>({
  jwt: null,
  user: null,
  username: null,
  setJwt: () => {},
  setUser: () => {},
  setUsername: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [jwt, setJwt] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);

  // we're gonna check if the user has a cookie saved for the jwt/username
  // and set it to the state if it is
  useEffect(() => {
    if (typeof window !== "undefined") {
      // check if the cookie exists
      const cookieJwt = Cookies.get("jwt");
      if (cookieJwt) setJwt(cookieJwt);

      const cookieUsername = Cookies.get("username");
      if (cookieUsername) setUsername(cookieUsername);
    }
  }, []);

  // when the JWT is updated, store it as a cookie
  useEffect(() => {
    if (!jwt || !username) return;

    // since we have a JWT, fetch the user information
    fetch(`http://localhost:8080/users/data?username=${username}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${jwt}` },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data: User) => setUser(data));
      }
    });

    // update cookie
    Cookies.set("jwt", jwt, {
      sameSite: "strict",
      expires: 1, // 1 day from now
    });

    Cookies.set("username", username, {
      sameSite: "strict",
      expires: 1, // 1 day from now
    });
  }, [jwt, username]);

  useEffect(() => {
    if (user) console.log(user);
  }, [user]);

  const logout = () => {
    setJwt(null);
    setUsername(null);
    Cookies.remove("jwt");
    Cookies.remove("username");
  };

  return (
    <AuthContext.Provider
      value={{ jwt, user, username, setJwt, setUser, setUsername, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};