import axios from "axios";
import React from "react";
import { useNavigate } from "react-router";
import { useAuthContext } from "../contexts/AuthProvider";

const useAuthCalls = () => {
  const BASE_URL = "http://127.0.0.1:8000/";
  const navigate = useNavigate();
  const { setCurrentUser, currentUser } = useAuthContext();

  const register = async (data) => {
    try {
      const userData = await axios.post(`${BASE_URL}users/register/`, data);
      setCurrentUser(userData.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return { register };
};

export default useAuthCalls;
