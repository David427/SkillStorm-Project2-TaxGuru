import type { TaxReturn, User } from "../types";

import {
  Dispatch,
  useState,
  useEffect,
  useContext,
  createContext,
  SetStateAction,
} from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

interface Authorization {
  loading: boolean;
  jwt: string | null;
  user: User | null;
  username: string | null;
  setJwt: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<User | null>>;
  setUsername: Dispatch<SetStateAction<string | null>>;
  updateUser: (user: User) => Promise<void>;
  updateReturn: (taxReturn: TaxReturn) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<Authorization>({
  loading: false,
  jwt: null,
  user: null,
  username: null,
  setJwt: () => {},
  setUser: () => {},
  setUsername: () => {},
  updateUser: () => Promise.resolve(),
  updateReturn: () => Promise.resolve(),
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
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
    if (!jwt || !username) {
      setLoading(false);
      return;
    }

    // since we have a JWT, fetch the user information
    fetch(
      `https://api-taxguru.skillstorm-congo.com/users/data?username=${username}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${jwt}` },
      }
    ).then((res) => {
      if (res.ok) {
        res.json().then((data: User) => {
          setUser(data);
          setLoading(false);
        });
      } else {
        if (res.status === 401) {
          logout();
          navigate("/");
        }
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
    setLoading(false);
  }, [jwt, username, navigate]);

  useEffect(() => {
    if (user) console.log(user);
  }, [user]);

  const logout = () => {
    setJwt(null);
    setUsername(null);
    setUser(null);
    Cookies.remove("jwt");
    Cookies.remove("username");
  };

  /**
   * Update the User object and persist the result to the database through an API call
   *
   * @param {User} user the updated user object
   */
  const updateUser = async (user: User) => {
    const res = await fetch(
      `https://api-taxguru.skillstorm-congo.com/users/update?username=${user.username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(user),
      }
    );
    const updatedUser = await res.json();
    setUser(updatedUser);
  };

  const updateReturn = async (taxReturn: TaxReturn) => {
    const res = await fetch(
      `https://api-taxguru.skillstorm-congo.com/return/${taxReturn.id}?username=${username}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(taxReturn),
      }
    );
    const updatedReturn = await res.json();

    const updatedUser = {
      ...user,
      taxReturn: updatedReturn,
    } as User;
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        loading,
        jwt,
        user,
        username,
        setJwt,
        setUser,
        updateUser,
        updateReturn,
        setUsername,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};
