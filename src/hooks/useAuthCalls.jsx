import axios from "axios";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthProvider";

const useAuthCalls = () => {
  const BASE_URL = "http://127.0.0.1:8000/";
  const navigate = useNavigate();
  const { setCurrentUser, currentUser } = useAuthContext();

  const register = async (registerData) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}users/register/`,
        registerData
      );
      setCurrentUser(data.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (loginData) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}users/auth/login/`,
        loginData
      );
      setCurrentUser(data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async (data) => {
    try {
      const userData = await axios.post(`${BASE_URL}users/auth/logout`, {
        headers: { Authorization: `Token ${data.token}` },
      });
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return { register, login, logout };
};

export default useAuthCalls;
