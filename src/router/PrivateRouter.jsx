import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../contexts/AuthProvider";
import Login from "../pages/Login";

const PrivateRouter = () => {
  const { currentUser } = useAuthContext();
  console.log(currentUser);

  return currentUser ? <Outlet /> : <Login />;
};

export default PrivateRouter;
