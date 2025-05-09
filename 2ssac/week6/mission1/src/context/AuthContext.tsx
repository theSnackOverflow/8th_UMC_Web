import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";
import { fetchUserInfo } from "../services/auth";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));
  const [refreshToken, setRefreshToken] = useState(() =>
    localStorage.getItem("refreshToken")
  );
  const [user, setUser] = useState<User | null>(null);

  const login = (accessToken: string, refreshToken: string) => {
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    setToken(accessToken);
    setRefreshToken(refreshToken);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setToken(null);
    setRefreshToken(null);
    setUser(null);
  };

  const isAuthenticated = !!token;

  useEffect(() => {
    const loadUser = async () => {
      if (token) {
        try {
          const userInfo = await fetchUserInfo();
          setUser(userInfo);
        } catch (err) {
          console.error("사용자 정보를 불러오지 못했습니다.", err);
          logout(); // 토큰이 유효하지 않다면 로그아웃 처리
        }
      }
    };
    loadUser();
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        token,
        refreshToken,
        user,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};