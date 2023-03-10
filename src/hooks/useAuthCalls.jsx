import axios from "axios";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthProvider";

const useAuthCalls = () => {
  const BASE_URL = "http://127.0.0.1:8000/";
  const navigate = useNavigate();
  const { setCurrentUser, currentUser } = useAuthContext({});

  const register = async (registerData) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}users/register/`,
        registerData
      );
      setCurrentUser(data);
      localStorage.setItem("USER", JSON.stringify(data));
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
      console.log(data);
      setCurrentUser({ ...data.user, key: data.key });
      localStorage.setItem(
        "USER",
        JSON.stringify({ ...data.user, key: data.key })
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async (data) => {
    try {
      await axios.post(`${BASE_URL}users/auth/logout/`, null, {
        headers: { Authorization: `Token ${data.key}` },
      });

      localStorage.removeItem("USER");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return { register, login, logout };
};

export default useAuthCalls;
