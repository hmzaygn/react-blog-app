import React from "react";
import NavBar from "../components/NavBar";
import { useAuthContext } from "../contexts/AuthProvider";

const Profile = () => {
  const { currentUser } = useAuthContext();

  console.log(currentUser);
  return (
    <div>
      <NavBar />
    </div>
  );
};

export default Profile;
