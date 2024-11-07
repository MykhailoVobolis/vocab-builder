import UserAvatar from "../UserAvatar/UserAvatar.jsx";
import { HiOutlineArrowRight } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { logOut } from "../../redux/auth/operations.js";

import css from "./UserMenu .module.css";

export default function UserMenu() {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logOut());
  };

  return (
    <div className={css.userMenuContainer}>
      <UserAvatar />
      <button className={css.logoutBtn} onClick={handleClick}>
        <span>Log out</span>
        <HiOutlineArrowRight className={css.logOutIcon} size={16} />
      </button>
    </div>
  );
}
