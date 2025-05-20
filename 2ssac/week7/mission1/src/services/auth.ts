import axios from "./axiosInstance";
import axiosInstance from "./axiosInstance";


// 로그인
export const login = async (email: string, password: string) => {
  const response = await axios.post("/v1/auth/signin", { email, password });
  return response.data.data;
};

// 로그아웃
export const logoutAPI = async () => {
  await axiosInstance.post("/v1/auth/signout");
};

// 회원가입
export const signup = async (email: string, password: string) => {
  const response = await axios.post("/v1/auth/signup", { email, password });
  return response.data;
};

// 사용자 정보 조회
export const fetchUserInfo = async () => {
  const res = await axiosInstance.get("/v1/users/me");
  return res.data.data;
};
