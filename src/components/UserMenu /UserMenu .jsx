import UserAvatar from "../UserAvatar/UserAvatar.jsx";
import { FaArrowRight } from "react-icons/fa6";
import { useDispatch } from "react-redux";

import css from "./UserMenu .module.css";
import { logOut } from "../../redux/auth/operations.js";

export default function UserMenu() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.userMenuContainer}>
      <UserAvatar />
      <button className={css.logoutBtn}>Log out{<FaArrowRight size={16} onClick={handleClick} />}</button>
    </div>
  );
}
