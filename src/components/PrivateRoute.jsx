import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthProcess, selectIsLoggedIn } from "../redux/auth/selectors.js";

import CustomLoader from "./CustomLoader/CustomLoader.jsx";

export default function PrivateRoute({ component, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const authProcess = useSelector(selectAuthProcess);

  if (authProcess) {
    return <CustomLoader />;
  }

  return isLoggedIn ? component : <Navigate to={redirectTo} replace />;
}
