import axios from "axios";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthProvider";

const useAuthCalls = () => {
  const BASE_URL = "http://127.0.0.1:8000/";
  const navigate = useNavigate();
  const { setCurrentUser, currentUser } = useAuthContext();

  const getProfile = async (id, token) => {
    const { data } = await axios.get(`${BASE_URL}users/profile/${id}/`, {
      headers: { Authorization: `Token ${token}` },
    });

    return data;
  };

  const register = async (registerData) => {
    try {
      const { data } = await axios.post(
        `${BASE_URL}users/register/`,
        registerData
      );
      const profileData = await getProfile(data.id, data.key);
      setCurrentUser({
        ...data,
        display_name: profileData.display_name,
        avatar: profileData.avatar,
        bio: profileData.bio,
      });
      localStorage.setItem(
        "USER",
        JSON.stringify({
          ...data,
          display_name: profileData.display_name,
          avatar: profileData.avatar,
          bio: profileData.bio,
        })
      );
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
      const profileData = await getProfile(data.user.id, data.key);
      setCurrentUser({
        ...data.user,
        key: data.key,
        display_name: profileData.display_name,
        avatar: profileData.avatar,
        bio: profileData.bio,
      });
      localStorage.setItem(
        "USER",
        JSON.stringify({
          ...data.user,
          key: data.key,
          display_name: profileData.display_name,
          avatar: profileData.avatar,
          bio: profileData.bio,
        })
      );
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (updatedUser) => {
    try {
      const { data } = await axios.put(
        `${BASE_URL}users/profile/${updatedUser.user_id}/`,
        updatedUser,
        {
          headers: { Authorization: `Token ${currentUser.key}` },
        }
      );

      setCurrentUser({
        ...currentUser,
        display_name: data.display_name,
        avatar: data.avatar,
        bio: data.bio,
      });

      localStorage.setItem(
        "USER",
        JSON.stringify({
          ...currentUser,
          display_name: data.display_name,
          avatar: data.avatar,
          bio: data.bio,
        })
      );
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

  return { register, login, updateProfile, logout };
};

export default useAuthCalls;
